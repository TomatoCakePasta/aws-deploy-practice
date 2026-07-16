# aws-deploy-practice

### Setup

```
// frontend
~/frontend % npm install

// run 
~/frontend % npm run dev

// build
~/frontend % npm run build
```

```
// backend
~/backend % node src/app.ts
```

```
// EC2にSSH接続
// 鍵と接続先の名前は作成したものにする
ssh -i "key-pair-name.pem" <ec2-username>@<instance-public-dns>

// 初回 Node.jsを入れる
// install nvm
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.7/install.sh | bash

// load nvm
source ~/.bashrc

// install Node.js LTS version
nvm install --lts

// test
node -e "console.log('Running Node.js ' + process.version)"
```

```
// SSH接続方法
ssh -i "key-pair-name.pem" ec2-user@<public-dns>

// awsから抜ける
exit
```

ファイル転送
```
// ローカルPC
scp -i "key-pair-name.pem" -r ./backend ec2-user@<public-dns>:~/apps/

```

# GitHub ActionsからS3への自動デプロイ手順
## 大まかな流れ
## 1. GitHub Actions → IAMロール【信頼ポリシー】
```
GitHub Actions
      │
      │ OIDCトークン
      ▼
IAMロールの信頼ポリシー
      │  (誰がこのIAMロールを使ってよいか, Principal
      │   今回のケース: "誰" = 特定のGitHubリポジトリから来た、GitHub OIDC Provider)
      │ 「このGitHubリポジトリからなら
      │  ロールを引き受けてよい」
      ▼
IAMロールを使用可能
      │  
      ▼
許可ポリシーを取得
      │  
      ▼
S3へ操作

```

```
┌──────────────────────┐
│    GitHub Actions     │
└──────────┬───────────┘
           │
           │ OIDCトークンを提示
           ▼
┌────────────────────────────────┐
│ GitHub Actionsの認証された      │
│ アイデンティティ                │
└──────────┬─────────────────────┘
           │
           │ IAMロールを引き受ける
           ▼
┌────────────────────────────────┐
│          IAMロール              │
│                                │
│  ┌──────────────────────────┐  │
│  │      信頼ポリシー          │  │
│  │ GitHub Actionsの認証済み   │  │
│  │ アイデンティティを信頼     │  │
│  └──────────────────────────┘  │
│                                │
│  ┌──────────────────────────┐  │
│  │      許可ポリシー          │  │
│  │ S3への操作を許可          │  │
│  └────────────┬─────────────┘  │
└───────────────┼────────────────┘
                │
                │ PutObjectなど
                ▼
          ┌───────────┐
          │    S3     │
          └───────────┘
```

```
GitHub Actions
      │
      │ OIDC認証
      ▼
認証されたGitHub Actionsの
アイデンティティ
      │
      │ GitHub Actionsの認証されたアイデンティティが
      │ IAMロールを引き受ける
      ▼
IAMロール
  ├─ 信頼ポリシー
  │    └─ GitHub Actionsを信頼
  │
  └─ 許可ポリシー
       └─ S3操作を許可 (読み取り, アップロード, 削除)
              │
              ▼
             S3
              ▲
              │
        バケットポリシー (s3:GetObject, 誰でも見れるよ!)
              ▲
              │
       Client（ブラウザ）
```

# S3の作成
- region: ap-northeast-1
- パブリックアクセス設定 以下の2つのみ選択<br>
  ACLを介して付与されたバケットとオブジェクトへのパブリックアクセスをブロック <br>
  任意のACLを介して付与されたバケットとオブジェクトへのパブリックアクセスをブロック

## バケットポリシー<br>
誰でもバケットの中身が見れるようにする
```
{
    "Version": "2012-10-17",
    "Statement": [
        {
            "Sid": "PublicReadGetObject",
            "Effect": "Allow",
            "Principal": "*",
            "Action": "s3:GetObject",
            "Resource": "arn:aws:s3:::<BUCKET_NAME>/*"
        }
    ]
}
```
**「解説用コメント(#)は削除すること, JSONファイルにコメントは記入不可のため」**

# IAMロールの作成
- IAMロールを作成する
- 後述の信頼ポリシー, 許可ポリシーを作成/適用していく

## OIDC Trust
- AWSが信頼するOpenID Provider(OIDCトークンの発行元)を設定
- 今回はGitHub OIDC Providerのこと

- 信頼ポリシー (誰がIAMロールを利用するか -> GitHub Actionsが利用する) <br>
<YOUR_GITHUB_ACCOUNT>は大文字小文字区別 例) TomatoCakePasta<br>
<PROVIDER_URL>は token.actions.githubusercontent.com
```
{
    "Version": "2012-10-17",
    "Statement": [
        {
            "Effect": "Allow",
            # OIDCトークンを使ってIAMロールを引き受ける
            "Action": "sts:AssumeRoleWithWebIdentity",
            # 誰がIAMロールを利用するか
            "Principal": {
                "Federated": "arn:aws:iam::<AWS_ID>:oidc-provider/<PROVIDER_URL>"
            },
            "Condition": {
                # どのGitHubリポジトリから来たか aws-deploy-practiceならOK
                "StringLike": {
                    "<PROVIDER_URL>:sub": "repo:<YOUR_GITHUB_ACCOUNT>/aws-deploy-practice:*"
                },
                # 誰向けに発行されたトークンか 
                # AWS STS向けに発行されたOIDCトークンだけを許可する
                "StringEquals": {
                    "<PROVIDER_URL>:aud": "sts.amazonaws.com"
                }
            }
        }
    ]
}
```
**「解説用コメント(#)は削除すること, JSONファイルにコメントは記入不可のため」**

## IAMロール内の許可ポリシー (カスタマーインラインで作成)
- どのリソースで何ができるか<br>
- 今回は、<BUCKET_NAME>に対して以下を許可<br>
読み取り, アップロード, 削除
```
{
	"Version": "2012-10-17",
	"Statement": [
		{
			"Sid": "ListBucket",
			"Effect": "Allow",
            # S3の中を表示
			"Action": "s3:ListBucket",
			"Resource": "arn:aws:s3:::<BUCKET_NAME>"
		},
		{
			"Sid": "UploadAndDeleteObjects",
			"Effect": "Allow",
			"Action": [
                # S3にオブジェクトをアップロード
				"s3:PutObject",
                # S3のオブジェクトを削除
				"s3:DeleteObject"
			],
			"Resource": "arn:aws:s3:::<BUCKET_NAME>/*"
		}
	]
}
```
**「解説用コメント(#)は削除すること, JSONファイルにコメントは記入不可のため」**
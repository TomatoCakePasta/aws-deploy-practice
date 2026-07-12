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

<script setup lang="ts">
  import MenuView from "./views/MenuView.vue"
  import { RouterView } from "vue-router";
</script>

<template>
    <div class="menu">
    <div class="menu-buttons">
      <RouterView />
    </div>
  </div>
</template>

<style>
.menu {
  display: flex;
  justify-content: center; /* 水平方向中央 */
  align-items: center;     /* 垂直方向中央 */
  min-height: 100vh;       /* 画面全体の高さ */
}

.menu-buttons {
  display: flex;
  flex-direction: column;  /* 縦並び */
  gap: 100px;               /* ボタン間の間隔 */
}
</style>
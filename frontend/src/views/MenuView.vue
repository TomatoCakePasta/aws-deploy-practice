/* eslint-disable */
<script setup lang="ts">
  // import ToDoForm from "../components/ToDoForm.vue";
  // import ToDoList from "../components/ToDoList.vue";
  // import { useTodo } from "../composables/useTodo";
  // const { addTodo, toggleTodo, deleteTodo, todos } = useTodo()
  import { ref } from "vue"
  import { useRouter } from "vue-router";

  const router = useRouter();

  function selectMovie() {
    console.log("select-movie");
    router.push("/select-movie");
  }
</script>

<template>
    <button @click="selectMovie" class="btn">
      予約
    </button>
    <button class="btn">
      発券
    </button>
</template>

<style scoped>
.btn {
  font-size: 100px;
  padding: 10px 180px;
  border-radius: 20px;
  background-color: aliceblue;
}

.btn:hover {
  background-color:rgb(86, 128, 140);
  color: white;
  transition-duration: 0.15s;
  cursor: pointer;
}
</style>
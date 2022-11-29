<template>
  <div>
    {{ msg }}
    <img src="./assets/img/1.png" alt="" />
    111
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
// const img = require("@/assets/img/1.png");
const msg = ref("hahah");
const a = 1;
</script>

<style scoped></style>

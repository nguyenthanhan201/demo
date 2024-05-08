<template>
  <h1>Count</h1>
  <p>{{ count }}</p>
  <button @click="handleCount">Click</button>
</template>

<script setup lang="tsx">
import { ref } from 'vue';

const count = ref(0);

const handleCount = () => {
  count.value += 1;
};
</script>

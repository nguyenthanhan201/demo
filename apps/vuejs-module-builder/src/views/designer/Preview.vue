<script setup lang="ts">
import { PreviewProps } from '@repo/shared-types';
import { defineProps, onUnmounted, ref, toRefs } from 'vue';

const props = defineProps<PreviewProps>();
// console.log('👌  props:', props.initPreview);

const { initPreview } = toRefs(props);

const htmlPage = ref<any>('');

if (initPreview.value) {
  htmlPage.value = initPreview.value;
} else {
  // get preview item from local storage
  htmlPage.value = localStorage.getItem('preview');
}

// htmlPage.value = localStorage.getItem('preview');

// parse
htmlPage.value = JSON.parse(htmlPage.value);
// join
htmlPage.value = htmlPage.value.join('');

onUnmounted(() => {
  console.log('👌  Preview.vue unmounted');
});
</script>

<template>
  <div class="w-full inset-x-0 h-[94vh] lg:pt-0 pt-0-z-10 overflow-x-scroll bg-white test">
    <div v-html="htmlPage"></div>
  </div>
</template>

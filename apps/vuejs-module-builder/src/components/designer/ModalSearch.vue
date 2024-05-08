<script setup lang="ts">
import { IImage } from '@/types/unsplash';
import { ref } from 'vue';
import MyModal from '../shared/MyModal.vue';

const openModal = ref(false);
const search = ref('');
const images = ref<IImage[]>([]);
const loading = ref(false);

const handleSearch = () => {
  if (!search.value) {
    return;
  }

  loading.value = true;
  fetch(
    'https://api.unsplash.com/search/photos?query=' +
      search.value +
      '&client_id=5m9Y7Ewvxu686LvPcfccdUKxIEJNWhhcnI2IkO95-ao&page=1&per_page=24'
  )
    .then((res) => res.json())
    .then((data) => {
      images.value = data.results;
      // listImages.value = data.results;
    })
    .finally(() => {
      loading.value = false;
    });
};
</script>

<template>
  <button @click="openModal = true">Search</button>
  <MyModal :open="openModal" :onClose="() => (openModal = false)">
    <input type="text" v-model="search" placeholder="search something" />
    <button @click="handleSearch" :disabled="loading">
      {{ loading ? 'Loading...' : 'Search' }}
    </button>

    <div class="grid grid-cols-4 gap-2">
      <div v-for="image in images" :key="image.id">
        <img :src="image.urls.full" :alt="image.alt_description" class="size-10" />
      </div>
    </div>
  </MyModal>
</template>

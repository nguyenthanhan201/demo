<script setup lang="ts">
import { XMarkIcon } from '@heroicons/vue/24/outline';
import { computed, defineEmits } from 'vue';
import { useStore } from 'vuex';
import ClassEditor from '../../designerMain/editor-menu/editables/ClassEditor.vue';
import ColorsEditor from '../../designerMain/editor-menu/editables/ColorEditor.vue';
import ImageEditor from '../../designerMain/editor-menu/editables/ImageEditor.vue';
import TextContent from '../../designerMain/editor-menu/editables/TextContent.vue';
import Typography from '../../designerMain/editor-menu/editables/Typography.vue';
import BorderRadius from './editables/BorderRadius.vue';
import Borders from './editables/Borders.vue';
import DeleteElement from './editables/DeleteElement.vue';
import LinkEditor from './editables/LinkEditor.vue';
import PaddingPlusMargin from './editables/PaddingPlusMargin.vue';

// store
const store = useStore();
// emit
const emit = defineEmits(['closeEditor']);

// get current element tag
const getElement = computed(() => {
  return store.getters['designer/getElement'];
});
const getRestoredElement = computed(() => {
  return store.getters['designer/getRestoredElement'];
});

// Get tagName of element
const elementTag = computed(() => {
  return getElement.value?.tagName;
});

const isHeadingElement = computed(() => {
  return (
    (getElement.value instanceof HTMLElement && getElement.value.innerText.trim() !== ' ') ||
    getElement.value instanceof HTMLImageElement
  );
});
</script>

<template>
  <div class="h-full w-80 bg-white">
    <div class="h-screen flex flex-col">
      <div class="flex flex-row justify-between pt-2.5 pr-4 pl-4 items-center mb-3">
        <div
          @click="$emit('closeEditor')"
          class="hover:bg-myPrimaryLinkColor hover:text-white bg-gray-100 rounded-full cursor-pointer"
        >
          <XMarkIcon class="shrink-0 w-5 h-5 m-2"></XMarkIcon>
        </div>
        <p class="font-bold text-sm">
          Editing
          <span class="lowercase">&lt;{{ elementTag }}&gt;</span>
        </p>
      </div>

      <div class="mb-4 overflow-y-scroll md:pb-24 pb-12">
        <div v-show="isHeadingElement === true">
          <article>
            <ImageEditor> </ImageEditor>
          </article>
          <article>
            <TextContent></TextContent>
          </article>
          <article>
            <LinkEditor></LinkEditor>
          </article>
          <article>
            <Typography></Typography>
          </article>
          <article>
            <ColorsEditor> </ColorsEditor>
          </article>
          <article>
            <PaddingPlusMargin> </PaddingPlusMargin>
          </article>
          <article>
            <BorderRadius></BorderRadius>
          </article>
          <article>
            <Borders></Borders>
          </article>
          <article>
            <ClassEditor></ClassEditor>
          </article>
        </div>

        <article>
          <div v-show="isHeadingElement === true || getRestoredElement !== null">
            <DeleteElement> </DeleteElement>
          </div>
        </article>
        <article class="min-h-[20em]"></article>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import Designer from '@/composables/Designer';
import { computed, ref } from 'vue';
import Draggable from 'vuedraggable';
import { useStore } from 'vuex';

const openModal = ref(false);

const list1 = ref([
  { name: 'John', id: 1 },
  { name: 'Joao', id: 2 },
  { name: 'Jean', id: 3 },
  { name: 'Gerard', id: 4 }
]);
const list2 = ref([
  { name: 'Juan', id: 5 },
  { name: 'Edgard', id: 6 },
  { name: 'Johnson', id: 7 }
]);

const log = (e: any) => {
  console.log('Event: ' + e);
};

const store = useStore();
const designer = new Designer(store);

const getComponents = computed(() => {
  return store.getters['designer/getComponents'];
});
// console.log('👌  getComponents:', getComponents.value);

// When HTML component is dropped into the DOM
const onDrop = function (droppedElement, targetIndex, originalEvent) {
  designer.saveCurrentDesignWithTimer();
};
</script>

<template>
  <!-- <div class="flex flex-col gap-6">
    <h1>MainBuilder</h1>
    <ModalSearch :open="openModal" @onClose="openModal = false" />

    <div class="flex flex-col">
      <div class="flex gap-4">
        <div>
          <h3>Draggable 1</h3>
          <Draggable
            class="list-group"
            :list="list1"
            :group="{ name: 'people', pull: 'clone', put: false }"
            @change="log"
            :itemKey="(item:any) => item.id"
          >
            <template #item="{ element, index }">
              <div class="list-group-item" :key="element.name">{{ element.name }} {{ index }}</div>
            </template>
          </Draggable>
        </div>

        <div class="min-h-72 bg-yellow-500">
          <h3>Draggable 2</h3>
          <Draggable
            class="list-group"
            :list="list2"
            group="people"
            @change="log"
            :itemKey="(item:any) => item.id"
          >
            <template #item="{ element, index }">
              <div class="list-group-item" :key="element.name">{{ element.name }} {{ index }}</div>
            </template>
          </Draggable>
        </div>
      </div>
    </div>
  </div> -->
  <main class="flex flex-col h-full grow rounded-2xl duration-300 shadow-2xl">
    <div
      class="flex items-center justify-between primary-gap rounded-t-2xl bg-myPrimaryLightGrayColor py-2 px-4"
    >
      <div>
        <div class="flex gap-2">
          <span class="w-2 h-2 rounded-full bg-red-400"></span>
          <span class="w-2 h-2 rounded-full bg-yellow-400"></span>
          <span class="w-2 h-2 rounded-full bg-green-400"></span>
        </div>
      </div>

      <!-- <OptionsDropdown @previewCurrentDesign="previewCurrentDesign"></OptionsDropdown>

      <div class="flex items-center justify-center gap-2">
        <div
          @click="handleDesignerPreview"
          class="cursor-pointer rounded-full flex items-center justify-center bg-white aspect-square hover:bg-myPrimaryLinkColor hover:text-white"
        >
          <EyeIcon class="w-5 h-5 m-2 stroke-1.5 cursor-pointer"></EyeIcon>
        </div>
        <div
          v-if="getElement !== null"
          @click="deselectCurrentComponent"
          class="cursor-pointer rounded-full flex items-center justify-center bg-white aspect-square hover:bg-myPrimaryLinkColor hover:text-white"
        >
          <BoltSlashIcon class="w-5 h-5 m-2 stroke-1.5 cursor-pointer"></BoltSlashIcon>
        </div>
        <div
          @click="handleSettingsSlideOver"
          class="cursor-pointer rounded-full flex items-center justify-center bg-white aspect-square hover:bg-myPrimaryLinkColor hover:text-white"
        >
          <AdjustmentsVerticalIcon
            class="w-5 h-5 m-2 stroke-1.5 cursor-pointer"
          ></AdjustmentsVerticalIcon>
        </div>
        <div
          v-if="getMenuRight === false"
          @click="store.commit('designer/setMenuRight', true)"
          class="cursor-pointer rounded-full flex items-center justify-center bg-white aspect-square hover:bg-myPrimaryLinkColor hover:text-white"
        >
          <Squares2X2Icon class="w-5 h-5 m-2 stroke-1.5 cursor-pointer"></Squares2X2Icon>
        </div>
      </div> -->
    </div>

    <Draggable
      id="pagebuilder"
      :list="getComponents"
      animation="200"
      class="bg-white grow overflow-y-auto"
      drag-class="opacity-0"
      group="components"
      handle=".cursor-grab"
      item-key="id"
      :onDrop="onDrop"
      @change="designer.addClickAndHoverEvents"
    >
      <template #item="{ element }">
        <div @mouseup="store.commit('designer/setComponent', element)" class="relative group">
          <ComponentTopMenu></ComponentTopMenu>
          <section v-html="element.html" class="m-0.5"></section>
        </div>
      </template>
    </Draggable>
  </main>
</template>
<style>
.list-group-item {
  background-color: #f9f9f9;
  border: 1px solid #ddd;
  border-radius: 4px;
  cursor: pointer;
  margin-bottom: 4px;
  padding: 8px;
}
/* css with attribute selector */
.list-group-item[draggable='true'] {
  background-color: red;
}
</style>

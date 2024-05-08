<script setup lang="ts">
import Designer from '@/composables/Designer';
// import { store } from '@/store';
import { computed, onBeforeMount, onMounted, ref } from 'vue';
import Draggable from 'vuedraggable';
import { useStore } from 'vuex';

const store = useStore();
console.log('👌  store:', store);
const designer = new Designer(store);
const categories = ref<string[] | null>(null);
categories.value = ['forms', 'teams', 'posts', 'features', 'headers', 'testimonials'];
const activeLibrary = ref('forms');

const getMenuLeft = computed(() => {
  return store.getters['designer/getMenuLeft'];
});
const getFetchedComponents = computed(() => {
  return store.getters['designer/getFetchedComponents'];
});
// Fetched components filtered after category
const componentsMenu = computed(() => {
  // console.log(
  //   'oki:',
  //   getFetchedComponents.value?.fetchedData?.filter((component: any) => {
  //     return component.category === activeLibrary.value;
  //   })
  // );
  return getFetchedComponents.value?.fetchedData?.filter((component: any) => {
    return component.category === activeLibrary.value;
  });
});
const getMenuPreview = computed(() => {
  return store.getters['designer/getMenuPreview'];
});

// clone
const cloneComponent = function (componentObject: any) {
  return designer.cloneCompObjForDOMInsertion(componentObject);
};

// console.log('👌  cloneComponent:', cloneComponent);

onBeforeMount(() => {
  designer.areComponentsStoredInLocalStorage();
});

onMounted(async () => {
  // Load all HTML components
  await store.dispatch('designer/loadComponents');

  store.commit('designer/setComponent', null);
  store.commit('designer/setElement', null);

  // Rerender `get components` when it is loaded from local storage
  designer.addClickAndHoverEvents();
});
</script>
<template>
  <aside
    aria-label="sidebar"
    :class="{
      'w-0': !getMenuLeft,
      'w-60': getMenuLeft,
      'rounded-r-[0rem]': getMenuPreview
    }"
    class="h-full flex-shrink-0 shadow-2xl rounded-r-2xl overflow-hidden mr-4 duration-150"
    @mouseleave="store.commit('designer/setMenuPreview', false)"
  >
    <div class="sticky h-full w-60 overflow-hidden">
      <nav aria-label="Sidebar" class="h-full bg-white pt-2.5 pr-0 pb-4 pl-4">
        <div class="flex flex-row justify-end border-b pb-3 mb-3 pr-4">
          <div
            @click="
              store.commit('designer/setMenuLeft', false) &&
                store.commit('designer/setMenuPreview', false)
            "
            class="hover:bg-myPrimaryLinkColor hover:text-white bg-gray-100 rounded-full cursor-pointer"
          >
            Close
          </div>
        </div>

        <p class="myPrimaryParagraph font-medium pt-4 pr-4">COMPONENTS</p>
        <ul
          @mouseover.self="store.commit('designer/setMenuPreview', false)"
          class="flex flex-col pt-4 pr-0 pb-0 font-normal h-full overflow-y-auto"
        >
          <li
            v-for="category in categories"
            :key="category"
            :class="{
              'bg-gray-100 text-gray-900': activeLibrary === category && getMenuPreview === true
            }"
            class="w-full myPrimaryParagrap font-medium py-4 pl-2 pr-0 capitalize cursor-pointer rounded-l-lg"
            @mouseover="
              activeLibrary = category;
              store.commit('designer/setMenuPreview', true);
            "
          >
            {{ category }}
          </li>
        </ul>
      </nav>
    </div>

    <!--Preview - start-->
    <aside
      aria-label="saidebar"
      :class="[!getMenuPreview ? '-left-[30rem]' : 'left-56']"
      class="absolute z-10 w-[20rem] h-full duration-200 top-0 rounded-r-2xl shadow-2xl bg-gray-50"
    >
      <div class="flex flex-col gap-4 p-4 h-full font-normal">
        <p class="myPrimaryParagraph capitalize">{{ activeLibrary }} test nha</p>
        <Draggable
          :clone="cloneComponent"
          :group="{ name: 'components', pull: 'clone', put: false }"
          :list="componentsMenu"
          :sort="false"
          class="flex flex-col gap-4 pr-4 overflow-y-auto"
          item-key="id"
        >
          <template #item="{ element }">
            <div v-if="element">
              <img
                :alt="element.name"
                :src="element.imageSrc"
                class="border-2 border-myPrimaryLightGrayColor hover:border-myPrimaryBrandColor rounded-md cursor-grab duration-200"
              />
            </div>
          </template>
        </Draggable>
      </div>
    </aside>
  </aside>
</template>

<style>
#pagebuilder a {
  cursor: default;
}
#pagebuilder [selected] {
  outline: rgb(185, 16, 16) dashed 4px !important;
  outline-offset: -2px !important;
}
#pagebuilder [hovered] {
  outline: rgb(0, 140, 14, 1) dashed 4px !important;
  outline-offset: -2px !important;
}

.sortable-ghost {
  display: flex;
  justify-content: center;
}

.sortable-ghost > * {
  width: 100%;
}
</style>

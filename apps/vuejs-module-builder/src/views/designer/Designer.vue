<script setup lang="ts">
import {
  AdjustmentsVerticalIcon,
  ArrowPathIcon,
  BoltSlashIcon,
  ChevronLeftIcon,
  EyeIcon,
  Square3Stack3DIcon,
  Squares2X2Icon,
  XMarkIcon
} from '@heroicons/vue/24/outline';
import { AccountCircleOutlined } from '@repo/icons';
import { DesignerProps } from '@repo/shared-types';
import {
  computed,
  defineEmits,
  defineProps,
  onBeforeMount,
  onMounted,
  onUpdated,
  ref,
  watch
} from 'vue';
import Draggable from 'vuedraggable';
import { useStore } from 'vuex';
import RightSidebarEditor from '../../components/designerMain/editor-menu/RightSidebarEditor.vue';
import ComponentTopMenu from '../../components/designerMain/editor-menu/editables/ComponentTopMenu.vue';
import OptionsDropdown from '../../components/dropdowns-and-toggles/OptionsDropdown.vue';
import Spinner from '../../components/loaders/Spinner.vue';
import DesignerPreviewModal from '../../components/modal/DesignerPreviewModal.vue';
import DesignerSettings from '../../components/settings/DesignerSettings.vue';
import SlideOverRight from '../../components/slidebars/SlideOverRight.vue';
import Designer from '../../composables/Designer';
import { ComponentItemType } from '../../store/modules/designer';
import Preview from '../designer/Preview.vue';

const emit = defineEmits(['previewCurrentDesign']);

const props = defineProps<DesignerProps>();
// console.log('👌  props:', props);

const store = useStore();
const designer = new Designer(store);

const showSettingsSlideOverRight = ref(false);
const titleSettingsSlideOverRight = ref<string | null>(null);
const getMenuLeft = computed(() => {
  return store.getters['designer/getMenuLeft'];
});

const getMenuRight = computed(() => {
  return store.getters['designer/getMenuRight'];
});
const getMenuPreview = computed(() => {
  return store.getters['designer/getMenuPreview'];
});
// handle slideover window
const handleSettingsSlideOver = function () {
  titleSettingsSlideOverRight.value = 'Settings';
  showSettingsSlideOverRight.value = true;
};
// handle slideover window
const settingsSlideOverButton = function () {
  showSettingsSlideOverRight.value = false;
};

const categories = ref<string[] | null>(null);
categories.value = ['forms', 'teams', 'posts', 'features', 'headers', 'testimonials'];
const activeLibrary = ref('forms');

const previewCurrentDesign = function () {
  designer.previewCurrentDesign();
};

const openDesignerPreviewModal = ref(false);
const firstDesignerPreviewModalButtonFunction = ref<any>(null);

const handleDesignerPreview = function () {
  previewCurrentDesign();
  // set modal standards
  openDesignerPreviewModal.value = true;
  // handle click
  firstDesignerPreviewModalButtonFunction.value = function () {
    // set open modal
    openDesignerPreviewModal.value = false;
  };
  // end modal
};

const getFetchedComponents = computed(() => {
  return store.getters['designer/getFetchedComponents'];
});

// Fetched components filtered after category
const componentsMenu = computed(() => {
  return getFetchedComponents.value?.fetchedData?.filter((component: ComponentItemType) => {
    return component.category === activeLibrary.value;
  });
});

const handleUpdateDataBrand = async function () {
  const design = localStorage.getItem('savedCurrentDesign');
  const currentPreview = ref<any>([]);
  // preview current design in external browser tab
  // iterate over each top-level section component
  document.querySelectorAll('section:not(section section)').forEach((section) => {
    // remove hovered and selected

    // remove hovered
    if (section.querySelector('[hovered]') !== null) {
      section.querySelector('[hovered]')?.removeAttribute('hovered');
    }

    // remove selected
    if (section.querySelector('[selected]') !== null) {
      section.querySelector('[selected]')?.removeAttribute('selected');
    }

    // push outer html into the array
    currentPreview.value.push(section.outerHTML);
  });

  // stringify added html components
  currentPreview.value = JSON.stringify(currentPreview.value);
  console.log('👌  currentPreview:', JSON.parse(currentPreview.value));

  if (!design) return;

  await props.handleUpdateDataBrand(design, currentPreview.value as any);
};

// clone
const cloneComponent = function (componentObject: any) {
  return designer.cloneCompObjForDOMInsertion(componentObject);
};

// When HTML component is dropped into the DOM
const onDrop = function (droppedElement: any, targetIndex: number, originalEvent: any) {
  designer.saveCurrentDesignWithTimer();
};
const getElement = computed(() => {
  return store.getters['designer/getElement'];
});
const getElementOuterHTML = computed(() => {
  if (getElement.value === null) return;
  return getElement.value.outerHTML ? getElement.value.outerHTML : null;
});
watch(getElementOuterHTML, (newComponent) => {
  designer.handleDesignerMethods();
});

const getComponents = computed(() => {
  return store.getters['designer/getComponents'];
});

const deselectCurrentComponent = function () {
  store.commit('designer/setComponent', null);
  store.commit('designer/setElement', null);
  designer.removeHoveredAndSelected();
};

const handleBack = () => {
  window.history.back();
};

onBeforeMount(() => {
  designer.areComponentsStoredInLocalStorage(props.design);
  // store.commit('designer/setComponents', JSON.parse(props.design));
});

onMounted(async () => {
  // Load all HTML components
  await store.dispatch('designer/loadComponents');

  store.commit('designer/setComponent', null);
  store.commit('designer/setElement', null);

  // Rerender `get components` when it is loaded from local storage
  designer.addClickAndHoverEvents();
});

onUpdated(() => {
  // console.log('props', props.brandId);
  console.log(AccountCircleOutlined);
  // console.log(vnode);
});

// const vnode = h(
//   'div', // type
//   { id: 'foo', class: 'bar' }, // props
//   [
//     /* children */
//     // Test()
//     AccountCircleOutlined()
//   ]
// );
</script>

<template>
  <DesignerPreviewModal
    :show="openDesignerPreviewModal"
    @firstDesignerPreviewModalButtonFunction="firstDesignerPreviewModalButtonFunction"
  >
    <Preview init-preview=""></Preview>
  </DesignerPreviewModal>

  <SlideOverRight
    :open="showSettingsSlideOverRight"
    :title="titleSettingsSlideOverRight"
    @slideOverButton="settingsSlideOverButton"
  >
    <DesignerSettings> </DesignerSettings>
  </SlideOverRight>
  <div class="w-full inset-x-0 h-[94vh] lg:pt-0 pt-0-z-10 bg-white overflow-x-scroll">
    <div class="relative h-full flex">
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
                @click="store.commit('designer/setMenuPreview', false)"
                class="hover:bg-myPrimaryLinkColor hover:text-white bg-gray-100 rounded-full cursor-pointer"
              >
                <XMarkIcon class="shrink-0 w-5 h-5 m-2"> </XMarkIcon>
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
            <p class="myPrimaryParagraph capitalize">{{ activeLibrary }}</p>
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
      <!--Preview - end-->

      <!-- Bars - start -->
      <div v-show="getMenuLeft === false" class="pt-2 mr-4 h-full flex-shrink-0 overflow-hidden">
        <div
          @click="store.commit('designer/setMenuLeft', true)"
          class="cursor-pointer rounded-full flex items-center justify-center bg-gray-100 aspect-square hover:bg-myPrimaryLinkColor hover:text-white"
        >
          <Square3Stack3DIcon class="shrink-0 w-6 h-6 m-2 cursor-pointer"> </Square3Stack3DIcon>
        </div>
      </div>
      <!-- Bars - end -->

      <main class="flex flex-col h-full grow rounded-2xl duration-300 shadow-2xl">
        <div
          class="flex items-center justify-between primary-gap rounded-t-2xl bg-myPrimaryLightGrayColor py-2 px-4"
        >
          <div>
            <div class="flex gap-2">
              <span class="w-2 h-2 rounded-full bg-red-400"></span>
              <span class="w-2 h-2 rounded-full bg-yellow-400"></span>
              <span class="w-2 h-2 rounded-full bg-green-400"></span>
              <!-- {{ vnode.children?.at(0).children }}
              <AccountCircleOutlined></AccountCircleOutlined> -->
            </div>
          </div>

          <OptionsDropdown @previewCurrentDesign="previewCurrentDesign"></OptionsDropdown>

          <div class="flex items-center justify-center gap-2">
            <div
              class="cursor-pointer rounded-full flex items-center justify-center bg-white aspect-square hover:bg-myPrimaryLinkColor hover:text-white"
              @click="handleBack"
            >
              <ChevronLeftIcon class="shrink-0 w-5 h-5 m-2"></ChevronLeftIcon>
            </div>

            <div
              class="cursor-pointer rounded-full flex items-center justify-center bg-white aspect-square hover:bg-myPrimaryLinkColor hover:text-white"
              @click="handleUpdateDataBrand"
            >
              <ArrowPathIcon class="shrink-0 w-5 h-5 m-2"></ArrowPathIcon>
            </div>
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
          </div>
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

      <aside
        aria-label="Menu"
        :class="{ 'w-0': !getMenuRight, 'w-80 ml-4': getMenuRight }"
        class="h-full duration-300 z-20 flex-shrink-0 overflow-hidden shadow-2xl rounded-l-2xl bg-white"
      >
        <RightSidebarEditor @closeEditor="store.commit('designer/setMenuRight', false)">
        </RightSidebarEditor>
      </aside>
    </div>
    <Spinner
      v-if="
        getFetchedComponents &&
        getFetchedComponents.isLoading === true &&
        getFetchedComponents.isError === false
      "
    >
    </Spinner>
  </div>
</template>

<style scoped>
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

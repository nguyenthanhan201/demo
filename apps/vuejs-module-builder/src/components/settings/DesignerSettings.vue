<script setup lang="ts">
import { computed, ref } from 'vue';
import { useStore } from 'vuex';
// import fullHTMLContent from '../../utils/html-doc-declaration-with-components';
import SlideOverRightParent from '../slidebars/SlideOverRightParent.vue';
import AdvancedDesignerSettings from './AdvancedDesignerSettings.vue';

const store = useStore();
const showAdvancedSettingsSlideOverRight = ref(false);
const titleSettingsSlideOverRight = ref('');
const downloadedComponents = ref(null);

// handle slideover window
const handleAdvancedSettingsSlideOver = function () {
  titleSettingsSlideOverRight.value = 'Advanced Settings';
  showAdvancedSettingsSlideOverRight.value = true;
};

// handle slideover window
const settingsAdvancedSlideOverButton = function () {
  showAdvancedSettingsSlideOverRight.value = false;
};

const getComponents = computed(() => {
  return store.getters['designer/getComponents'];
});

// generate HTML
const generateHTML = function (filename, HTML) {
  const element = document.createElement('a');
  // element.setAttribute(
  //   'href',
  //   'data:text/html;charset=utf-8,' + encodeURIComponent(fullHTMLContent(HTML))
  // );
  element.setAttribute('download', filename);

  element.style.display = 'none';
  document.body.appendChild(element);

  element.click();

  document.body.removeChild(element);
};

// handle download HTML
const handleDownloadHTML = function () {
  downloadedComponents.value = getComponents.value.map((component) => {
    return component.html;
  });

  generateHTML('downloaded_html.html', downloadedComponents.value.join(''));
};
</script>

<template>
  <SlideOverRightParent
    :open="showAdvancedSettingsSlideOverRight"
    :title="titleSettingsSlideOverRight"
    @slideOverButton="settingsAdvancedSlideOverButton"
  >
    <AdvancedDesignerSettings></AdvancedDesignerSettings>
  </SlideOverRightParent>
  <!-- Download Layout HTML - start -->
  <div class="mt-4 mb-4 py-8 border-b border-myPrimbryLightGrayColor">
    <div class="flex items-left flex-col gap-1">
      <h3 class="myFourthHeader">Download Page as HTML</h3>
      <p class="myPrimaryParagraph text-xs">Download current page layout.</p>
    </div>
    <div class="mt-4">
      <button @click="handleDownloadHTML" type="button" class="myPrimaryButton text-xs">
        Download HTML file
      </button>
    </div>
  </div>
  <!-- Download Layout HTML - end -->

  <!-- Advanced Settings - start -->
  <div class="mt-4 mb-4 py-8 border-b border-myPrimbryLightGrayColor">
    <div class="flex items-left flex-col gap-1">
      <h3 class="myFourthHeader">Advanced Settings</h3>
      <p class="myPrimaryParagraph text-xs">
        Manage advanced settings here. Like an overview of Selected Element, Component, and
        Components in real-time.
      </p>
    </div>
    <div class="mt-4">
      <button
        @click="handleAdvancedSettingsSlideOver"
        type="button"
        class="myPrimaryButton text-xs"
      >
        Advanced Settings
      </button>
    </div>
  </div>
  <!-- Advanced Settings - end -->
</template>

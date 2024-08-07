<script setup lang="ts">
import { Listbox, ListboxButton, ListboxOption, ListboxOptions } from '@headlessui/vue';
import { ChevronUpDownIcon, XMarkIcon } from '@heroicons/vue/24/outline';
import { computed, ref, watch } from 'vue';
import { useStore } from 'vuex';
import Designer from '../../../../composables/Designer';
import tailwindOpacities from '../../../../utils/tailwind-opacities';

const store = useStore();
const designer = new Designer(store);

const opacityVueModel = ref(null);

const getBackgroundOpacity = computed(() => {
  return store.getters['designer/getBackgroundOpacity'];
});

watch(
  getBackgroundOpacity,
  (newValue) => {
    opacityVueModel.value = newValue;
  },
  { immediate: true }
);
</script>

<template>
  <div class="my-3 py-3">
    <label class="myPrimaryInputLabel"> Background opacity</label>

    <Listbox as="div" v-model="opacityVueModel">
      <div class="relative">
        <ListboxButton class="myPrimarySelect">
          <span class="flex items-center">
            <div v-if="opacityVueModel === 'none'" class="aspect-square w-6 h-6">
              <div class="myPrimaryColorPreview bg-gray-100">
                <XMarkIcon class="text-myPrimaryErrorColor"></XMarkIcon>
              </div>
            </div>

            <div
              v-if="opacityVueModel !== 'none'"
              class="aspect-square w-6 h-6 bg-gray-950"
              :class="`${opacityVueModel}`"
            ></div>

            <span class="block truncate ml-3" :class="[opacityVueModel !== 'none' ? '' : '']">{{
              opacityVueModel === 'none' ? 'None' : opacityVueModel
            }}</span>
          </span>
          <span class="pointer-events-none absolute inset-y-0 right-0 ml-3 flex items-center pr-2">
            <ChevronUpDownIcon class="h-5 w-5 text-gray-400" aria-hidden="true" />
          </span>
        </ListboxButton>

        <transition
          leave-active-class="transition ease-in duration-100"
          leave-from-class="opacity-100"
          leave-to-class="opacity-0"
        >
          <ListboxOptions
            class="absolute z-10 mt-1 max-h-56 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm"
          >
            <ListboxOption
              as="template"
              v-for="backgroundOpacity in tailwindOpacities.backgroundOpacities"
              @click="designer.handleBackgroundOpacity(backgroundOpacity)"
              :key="backgroundOpacity"
              :value="backgroundOpacity"
              v-slot="{ active, opacityVueModel }"
            >
              <li
                :class="[
                  active ? 'bg-myPrimaryLinkColor text-white' : 'text-gray-900',
                  'relative cursor-default select-none py-2 pl-3 pr-9'
                ]"
              >
                <div class="flex items-center">
                  <div v-if="backgroundOpacity === 'none'" class="aspect-square w-6 h-6">
                    <div class="myPrimaryColorPreview bg-gray-100">
                      <XMarkIcon class="text-myPrimaryErrorColor"></XMarkIcon>
                    </div>
                  </div>

                  <div
                    v-if="backgroundOpacity !== 'none'"
                    class="aspect-square w-6 h-6 bg-gray-950"
                    :class="`${backgroundOpacity}`"
                  ></div>
                  <span class="ml-3">{{ backgroundOpacity }}</span>
                </div>
              </li>
            </ListboxOption>
          </ListboxOptions>
        </transition>
      </div>
    </Listbox>
  </div>
</template>

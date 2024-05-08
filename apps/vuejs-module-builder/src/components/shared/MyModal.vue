<script lang="ts" setup>
import { defineProps } from 'vue';

const props = defineProps({
  open: Boolean,
  onClose: Function
});

const handleClose = () => {
  props.onClose!();
};
</script>

<template>
  <Teleport to="body">
    <div v-if="open" class="modal">
      <div class="bg-white p-4 rounded">
        <slot></slot>
        <button class="border-t border-black w-full" @click="handleClose">Close</button>
      </div>
    </div>
  </Teleport>
</template>

<style scoped>
.modal {
  position: fixed;
  z-index: 10;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5); /* semi-transparent */
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>

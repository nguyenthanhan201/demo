<template>
  {{ props.node.props.children }}
  <br />
  <!-- {{ h('p') }} -->
  <h1>Test</h1>
  <div ref="el">thanh an</div>
  <p v-for="car in 4" v-bind:key="car" ref="el">{{ car }} + thanh an</p>
  <button @click="submit">Submit</button>
</template>

<script setup lang="tsx">
import { defineProps, h, ref } from 'vue';

const el = ref(null);
const props = defineProps({
  node: {
    type: Object,
    default: () => null
  }
});

const renderReactElement = () => {
  // const editedProps = delete props.node.props['children'];
  // console.log('👌  editedProps:', editedProps);

  return h('p', null, '12321');
};

const submit = () => {
  console.log('submit', el.value);
};
</script>

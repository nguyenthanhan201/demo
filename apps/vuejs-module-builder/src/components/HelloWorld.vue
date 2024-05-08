<script setup lang="tsx">
import {
  ColumnDef,
  FlexRender,
  createColumnHelper,
  getCoreRowModel,
  useVueTable
} from '@tanstack/vue-table';
import { defineProps, h, ref } from 'vue';

const props = defineProps({
  defaultData: {
    type: Array,
    default: () => []
  },
  columns: {
    type: Array as () => ColumnDef<unknown, any>[],
    default: () => []
  },
  node: {
    type: Object,
    default: () => null
  }
});

console.log('props', props.node);

// const component = defineComponent({
//   data: () => ({
//     component: props.node
//   }),
//   components: {
//     react: ReactWrapper
//   }
// });

const data = ref(props.defaultData);
// console.log(props.columns);

const columnHelper = createColumnHelper<any>();

const table = useVueTable({
  get data() {
    return data.value;
  },
  columns: props.columns,
  getCoreRowModel: getCoreRowModel()
});

// console.log(props.node);

const ReactComponent = () => {
  return h('p', props.node.props, props.node.props.children);
};
</script>

<template>
  <!-- {{ props.node }} -->
  <!-- {{ props.node }} -->
  <!-- {{ h('div', props.node.props.children) }} -->
  <!-- {{ ReactInVue(props.node) }}
  {{ ReactWrapper(props.node) }} -->
  <!-- <react :component="component" /> -->
  <!-- <ReactApp :node="props.node" /> -->
  <!-- <ReactComponent />
  <Test /> -->
  <table style="width: 100%">
    <thead>
      <tr v-for="headerGroup in table.getHeaderGroups()" :key="headerGroup.id">
        <th v-for="header in headerGroup.headers" :key="header.id" :colSpan="header.colSpan">
          <FlexRender
            v-if="!header.isPlaceholder"
            :render="header.column.columnDef.header"
            :props="header.getContext()"
          />
        </th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="row in table.getRowModel().rows" :key="row.id">
        <td v-for="cell in row.getVisibleCells()" :key="cell.id">
          <FlexRender :render="cell.column.columnDef.cell" :props="cell.getContext()" />
        </td>
      </tr>
    </tbody>
  </table>
</template>

<style>
html {
  font-family: sans-serif;
  font-size: 14px;
}

table {
  border: 1px solid lightgray;
}

tbody {
  border-bottom: 1px solid lightgray;
}

th {
  border-bottom: 1px solid lightgray;
  border-right: 1px solid lightgray;
  padding: 2px 4px;
}

td {
  border-bottom: 1px solid lightgray;
  border-right: 1px solid lightgray;
  padding: 2px 4px;
}

tfoot {
  color: gray;
}

tfoot th {
  font-weight: normal;
}
</style>

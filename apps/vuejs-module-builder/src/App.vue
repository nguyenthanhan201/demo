<template>
  <!-- <img alt="Vue logo" src="./assets/logo.png" /> -->
  <Designer></Designer>
  <!-- <div class="flex justify-between items-center">
    <SidebarRight />
    <MainBuilder />
    <MenuLeft />
    <RightSidebarEditor />
  </div> -->
</template>

<script lang="ts">
import { defineComponent } from 'vue';
// import HelloWorld from './components/HelloWorld.vue';
import Designer from '../src/views/designer/Designer.vue';
import MainBuilder from './components/MainBuilder.vue';
import MenuLeft from './components/designer/MenuLeft.vue';
import SidebarRight from './components/designer/SidebarLeft.vue';
import RightSidebarEditor from './components/designerMain/editor-menu/RightSidebarEditor.vue';

export default defineComponent({
  name: 'App',
  components: {
    SidebarRight,
    MainBuilder,
    MenuLeft,
    RightSidebarEditor,
    Designer
  }
});
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>

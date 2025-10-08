<script setup lang="ts">

</script>

<template>
  <a-layout class="layout">
    <a-layout-header>
      <a-menu mode="horizontal" theme="dark">
        <a-menu-item key="home"
          ><RouterLink to="/">Главная</RouterLink></a-menu-item
        >
      </a-menu>
    </a-layout-header>

<a-layout-content>
  <div class="content-inner">
    <RouterView />
  </div>
</a-layout-content>
  </a-layout>
</template>

<style lang="less">
html,
body,
#app {
  height: 100%; 
  margin: 0;
}

.layout {
  min-height: 100%;
  display: flex;
  flex-direction: column;
}

a-layout-header {
  flex: 0 0 auto; 
}


.content-inner {
  flex: 1 1 auto;
  padding: 20px;         
  box-sizing: border-box;
  overflow-y: auto;      
}
</style>

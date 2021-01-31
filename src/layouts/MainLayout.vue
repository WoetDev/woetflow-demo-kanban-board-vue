<template>
  <q-layout view="hhh Lpr fff">
    <q-page-container>
      <router-view />
    </q-page-container>
    <q-footer>
      <div class="text-center q-pa-md">
        <div>
          Demo full-stack Kanban Board by
          <a href="https://woetflow.com/" target="_blank">Woet Flow</a>
        </div>
        <div>
          Github: 
          <a href="https://github.com/WoetDev/woetflow-demo-kanban-board-vue" target="_blank">Vue SPA Frontend</a> / 
          <a href="https://github.com/WoetDev/woetflow-demo-kanban-board-api" target="_blank">Ruby on Rails API Backend</a>
        </div>
      </div>
    </q-footer>
  </q-layout>
</template>

<script>
export default {
  name: 'MainLayout'
}
</script>

<style scoped lang="scss">

footer {
  a {
    color: white;
    font-weight: bold;
  }
}
</style>

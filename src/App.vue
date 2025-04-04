<template>
  <div class="app">
    <router-view v-slot="{ Component }">
      <transition name="fade" mode="out-in">
        <component :is="Component" />
      </transition>
    </router-view>
  </div>
</template>

<script setup lang="ts">
// Компонент не требует дополнительной логики
</script>

<style lang="scss">
.fade-enter-active {
  transition: $transition-slow;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>

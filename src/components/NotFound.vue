<template>
  <section class="page-not-found">
    <Header />
    <div class="page-not-found__content">
      <h1 class="page-not-found__title">404</h1>
      <span class="page-not-found__message">{{ $t('PageNotFound') }}</span>
      <router-link to="/" class="home-link">
        <button
          type="button"
          class="page-not-found__button"
          :class="{ 'page-not-found__button-light-color': theme === 'light' }"
        >
          {{ $t('Back') }}
        </button>
      </router-link>
    </div>
  </section>
</template>

<script setup lang="ts">
import { onMounted } from "vue";
import Header from "./Header.vue";
import { useTheme } from "@/utils/useTheme";

const { theme, setTheme } = useTheme();
console.log("Theme in NotFound:", theme.value);

// Добавляем слушатель при монтировании
onMounted(() => {
  setTheme(theme.value); // Устанавливаем тему при монтировании
});
</script>

<style lang="scss" scoped>
.page-not-found {
  display: flex;
  flex-direction: column;
  color: var(--primary-color);

  &__content {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    margin-top: calc((75vh - $header-height) / 2);
  }

  &__title {
    font-size: 32px;
    font-weight: 400;
  }

  &__message {
    font: inherit;
    font-size: 18px;
  }

  &__button {
    width: 68px;
    height: 31px;
    border-radius: 8px;
    background-color: #000000;
    color: var(--primary-color);
    margin-top: 32px;
    border: 1px solid var(--secondary-color);
    transition: box-shadow 0.3s ease-in-out, transform 0.3s ease-in-out;
    cursor: pointer;
  }

  &__button-light-color {
    color: var(--secondary-color);
  }

  &__button:hover {
    transform: scale(1.1);
    box-shadow: 0 0 10px 1px var(--secondary-color);
  }

  &__button:focus {
    border: none;
    outline: 2px solid var(--primary-color);
  }
}
</style>

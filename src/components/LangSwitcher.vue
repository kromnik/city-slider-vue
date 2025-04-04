<template>
  <button
    class="lang-button"
    @click="toggleLanguage"
  >
    {{ $t('lang') }} 
  </button>
</template>

<script setup lang="ts">
import { useI18n } from "vue-i18n";

const { locale } = useI18n();

// Функция для смены языка
const toggleLanguage = () => {
  locale.value = locale.value === "ru" ? "en" : "ru";
};
</script>

<style scoped lang="scss">
.lang-button {
  background-color: transparent;
  width: 24px;
  color: var(--primary-color);
  border: none;
  cursor: pointer;
  transition: box-shadow 0.3s ease-in-out, border-radius 0.3s ease-in-out;
}

.lang-button:hover {
  border-radius: 50%;
  box-shadow: 0 0 10px 1px var(--secondary-color);
}

.lang-button:focus {
  border-radius: 50%;
  outline: 1px solid var(--secondary-color);
}
</style>

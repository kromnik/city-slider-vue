<template>
  <button class="theme-switcher" @click="toggleTheme">
    <img
      :src="theme === 'dark' ? LightIcon : DarkIcon"
      :alt="theme === 'dark' ? 'Светлая тема' : 'Темная тема'"
    />
  </button>
</template>

<script setup lang="ts">
// import { onMounted } from "vue";
import LightIcon from "@/assets/icons/sun.svg";
import DarkIcon from "@/assets/icons/moon-not-filled.svg";
import { useTheme } from "@/utils/useTheme";

const { theme, setTheme } = useTheme();
console.log("theme in ThemeSwitcher", theme.value);

const toggleTheme = () => {
  const newTheme = theme.value === "dark" ? "light" : "dark";
  setTheme(newTheme);
};
</script>

<style lang="scss" scoped>
.theme-switcher {
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 0;
  border: none;
  background-color: transparent;
  cursor: pointer;
  transition: box-shadow 0.3s ease-in-out, border-radius 0.3s ease-in-out;

  &:hover {
    border-radius: 50%;
    box-shadow: 0 0 10px 1px #d7d7d7;
  }
}
</style>

<template>
  <header class="header">
    <div v-if="isAuthenticated" class="header__authenticated">
      <div class="header__user-info">
        {{ `${$t('welcome')} ${user?.username}!` }}
      </div>
      <div class="header__authenticated-button-block">
        <button class="header__city-add-button" @click="openAddCityModal">
          <img :src="cityIcon" alt="add" />
          {{'+'}}
        </button>
        <AddCityPopup
          :showModal="showAddCityModal"
          @close="closeAddCityModal"
        />
        <ThemeSwitcher />
        <LangSwitcher />
        <button class="header__logout-button" @click="handleLogout">
          {{ $t('logout') }}
        </button>
      </div>
    </div>
    <div v-else class="header__unauthenticated">
      <ThemeSwitcher />
      <LangSwitcher />
    </div>
  </header>
</template>

<script setup lang="ts">
import { computed, ref } from "vue";
import { useAuthStore } from "@/stores/auth";
import { storeToRefs } from "pinia";
import { useRouter } from "vue-router";
import { useTheme } from "@/utils/useTheme";
import ThemeSwitcher from "./ThemeSwitcher.vue";
import LangSwitcher from "./LangSwitcher.vue";
import AddCityPopup from "./AddCityPopup.vue";
import CityIconNormal from "../assets/icons/city_normal.svg";
import CityIconDark from "../assets/icons/city_dark.svg";

const router = useRouter();
const { theme } = useTheme();
const authStore = useAuthStore();
const { user, isAuthenticated } = storeToRefs(authStore);
const showAddCityModal = ref(false);

const cityIcon = computed(() => {
  return theme.value === "dark" ? CityIconDark : CityIconNormal;
});

const openAddCityModal = () => {
  showAddCityModal.value = true;
};

const closeAddCityModal = () => {
  showAddCityModal.value = false;
};

const handleLogout = () => {
  authStore.logout();
  router.push("/login");
};
</script>

<style lang="scss" scoped>
.header {
  display: flex;
  height: $header-height;
  padding: 0 24px;
  background-color: inherit;
  color: #000;

  &__authenticated {
    display: flex;
    justify-content: space-between;
    width: 100%;
    align-items: center;
    // gap: 20px;
  }

  &__authenticated-button-block {
    display: flex;
    align-items: center;
    gap: 10px;
  }

  &__unauthenticated {
    display: flex;
    // justify-content: space-between;
    align-items: center;
    margin-left: auto;
    // padding: 0 24px;
    gap: 10px;
  }

  &__user-info {
    // font-size: 1.1rem;
    color: var(--primary-color);
  }

  &__city-add-button {
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 10px;
    min-height: 30px;
    padding: 0 10px;
    border: 1px solid var(--secondary-color);
    border-radius: 8px;
    background-color: transparent;
    color: var(--primary-color);
    transition: box-shadow .3s ease-in-out;
    cursor: pointer;
  }

  &__city-add-button:hover {
    box-shadow: 0 0 10px 1px var(--secondary-color);
  }

  &__city-add-button:focus {
    border: none;
    outline: 2px solid var(--primary-color);
  }

  &__logout-button {
    background-color: transparent;
    color: var(--primary-color);
    border: none;
    transition: box-shadow 0.3s ease-in-out, border-radius 0.3s ease-in-out;
    cursor: pointer;
    font-size: 1rem;
    margin: 0;
    padding: 0;
    box-sizing: border-box;

    &:hover {
      border-radius: 8px;
      box-shadow: 0 0 10px 1px var(--secondary-color);
    }
  }
}
</style>

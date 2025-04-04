<template>
  <div class="dashboard">
    <Header />
    <main class="dashboard__content">
      <div class="city-selection">
        <select
          v-model="selectedCityId"
          @change="handleCityChange"
          :class="{ 'select-dark': theme === 'dark' }"
          autoFocus
        >
          <option value="">{{ $t('SelectACity') }}</option>
          <option v-for="city in cities" :key="city.id" :value="city.id">
            {{ city.name }}
          </option>
        </select>
      </div>
      <Slider />
      <div v-if="selectedCity" class="selected-city">
        <div class="selected-city__header">
          <h2>{{ selectedCity.name }}</h2>
          <button @click="openEditCityModal">
            <img :src="EditBtnIcon" alt="edit" />
          </button>
          <EditCityPopup
            :showModal="showEditCityModal"
            @close="closeEditCityModal"
          />
          <button @click="openDeleteCityModal">
            <img :src="DeleteBtnIcon" alt="delete" />
          </button>
          <DeleteCityPopup
            :showModal="showDeleteCityModal"
            @close="closeDeleteCityModal"
            @deleted="handleCityDeleted"
          />
        </div>
        <p :class="{ 'selected-city-desc-theme-light': theme === 'light' }">
          {{ selectedCity.description }}
        </p>
      </div>
      <div
        v-else
        :class="{
          'not-selected-city': true,
          'not-selected-city-theme-light': theme === 'light',
        }"
      >
      {{ cities.length > 0 ? $t('CityNotSelected') : $t('AddACity') }}
      </div>
    </main>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, onUnmounted, watch } from "vue";
import Header from "./Header.vue";
import Slider from "./Slider.vue";
import { useCitiesStore } from "@/stores/cities";
import { useTheme } from "@/utils/useTheme";
import EditCityPopup from "./EditCityPopup.vue";
import DeleteCityPopup from "./DeleteCityPopup.vue";
import EditBtnIcon from "@/assets/icons/btn-edit.svg";
import DeleteBtnIcon from "@/assets/icons/been-full.svg";

const citiesStore = useCitiesStore();
const cities = computed(() => citiesStore.cities);
const selectedCity = computed(() => citiesStore.selectedCity || null);
const showEditCityModal = ref(false);
const showDeleteCityModal = ref(false);
const selectedCityId = ref<string>(""); // Инициализируем как пустую строку

// Используем useTheme для управления темой
const { theme } = useTheme();

onMounted(() => {
  onUnmounted(() => {
    citiesStore.clearSelectedCity();
  });
});

watch(selectedCity, (newCity) => {
  if (newCity) {
    selectedCityId.value = String(newCity.id); // Устанавливаем ID выбранного города
  } else {
    selectedCityId.value = ""; // Сбрасываем выбор, если город не выбран
  }
});

const handleCityChange = () => {
  const city = cities.value.find(
    (city) => city.id === Number(selectedCityId.value)
  );
  if (city) {
    citiesStore.selectCity(city);
  } else {
    citiesStore.clearSelectedCity();
  }
};

const handleCityDeleted = () => {
  selectedCityId.value = ""; // Сбрасываем выбор города
};

// Открытие модального окна редактирования города
const openEditCityModal = () => {
  showEditCityModal.value = true;
};

const openDeleteCityModal = () => {
  showDeleteCityModal.value = true;
};

// Закрытие модального окна редактирования города
const closeEditCityModal = () => {
  showEditCityModal.value = false;
};

const closeDeleteCityModal = () => {
  showDeleteCityModal.value = false;
};
</script>

<style lang="scss" scoped>
.dashboard {
  min-height: 100vh;
  display: flex;
  flex-direction: column;

  &__content {
    flex: 1;
    max-width: 1200px;
    margin: 0 auto;
    width: 100%;
  }
}

.city-selection {
  margin: 12px 0 0;
  text-align: center;

  select {
    padding: 10px 0 10px 10px;
    font-family: inherit;
    font-size: 16px;
    line-height: 14.52px;
    color: var(--primary-color);
    border: 1px solid var(--secondary-color);
    border-radius: 8px;
    appearance: none;
    background: url("../assets/arrows/stat_min_theme_normal.svg") no-repeat
      right;
    background-position-x: calc(100% - 10px);
    width: 30%;
    transition: box-shadow 0.3s ease-in-out;
    cursor: pointer;

    &:hover {
      box-shadow: 0 0 10px 1px var(--secondary-color);
    }

    &:focus {
      border: none;
      outline: 2px solid var(--primary-color);
    }

    &.select-dark {
      background: url("../assets/arrows/stat_min_theme_dark.svg") no-repeat
        right;
      background-position-x: calc(100% - 10px);
    }
  }
}

.selected-city {
  display: flex;
  flex-direction: column;
  align-items: center;
  max-width: 60%;
  margin: 20px auto;

  &__header {
    position: relative;
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    margin-bottom: 20px;

    h2 {
      color: var(--primary-color);
      font-weight: 500;
    }

    button {
      position: absolute;
      display: flex;
      justify-content: center;
      align-items: center;
      min-height: 30px;
      padding: 0 10px;
      box-sizing: border-box;
      border: 1px solid var(--secondary-color);
      border-radius: 8px;
      background-color: transparent;
      transition: box-shadow 0.3s ease-in-out;
      cursor: pointer;
    }

    button {
      right: 70px;
    }

    button:last-child {
      right: 15px;
    }

    button:hover {
      box-shadow: 0 0 10px 1px var(--secondary-color);
    }
  }

  p {
    color: var(--secondary-color);
    line-height: 1.6;
    margin: 0;
  }

  .selected-city-desc-theme-light {
    color: var(--primary-color);
  }
}

.not-selected-city {
  display: flex;
  margin: 0 auto 15px;
  justify-content: center;
  align-items: center;
  color: var(--secondary-color);
}

.not-selected-city-theme-light {
  color: var(--primary-color);
}
</style>

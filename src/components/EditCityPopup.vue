<template>
  <Modal
    :title="$t('EditCity')"
    :buttonText="$t('Save')"
    :isOpen="showModal"
    @close="handleClose"
    @submit="handleSubmit"
  >
    <div class="modal__form-group">
      <input
        type="text"
        class="modal__form-control"
        id="modalCityName"
        :placeholder="$t('CityName')"
        v-model="name"
        autocomplete="off"
        maxlength="25"
        required
      />
    </div>
    <div class="modal__form-group">
      <input
        type="url"
        class="modal__form-control"
        id="modalCitySrc"
        :placeholder="$t('EnterTheURLOfTheImage')"
        ref="cityImageRef"
        autocomplete="off"
        required
      />
    </div>
    <div class="modal__form-group">
      <textarea
        class="modal__form-control"
        id="modalCityDescription"
        :placeholder="$t('CityDescription')"
        v-model="description"
        required
      ></textarea>
    </div>
  </Modal>
</template>

<script setup lang="ts">
import { ref, watch, computed } from "vue";
import { useI18n } from "vue-i18n";
import Modal from "./Modal.vue";
import { useCitiesStore } from "@/stores/cities";

interface Props {
  showModal: boolean;
  onClose: () => void;
}

const props = defineProps<Props>();

const { t } = useI18n();
const citiesStore = useCitiesStore();
const selectedCity = computed(() => citiesStore.selectedCity);
const name = ref("");
const description = ref("");
const cityImageRef = ref<HTMLInputElement | null>(null);

watch(
  () => props.showModal,
  (newVal) => {
    if (newVal && selectedCity) {
      name.value = selectedCity.value?.name || "";
      description.value = selectedCity.value?.description || "";
      if (cityImageRef.value) {
        cityImageRef.value.value = selectedCity.value?.src || "";
      }
    }
  }
);

const handleClose = () => {
  props.onClose();
};

const handleSubmit = () => {
  if (
    citiesStore.cities.some(
      (city) =>
        city.id !== selectedCity.value?.id &&
        city.name.toLowerCase() === name.value.toLowerCase()
    )
  ) {
    alert(t('ThereIsAlreadyACityWithThisName'));
    return;
  }

  if (cityImageRef.value) {
    const updatedCity = {
      id: selectedCity.value?.id ?? 0,
      name: name.value,
      src: cityImageRef.value.value,
      description: description.value,
    };
    citiesStore.updateCity(updatedCity);
    citiesStore.selectCity(updatedCity);
    name.value = "";
    description.value = "";
    cityImageRef.value.value = "";
    handleClose();
  }
};
</script>
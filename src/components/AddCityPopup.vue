<template>
  <Modal
    :title="$t('AddCity')"
    :buttonText="$t('Add')"
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
import { ref } from "vue";
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
const name = ref("");
const description = ref("");
const cityImageRef = ref<HTMLInputElement | null>(null);


const handleClose = () => {
  props.onClose();
  name.value = "";
  description.value = "";
  if (cityImageRef.value) {
    cityImageRef.value.value = "";
  }
};

const handleSubmit = () => {
  if (
    citiesStore.cities.some(
      (city) =>
        city.name.toLowerCase() === name.value.toLowerCase()
    )
  ) {
    alert(t('ThereIsAlreadyACityWithThisName'));
    return;
  }

  if (cityImageRef.value) {
    const newCity = {
      id: Date.now(),
      name: name.value,
      src: cityImageRef.value.value,
      description: description.value,
    };
    citiesStore.addCity(newCity);
    citiesStore.selectCity(newCity);
    handleClose();
  }
};
</script>
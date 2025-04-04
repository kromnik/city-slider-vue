<template>
  <Modal
    :title="$t('DeleteCity')"
    :buttonText="$t('Delete')"
    :isOpen="showModal"
    @close="handleClose"
    @submit="handleSubmit"
  >
    <div class="modal__form-group">
      <input
        type="text"
        class="modal__form-control"
        id="modalCityName"
        v-model="name"
        readOnly
      />
    </div>
  </Modal>
</template>

<script setup lang="ts">
import { ref, watch, computed } from "vue";
import Modal from "./Modal.vue";
import { useCitiesStore } from "@/stores/cities";

interface Props {
  showModal: boolean;
  onClose: () => void;
}

const props = defineProps<Props>();
const emit = defineEmits(["deleted"]);

const citiesStore = useCitiesStore();
const selectedCity = computed(() => citiesStore.selectedCity);
const name = ref("");

watch(
  () => props.showModal,
  (newVal) => {
    if (newVal && selectedCity) {
      name.value = selectedCity.value?.name || "";
    }
  }
);

const handleClose = () => {
  props.onClose();
};

const handleSubmit = () => {
  if (selectedCity.value) {
    citiesStore.deleteCity(selectedCity.value);
    citiesStore.clearSelectedCity();
    name.value = "";
    emit("deleted");
    handleClose();
  }
};
</script>
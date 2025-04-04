<template>
  <teleport to="body">
    <div class="modal-img" :class="{ 'modal-img__visible': props.isOpen }" :data-theme="theme">
      <div class="modal-img__overlay" @click="handleClose">
        <div class="modal-img__content" @click.stop>
            <img 
              class="modal-img__image"
              :src="props.cityLink"
              :alt="props.cityName"
            />
            <button type="button" class="modal-img__btn-close" @click="handleClose">
              <img :src="closeIcon" alt="close" />
            </button>
            <h3 class="modal-img__title">{{ cityName }}</h3>
          </div>
        </div>
      </div>
  </teleport>
</template>

<script setup lang="ts">
import { watch, onMounted, onUnmounted, computed } from "vue";
import { useTheme } from "@/utils/useTheme";
import closeIconDark from "@/assets/icons/btn-close_dark.svg";
import closeIconNormal from "@/assets/icons/btn-close_normal.svg";

interface Props {
  cityName?: string;
  cityLink?: string;
  isOpen?: boolean;
  onClose?: () => void;
}

const props = defineProps<Props>();
const { theme } = useTheme();

const closeIcon = computed(() => {
  return theme.value === "dark" ? closeIconDark : closeIconNormal;
});

const handleClose = () => {
  if (props.onClose) {
    props.onClose();
  }
};

const handleKeyDown = (e: KeyboardEvent) => {
  if (e.key === "Escape") {
    handleClose();
  }
};

onMounted(() => {
  if (props.isOpen) {
    window.addEventListener("keydown", handleKeyDown);
  }
});

onUnmounted(() => {
  window.removeEventListener("keydown", handleKeyDown);
});

watch(
  () => props.isOpen,
  (newVal) => {
    if (newVal) {
      window.addEventListener("keydown", handleKeyDown);
    } else {
      window.removeEventListener("keydown", handleKeyDown);
    }
  }
);
</script>

<style lang="scss" scoped>
.modal-img {
  position: fixed;
  inset: 0;
  z-index: 100;
  opacity: 0;
  pointer-events: none;
  color: var(--primary-color);
  transition: opacity .3s linear;

  &__visible {
    pointer-events: auto;
    opacity: 1;
  }

  &__overlay {
    width: 100%;
    height: 100%;
    background: $overlay-color;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  &__content {
    position: relative;
    display: flex;
    width: 100%;
    max-width: 60%;
    flex-direction: column;
    align-items: center;
    border: 1px solid var(--secondary-color);
    border-radius: 8px;
    box-shadow: 0 0 10px 1px var(--secondary-color);
    background: var(--bg-color);
  }

  &__image {
    max-width: 75vw;
    max-height: 75vh;
    width: 100%;
    object-fit: cover;
    border: none;
    border-radius: 8px 8px 5px 5px;
    object-position: center;
    overflow: hidden;
  }

  &__title {
    display: flex;
    align-items: center;
    font-size: 20px;
    font-weight: 500;
    line-height: 22px;
    min-height: 30px;
  }

  &__btn-close {
    position: absolute;
    right: -40px;
    top: -40px;
    height: 24px;
    width: 24px;
    background: transparent;
    border: none;
    transition: box-shadow .3s ease-in-out, border-radius .3s ease-in-out;
    cursor: pointer;
  }

  &__btn-close:hover {
    border-radius: 50%;
    box-shadow: 0 0 10px 1px var(--secondary-color);
  }
}
</style>
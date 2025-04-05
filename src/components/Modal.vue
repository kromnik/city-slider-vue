<template>
  <teleport to="body">
    <div class="modal" :class="{ 'modal__visible': isOpen }" :data-theme="theme">
      <div class="modal__overlay" @click="handleClose">
        <div class="modal__content" @click.stop>
          <div class="modal__header">
            <h3 class="modal__title">{{ title }}</h3>
            <button type="button" class="modal__btn-close" @click="handleClose">
              <img :src="closeIcon" alt="close" />
            </button>
          </div>
          <form @submit.prevent="handleSubmit">
            <div class="modal__body">
              <slot />
            </div>
            <div class="modal__footer">
              <button type="button" class="modal__btn-cancel" @click="handleClose">
                {{ $t("Cancel") }}
              </button>
              <button type="submit" class="modal__btn-submit">
                {{ buttonText }}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  </teleport>
</template>

<script setup lang="ts">
import { watch, computed } from "vue";
import { useTheme } from "@/utils/useTheme";
import closeIconDark from "@/assets/icons/btn-close_dark.svg";
import closeIconNormal from "@/assets/icons/btn-close_normal.svg";


interface Props {
  title?: string;
  buttonText?: string;
  isOpen: boolean;
  onClose?: () => void;
  onSubmit?: () => void;
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

const handleSubmit = () => {
  if (props.onSubmit) {
    props.onSubmit();
  }
};

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

<style lang="scss" >
.modal {
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
    display: flex;
    width: 100%;
    max-width: 40%;
    flex-direction: column;
    padding: 15px;
    border-radius: 15px;
    border: 1px solid var(--secondary-color);
    box-shadow: 0 0 10px 1px var(--secondary-color);
    background: var(--bg-color);
  }

  &__header {
    position: relative;
    display: flex;
    justify-content: center;
    align-items: center;
    margin-bottom: 15px;
  }

  &__title {
    font-size: 20px;
    font-weight: 500;
    line-height: 20px;

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

  &__body {
    display: flex;
    flex-direction: column;
    width: 100%;
  }

  &__footer {
    display: flex;
    justify-content: center;
    gap: 10px;
    margin-top: 15px;
  }

  &__btn-cancel {
    width: 30%;
    min-height: 30px;
    border: 1px solid var(--secondary-color);
    border-radius: 8px;
    background-color: transparent;
    color: $red-light-color;
    transition: box-shadow .3s ease-in-out;
    cursor: pointer;
  }

  &__btn-cancel:hover {
    box-shadow: 0 0 10px 1px var(--secondary-color);
  }
  
  &__btn-cancel:focus {
    border: none;
    outline: 2px solid var(--primary-color);
  }

  &__btn-submit {
    width: 30%;
    min-height: 30px;
    border: 1px solid var(--secondary-color);
    border-radius: 8px;
    background-color: transparent;
    color: var(--primary-color);
    transition: box-shadow .3s ease-in-out;
    cursor: pointer;
  }

  &__btn-submit:hover {
    box-shadow: 0 0 10px 1px var(--secondary-color);
  }

  &__btn-submit:focus {
    border: none;
    outline: 2px solid var(--primary-color);
  }

  &__form-group {
    display: flex;
    flex-direction: column;
    margin-bottom: 12px;
  }

  &__form-group:last-of-type {
    margin-bottom: 0;
  }

  &__form-control {
    border-radius: 8px;
    border: 1px solid var(--secondary-color);
    font-size: 12px;
    line-height: 14.52px;
    padding: 8px;
    padding-left: 16px;
    background: inherit;
    color: var(--primary-color);
    transition: outline .1s linear;
    text-overflow: ellipsis;
    white-space: nowrap;
    overflow: hidden;
  }

  &__form-control:last-of-type {
    min-height: 32px;
    resize: vertical;
  }

  &__form-control::placeholder {
    color: var(--secondary-color);
  }

  &__form-control:focus {
    border: none;
    outline: 2px solid var(--primary-color);
  }

}

/* .modal__visible {
  display: flex;
}

.modal__overlay {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
}

.modal__content {
  position: relative;
  background: var(--background-color);
  border-radius: 8px;
  padding: 20px;
  width: 500px;
  max-width: 90%;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.2);
}

.modal__header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
}

.modal__title {
  font-size: 20px;
  font-weight: bold;
  margin: 0;
}

.modal__btn-close {
  background: none;
  border: none;
  cursor: pointer;
}

.modal__body {
  margin-bottom: 20px;
}

.modal__footer {
  display: flex;
  justify-content: flex-end;
  gap: 10px;
}

.modal__btn-cancel,
.modal__btn-submit {
  padding: 10px 20px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
}

.modal__btn-cancel {
  background: #ccc;
  color: #000;
}

.modal__btn-submit {
  background: var(--primary-color);
  color: #fff;
} */
</style>
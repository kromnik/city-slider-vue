<template>
  <div class="slider-wrapper">
    <swiper
      :modules="[Navigation, Pagination, EffectCoverflow]"
      :effect="'coverflow'"
      :slides-per-view="'auto'"
      :space-between="10"
      :speed="600"
      :coverflowEffect="{
        rotate: 50,
        stretch: 0,
        depth: 100,
        modifier: 1,
        slideShadows: false,
      }"
      :navigation="{
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev',
      }"
      :pagination="{
        el: '.swiper-pagination',
        clickable: true,
        type: 'bullets',
      }"
      :centeredSlides="true"
      class="mySwiper"
      :loop="false"
      @slideChange="onSlideChange"
      @swiper="onSwiper"
    >
      <swiper-slide v-for="(city, index) in cities" :key="city.id">
        <article
          class="slide"
          :class="{ 'slide--active': index === currentIndex }"
          @click="
            index === currentIndex
              ? (showImageCityModal = true)
              : (showImageCityModal = false)
          "
        >
          <img :src="city.src" :alt="city.name" class="slide-image" />
          <div class="slide-content">
            <h3>{{ city.name }}</h3>
          </div>
          <ImageCityPopup
            v-if="index === currentIndex"
            :cityName="city.name"
            :cityLink="city.src"
            :isOpen="showImageCityModal"
            @close="showImageCityModal = false"
          />
        </article>
      </swiper-slide>

      <div class="swiper-button-prev" slot="button-prev"></div>
      <div class="swiper-button-next" slot="button-next"></div>
      <div class="swiper-pagination"></div>
    </swiper>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, watch, onMounted } from "vue";
import { Swiper, SwiperSlide } from "swiper/vue";
import type { Swiper as SwiperType } from "swiper";
import { Navigation, Pagination, EffectCoverflow } from "swiper/modules";
import { useCitiesStore } from "@/stores/cities";
import ImageCityPopup from "./ImageCityPopup.vue";
import "swiper/css";
import "swiper/css/effect-coverflow";
import "swiper/css/pagination";
import "swiper/css/navigation";

const citiesStore = useCitiesStore();
const cities = computed(() => citiesStore.cities);
const selectedCity = computed(() => citiesStore.selectedCity);
const currentIndex = ref(0);
const swiperInstance = ref<SwiperType | null>(null);
const showImageCityModal = ref(false);

const handleMiddleSlide = () => {
  if (cities.value.length > 0 && swiperInstance.value) {
    const middleIndex = Math.floor(cities.value.length / 2); // Вычисляем индекс среднего элемента
    swiperInstance.value.slideToLoop(middleIndex); // Переключаемся на средний слайд
    currentIndex.value = middleIndex; // Обновляем локальный индекс
  }
};

// Следим только за изменениями из store
watch(selectedCity, (newCity) => {
  if (newCity) {
    const index = cities.value.findIndex((city) => city.id === newCity.id);
    if (index !== -1 && swiperInstance.value) {
      swiperInstance.value.slideToLoop(index);
      currentIndex.value = index;
    }
  }

  // Если город не выбран, то возвращаемся на средний слайд
  if (!newCity) {
    handleMiddleSlide();
  }
});

// При монтировании компонента переключаемся на средний слайд
onMounted(() => {
  handleMiddleSlide();
});

const onSwiper = (swiper: SwiperType) => {
  swiperInstance.value = swiper;
};

// Просто обновляем локальный индекс для анимаций
const onSlideChange = (swiper: SwiperType) => {
  currentIndex.value = swiper.realIndex;
};
</script>

<style lang="scss" scoped>
.slider-wrapper {
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 20px;
  margin: 0 auto;
  max-width: 1400px;
  padding: 20px 10px;
}

.mySwiper {
  width: 100%;
  height: 380px;
}

:deep(.swiper-slide) {
  width: 290px;
  height: 340px;
  transition: transform 0.5s ease;
}

:deep(.swiper-slide-active) {
  transform: translateZ(0);
  cursor: pointer;
}

.slide {
  width: 100%;
  height: 100%;
  overflow: hidden;
}

.slide-image {
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: center;
  overflow: hidden;
  border-radius: 15px;
}

.slide-content {
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  padding: 10px;
  background: linear-gradient(transparent, rgba(0, 0, 0, 0.7));
  color: var(--secondary-color);
  border-bottom-left-radius: 15px;
  border-bottom-right-radius: 15px;
  opacity: 0;
  transform: translateY(20px);
  transition: all 0.5s cubic-bezier(0.4, 0, 0.2, 1);

  .slide--active & {
    opacity: 1;
    transform: translateY(0);
  }

  h3 {
    margin: 0;
    font-size: 20px;
    text-align: center;
    font-weight: 400;
    text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.3);
    overflow: hidden;
  }
}

:deep(.swiper-button-prev),
:deep(.swiper-button-next) {
  color: var(--primary-color);
  background: transparent;
  width: 35px;
  height: 35px;
  transition: box-shadow 0.3s ease-in-out, border-radius 0.3s ease-in-out;

  &::after {
    font-size: 24px;
  }

  &:hover {
    border-radius: 50%;
    box-shadow: 0 0 10px 1px var(--secondary-color);
  }
}

:deep(.swiper-pagination) {
  position: absolute;
  bottom: 10px;
  left: 0;
  right: 0;
  z-index: 100;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 20px;
}

:deep(.swiper-pagination-bullet) {
  width: 6px;
  height: 6px;
  background: var(--secondary-color);
  opacity: 1;
  transition: all 0.3s ease-in-out;
  cursor: pointer;
  margin: 0 !important;
  border-radius: 50%;
}

:deep(.swiper-pagination-bullet-active) {
  background: var(--primary-color);
  transform: scale(1.1);
}
</style>

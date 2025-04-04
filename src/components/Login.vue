<template>
  <div class="login-page">
    <Header />
    <div class="login-container">
      <h2>{{ $t('loginToThePanel') }}</h2>
      <form @submit.prevent="handleLogin">
        <div class="form-group">
          <input
            type="text"
            id="username"
            v-model="username"
            :placeholder="$t('EnterYourLogin')"
            required
            autoComplete="off"
          />
        </div>
        <div class="form-group">
          <input
            type="password"
            id="password"
            v-model="password"
            :placeholder="$t('EnterYourPassword')"
            required
            autoComplete="off"
          />
        </div>
        <button 
          type="submit"
          :class="{ 'login-button-theme-light': theme === 'light' }"
        >
          {{ $t('login') }}
        </button>
      </form>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { useRouter } from "vue-router";
import { useAuthStore } from "@/stores/auth";
import { useTheme } from "@/utils/useTheme";
import Header from "./Header.vue";

const router = useRouter();
const authStore = useAuthStore();
const { theme } = useTheme();

const username = ref("");
const password = ref("");

const handleLogin = () => {
  if (authStore.login(username.value, password.value)) {
    router.push("/dashboard");
  }
};
</script>

<style lang="scss" scoped>
.login-page {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  width: 100%;
}

.login-container {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  width: 230px;
  height: $login-container-height;
  margin: 0 auto;
  margin-top: calc((100vh - $header-height - $login-container-height) / 2);

  h2 {
    width: 100%;
    text-align: center;
    font-family: inherit;
    font-size: 18px;
    font-weight: 500;
    line-height: 19.36px;
    color: var(--primary-color);
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  form {
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 100%;
  }

  .form-group {
    margin-bottom: 12px;

    input {
      border-radius: 8px;
      border: 1px solid var(--secondary-color);
      font-size: 12px;
      line-height: 14.52px;
      padding: 8px;
      padding-left: 16px;
      background-color: inherit;
      color: var(--primary-color);
      transition: outline 0.1s linear;
      text-overflow: ellipsis;
      white-space: nowrap;
      overflow: hidden;

      &::placeholder {
        color: var(--secondary-color);
      }

      &:focus {
        border: none;
        outline: 2px solid var(--primary-color);
      }
    }
  }

  .form-group:last-of-type {
    margin-bottom: 0;

    input {
      color: var(--inverted-primary-color);
    }
  }

  button {
    width: 68px;
    height: 31px;
    border-radius: 8px;
    background-color: #000;
    color: var(--primary-color);
    margin-top: 32px;
    border: 1px solid var(--secondary-color);
    transition: box-shadow 0.3s ease-in-out, transform 0.3s ease-in-out;
    cursor: pointer;

    &:hover {
      transform: scale(1.1);
      box-shadow: 0 0 10px 1px var(--secondary-color);
    }

    &:focus {
      border: none;
      outline: 2px solid #000;
    }

    &.login-button-theme-light {
      color: var(--secondary-color);
    }
  }
}
</style>

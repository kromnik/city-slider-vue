import { ref } from "vue";

// Создаем единый ref для темы
const theme = ref(localStorage.getItem("theme") || "light");
if (theme.value === "dark") {
  document.documentElement.classList.add("dark-theme");
} else {
  document.documentElement.classList.remove("dark-theme");
}

export function useTheme() {
  const setTheme = (newTheme: string) => {
    theme.value = newTheme;
    localStorage.setItem("theme", newTheme);

    if (newTheme === "dark") {
      document.documentElement.classList.add("dark-theme");
    } else {
      document.documentElement.classList.remove("dark-theme");
    }
  };

  return { theme, setTheme };
}

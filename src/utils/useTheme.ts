import { ref } from "vue";

// Создаем единый ref (синглтон) для темы
const theme = ref(localStorage.getItem("theme") || "light")
// Устанавливаем класс на html элемент в зависимости от темы
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

  setTheme(theme.value); // Устанавливаем начальную тему при загрузке

  return { theme, setTheme };
}



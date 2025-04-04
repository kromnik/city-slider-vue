import { createI18n } from "vue-i18n";

// Определяем переводы
const messages = {
  en: {
    welcome: "Hi",
    lang: "En",
    logout: "Log out",
    login: "Login",
    Cancel: "Cancel",
    Save: "Save",
    Delete: "Delete",
    Add: "Add",
    loginToThePanel: "Login to the panel",
    EnterYourLogin: "Enter your login",
    EnterYourPassword: "Enter your password",
    SelectACity: "Select a city",
    CityNotSelected: "City not selected",
    AddACity: "Add a city",
    AddCity: "Add city",
    DeleteCity: "Delete city?",
    EditCity: "Edit city",
    CityName: "City name",
    EnterTheURLOfTheImage: "Enter the URL of the image",
    CityDescription: "City description",
    ThereIsAlreadyACityWithThisName: "There is already a city with this name",
    PageNotFound: "Page not found",
    Back: "Back",
  },
  ru: {
    welcome: "Привет",
    lang: "Ru",
    logout: "Выйти",
    login: "Войти",
    Cancel: "Отмена",
    Save: "Сохранить",
    Delete: "Удалить",
    Add: "Добавить",
    loginToThePanel: "Войти в панель",
    EnterYourLogin: "Введите логин",
    EnterYourPassword: "Введите пароль",
    SelectACity: "Выберите город",
    CityNotSelected: "Город не выбран",
    AddACity: "Добавьте город",
    AddCity: "Добавить город",
    DeleteCity: "Удалить город?",
    EditCity: "Редактировать город",
    CityName: "Название города",
    EnterTheURLOfTheImage: "Введите URL картинки",
    CityDescription: "Описание города",
    ThereIsAlreadyACityWithThisName: "Город с таким названием уже есть",
    PageNotFound: "Страница не найдена",
    Back: "Назад",
  },
};

// Создаем экземпляр i18n
const i18n = createI18n({
  locale: "ru", // Язык по умолчанию
  fallbackLocale: "en", // Резервный язык
  messages, // Переводы
});

export default i18n;
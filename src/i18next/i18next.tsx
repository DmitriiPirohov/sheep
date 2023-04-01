import React from "react";
import { createRoot } from 'react-dom/client';
import i18n from "i18next";
import { useTranslation, initReactI18next } from "react-i18next";

i18n
  .use(initReactI18next) // passes i18n down to react-i18next
  .init({
    resources: {
      EN: {
        translation: {
          "WelcometoReact": "Welcome to React and react-i18next",
          "pages" : 'Rules*Goods list*Add new product*Language',
          "language" : 'UA*EN',
          "nav" : 'Home*Shop*AddGoods',
          "login" : 'Login*Close*Name*Password*Exit from',
          "Rules" : 'Rules*This info for enter',
          "Delete items": 'Delete items',
          "Enter" : 'Please login to continue',
          "AdderGoods" : 'Name of good*Autor*Production year*Rating*Add'
        }
      },

      UA: {
        translation: {
          "WelcometoReact": "Ласкаво просимо у реакт",
          "pages" : 'Опис*Список товарів*Додати новий товар*Мова',
          "language" : 'UA*EN',
          "nav" : 'Home*Shop*AddGoods',
          "login" : 'Увійти*Закрити*Ім\'я*Пароль*Вийти з',
          "Rules" : 'Правила*Ця інформація для входу',
          "Delete items": 'Видалити вибране',
          "Enter" : 'Будьласка, авторизуйтейсь для продовження',
          "AdderGoods" : 'Назва товару*Автор*Рік видання*Рейтинг*Додати'
        }
      }
    },
    lng: "UA", // if you're using a language detector, do not define the lng option
    fallbackLng: "UA",

    interpolation: {
      escapeValue: false // react already safes from xss => https://www.i18next.com/translation-function/interpolation#unescape
    }
  });
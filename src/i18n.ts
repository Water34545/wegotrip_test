import i18n from "i18next";
import {initReactI18next} from "react-i18next";

const resources = {
  ru: {
    translation: {
      'loading': 'Загрузка...',
      'statCharts': {
        'chooseDates': 'Выберете диапазон сравнения',
        'with': 'c',
        'sales': 'Продажи',
        'balance': 'Баланс',
        'viewsVsClicks': 'Просмотры → Клики',
        'clicksVSSales': 'Клики → Продажи',
        'persent': '%',
        'currency': '₽',
      }
    }
  }
};

i18n.use(initReactI18next).init({
  resources,
  lng: "ru",
  interpolation: {
    escapeValue: false
  }
});

export default i18n;
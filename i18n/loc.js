import i18next from 'i18next';
import english from './english/english.js';
import hindi from './hindi/hindi.js';

export const i18nPromise = (lng) => i18next.init({
    lng: lng, // if you're using a language detector, do not define the lng option
    debug: true,
    fallbackLng: 'en',
    resources: {
        en: {
            translation: english
        },
        hi: {
            translation: hindi
        }
    }
});

const i18n = {
    t: i18next.t,
    T: function(str)  {
        return i18next.t(str).toUpperCase();
    },
    changeLanguage: function (lng, callback) {
        return i18next.changeLanguage(lng, callback);
    }
};
export default i18n;

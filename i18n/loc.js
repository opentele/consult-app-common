import i18next from 'i18next';
import english from './english/english.js';

export const i18nPromise = i18next.init({
    lng: 'en', // if you're using a language detector, do not define the lng option
    debug: true,
    fallbackLng: 'en',
    resources: {
        en: {
            translation: english
        }
    }
});

const i18n = {
    t: i18next.t,
    T: function(str)  {
        return i18next.t(str).toUpperCase();
    }
};
export default i18n;

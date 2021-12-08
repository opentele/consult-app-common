import i18next from 'i18next';
import english from './english/english';

i18next.init({
    lng: 'en', // if you're using a language detector, do not define the lng option
    debug: true,
    resources: {
        en: english
    }
});

const i18n = i18next;
export default i18n;

import i18n, {i18nPromise} from './loc';

test('should translate', () => {
    i18nPromise.then((t) => {
        expect(t('full-name')).toBe("Full name");
    });
});

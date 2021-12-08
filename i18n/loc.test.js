import i18n from './loc';

test('should translate', () => {
    expect(i18n.t('full-name')).toBe("Full name");
});

import english from './english';

test('should translate', () => {
    expect(english['full-name']).toBe("Full name");
    expect(english['conference-client-next']).not.toBeNull();
});

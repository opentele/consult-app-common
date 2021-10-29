export default class DataElementValidator {
    static emailRE = /\S+@\S+\.\S+/;
    static mobileRE = /^\d{10}$/;
    static countryCodeRE = /^\+?\d+$/;

    static regexValidator(name, value, validatorRE) {
        if (!value) return `${name} can't be empty.`;
        if (!validatorRE.test(value)) return `Ooops! We need a valid ${name}.`;
        return '';
    }

    static emailValidator(email) {
        return this.regexValidator("Email", email, this.emailRE);
    }

    static mobileValidator(mobile) {
        return this.regexValidator("Mobile", mobile, this.mobileRE);
    }

    static countryCodeValidator(countryCode) {
        return this.regexValidator("Country code", countryCode, this.countryCodeRE);
    }
}

const emailRE = /\S+@\S+\.\S+/;
const mobileRE = /^\d{10}$/;
const countryCodeRE = /^\+?\d+$/;

export default class DataElementValidator {
    static regexValidator(name, value, validatorRE) {
        if (!value) return `${name} can't be empty.`;
        if (!validatorRE.test(value)) return `Ooops! We need a valid ${name}.`;
        return '';
    }

    static emailValidator(email) {
        return this.regexValidator("Email", email, emailRE);
    }

    static mobileValidator(mobile) {
        return this.regexValidator("Mobile", mobile, mobileRE);
    }

    static countryCodeValidator(countryCode) {
        return this.regexValidator("Country code", countryCode, countryCodeRE);
    }
}

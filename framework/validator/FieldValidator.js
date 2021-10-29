export default class DataElementValidator {
    static emailRE = /\S+@\S+\.\S+/;
    static mobileRE = /^\d{10}$/;

    static emailValidator(email) {
        if (!email) return "Email can't be empty."
        if (!this.emailRE.test(email)) return 'Ooops! We need a valid email address.'
        return ''
    }

    static mobileValidator(mobile) {
        if (!mobile) return "Mobile number can't be empty.";
        if (!this.mobileRE.test(mobile)) return 'Ooops! We need a valid mobile number.';
        return '';
    }
}

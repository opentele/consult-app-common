import _ from "lodash";
import {DataElementValidator} from "react-app-common";

class UserValidator {
    static validate(user) {
        const errors = [];
        const [validUserName, userNameType] = DataElementValidator.validateEmailOrMobileWithCountryCode(user.userName);
        const passwordsValid = DataElementValidator.validatePasswords(user.password, user.confirmPassword);
        const nameValid = !_.isEmpty(user.name);

        if (passwordsValid && validUserName && nameValid) return [true, userNameType];

        if (!passwordsValid) errors["passwords"] = "password-not-matching";
        if (!validUserName) errors["userName"] = "invalid-user-name";
        if (!nameValid) errors["name"] = "name-empty";
        return [false, userNameType, errors];
    }
}

export default UserValidator;

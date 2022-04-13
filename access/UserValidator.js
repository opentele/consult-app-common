import _ from "lodash";
import {DataElementValidator} from "react-app-common";

class UserValidator {
    static validate(user) {
        const [validUserName, userNameType] = DataElementValidator.validateEmailOrMobileWithCountryCode(user.userName);
        const passwordsValid = DataElementValidator.validatePasswords(user.password, user.confirmPassword);
        const nameValid = !_.isEmpty(user.name);
        const providerTypeValid = !_.isNil(user.providerType);

        if (passwordsValid && validUserName && nameValid && providerTypeValid) return [true, userNameType, {}];

        const errors = {};
        if (!passwordsValid) errors["passwords"] = "password-not-matching";
        if (!validUserName) errors["userName"] = "invalid-user-name";
        if (!nameValid) errors["name"] = "name-empty";
        if (!providerTypeValid) errors["providerType"] = "provider-type-empty";
        return [false, userNameType, errors];
    }
}

export default UserValidator;

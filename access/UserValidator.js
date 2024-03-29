import _ from "lodash";
import {DataElementValidator} from "react-app-common";

class UserValidator {
    static validate(user, confirmPassword, validatePasswords) {
        const [validUserName, userNameType] = DataElementValidator.validateEmailOrMobileWithCountryCode(user.userName);
        const passwordsValid = validatePasswords ? DataElementValidator.validatePasswords(user.password, confirmPassword) : true;
        const nameValid = !_.isEmpty(user.name) && user.name.length <= 100;
        const providerTypeValid = !_.isNil(user.providerType);

        if (passwordsValid && validUserName && nameValid && providerTypeValid) return [true, userNameType, {}];

        const errors = {};
        if (!passwordsValid) errors["passwords"] = "password-not-matching";
        if (!validUserName) errors["userName"] = "invalid-user-name";
        if (!nameValid) errors["name"] = "name-size-invalid";
        if (!providerTypeValid) errors["providerType"] = "provider-type-empty";
        return [false, userNameType, errors];
    }
}

export default UserValidator;

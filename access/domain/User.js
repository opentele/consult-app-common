export default class User {
    providerType;
    confirmPassword;
    userName;
    name;

    constructor(data) {
        this.data = data;
    }

    static getName(user) {
        return user.data["name"];
    }

    static getUserName(user) {
        return user.data["userName"];
    }

    static updateField(user, name, value) {
        user.data[name] = value;
    }
}

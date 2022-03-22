export default class User {
    providerType;

    constructor(data) {
        this.data = data;
    }

    static getName(user) {
        return user.data["name"];
    }

    static getUserId(user) {
        return user.data["userId"];
    }

    static updateField(user, name, value) {
        user.data[name] = value;
    }
}

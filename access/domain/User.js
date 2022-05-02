import UserType from "./UserType.js";
import AbstractEntity from "./AbstractEntity.js";

export default class User extends AbstractEntity {
    userType;

    static getName(user) {
        return user.data["name"];
    }

    static getUserName(user) {
        return user.data["userName"];
    }

    static updateField(user, name, value) {
        user.data[name] = value;
    }

    static fromResource(resource) {
        return AbstractEntity.fromResource(resource, new User());
    }

    canManageUsers() {
        return this.userType === UserType.OrgAdmin;
    }

    static newUser() {
        return new User();
    }
}

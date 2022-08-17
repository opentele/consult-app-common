import UserType from "./UserType.js";
import AbstractEntity from "./AbstractEntity.js";

export default class User extends AbstractEntity {
    name;
    userType;
    providerType;
    userName;
    identification;
    qualification;
    password;
    language;

    static fromResource(resource) {
        const user = AbstractEntity.fromOther(resource, new User());
        this.copyFields(user, resource);
        user.userName = _.isEmpty(resource.email) ? resource.mobile : resource.email;
        return user;
    }

    static copyFields(to, other) {
        AbstractEntity.fromOther(other, to);
        return AbstractEntity.copyFields(other, to, ["name", "userType", "providerType", "identification", "qualification", "password", "language"]);
    }

    static fromResources(resources) {
        return resources.map((x) => User.fromResource(x, new User()));
    }

    canManageUsers() {
        return this.userType === UserType.OrgAdmin;
    }

    getUserName() {
        return this.userName;
    }

    static newUser() {
        return new User();
    }

    static clone(other) {
        const user = User.copyFields(new User(), other);
        AbstractEntity.fromOther(other, user);
        user.userName = other.userName;
        return user;
    }

    clone() {
        return User.clone(this);
    }

    get displayForClient() {
        return `${this.name} - ${this.identification} [${this.qualification}]`;
    }
}

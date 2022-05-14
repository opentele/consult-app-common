import UserType from "./UserType.js";
import AbstractEntity from "./AbstractEntity.js";

export default class User extends AbstractEntity {
    name;
    userType;
    providerType;
    userName;
    identification;
    qualification;

    static fromResource(resource) {
        const user = AbstractEntity.fromResource(resource, new User());
        this.copyFields(user, resource);
        user.userName = _.isEmpty(resource.email) ? resource.mobile : resource.email;
        return user;
    }

    static copyFields(user, other) {
        user.name = other.name;
        user.userType = other.userType;
        user.providerType = other.providerType;
        user.identification = other.identification;
        user.qualification = other.qualification;
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
        const user = AbstractEntity.fromResource(other, new User());
        this.copyFields(user, other);
        user.userName = other.userName;
        return user;
    }

    clone() {
        return User.clone(this);
    }
}

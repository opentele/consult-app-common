import User from "../domain/User";
import {RC} from "react-app-common";

export default class UserService {
    static getUser() {
        let item = localStorage.getItem('user');
        if (item === null || item === '') return null;
        let data = JSON.parse(item);
        return new User(data);
    }

    static setUser(userJson) {
        localStorage.setItem('user', JSON.stringify(userJson));
    }

    static removeUser() {
        localStorage.removeItem('user');
    }

    static registerOrg(name, orgName, email, mobile, password, authMode, cb, errorHandler) {
        let org = {name: name, organisationName: orgName, email: email, password: password, mobile: mobile, authMode: authMode};
        return RC.put(`api/app/organisation`, org, cb, errorHandler);
    }

    static registerUser(name, email, mobile, authMode, organisationId, cb, errorHandler) {
        let user = {name: name, organisationId: organisationId, email: email, mobile: mobile, authMode: authMode};
        return RC.put(`api/app/user`, user, cb, errorHandler);
    }
}

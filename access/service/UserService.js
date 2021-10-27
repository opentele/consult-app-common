import User from "../domain/User";
import {put} from "../../framework/api-client/requests";

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

    static registerOrg(org, cb, errorHandler) {
        return put(`/api/app/organisation`, org, cb, errorHandler);
    }
}

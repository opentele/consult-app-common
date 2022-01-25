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

    static registerOrg(name, orgName, userId, userIdType, password, cb, errorHandler) {
        let requestBody = {name: name, organisationName: orgName, password: password};
        if (userIdType === "email") requestBody.email = userId
        else requestBody.mobile = userId;
        return RC.put(`api/app/organisation`, requestBody, cb, errorHandler);
    }

    static registerUser(name, email, mobile, authMode, organisationId, cb, errorHandler) {
        let user = {name: name, organisationId: organisationId, email: email, mobile: mobile, authMode: authMode};
        return RC.put(`api/app/user`, user, cb, errorHandler);
    }

    static login(userId, password, cb, errorHandler) {
        let postObject = {email: userId, password: password};
        let encodedObj = _.keys(postObject).map((key) => `${encodeURIComponent(key)}=${encodeURIComponent(postObject[key])}`);
        let formBody = encodedObj.join("&");
        return RC.post("api/login", formBody, cb, errorHandler, "xWwwForm");
    }
}

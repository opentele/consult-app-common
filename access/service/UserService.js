import {HeaderTypes, RC} from "react-app-common";

export default class UserService {
    static getUser() {
        return RC.get("api/user/current");
    }

    static registerOrg(name, orgName, userName, userNameType, password) {
        let requestBody = {name: name, organisationName: orgName, password: password};
        if (userNameType === "email") requestBody.email = userName;
        else requestBody.mobile = userName;
        return RC.put(`api/organisation`, requestBody);
    }

    static registerUser(name, userName, userNameType, password, providerType) {
        let requestBody = {name: name, password: password, providerType: providerType};
        if (userNameType === "email") requestBody.email = userName;
        else requestBody.mobile = userName;
        return RC.put(`api/organisation/user`, requestBody);
    }

    static login(userName, password, userNameType) {
        let postObject = {email: userName, password: password};
        let encodedObj = _.keys(postObject).map((key) => `${encodeURIComponent(key)}=${encodeURIComponent(postObject[key])}`);
        let formBody = encodedObj.join("&");
        return RC.post("api/login", formBody, HeaderTypes.xWwwForm);
    }

    static isLoggedIn() {
        return RC.get("api/user/loggedIn");
    }

    static logout() {
        return RC.get("api/logout");
    }

    static addUser(userName) {
        return RC.post(`api/organisation/addUser?userName=${userName}`);
    }

    static search(q) {
        return RC.get(`api/user/search?q=${q}`);
    }

    static getUsers(providerType) {
        return _.isEmpty(providerType) ? RC.get(`api/organisation/user`) : RC.get(`api/organisation/user?providerType=${providerType}`);
    }

    static loadUser(userId) {
        return RC.get(`api/organisation/user/${userId}`);
    }
}

import {DataElementValidator, HeaderTypes, RC} from "react-app-common";

export default class UserService {
    static getUser() {
        return RC.get("api/organisationUser/current");
    }

    static registerOrg(name, orgName, userName, userNameType, password) {
        let requestBody = {name: name, organisationName: orgName, password: password};
        this._setUserName(userNameType, requestBody, userName);
        return RC.put(`api/organisation`, requestBody);
    }

    static _setUserName(userNameType, requestBody, userName) {
        if (userNameType === "Email") requestBody.email = userName;
        else requestBody.mobile = userName;
    }

    static registerUser(user, userNameType) {
        let requestBody = {...user};
        this._setUserName(userNameType, requestBody, user.userName);
        return RC.put(`api/organisationUser`, requestBody);
    }

    static updateProfile(user) {
        const [,userNameType] = DataElementValidator.validateEmailOrMobileWithCountryCode(user.userName);
        let requestBody = {...user};
        this._setUserName(userNameType, requestBody, user.userName);
        return RC.post(`api/organisationUser/current`, requestBody);
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

    static addUser(user) {
        let requestBody = {...user};
        return RC.put(`api/organisationUser`, requestBody);
    }

    static updateUser(user) {
        let requestBody = {...user};
        return RC.post(`api/organisationUser`, requestBody);
    }

    static search(q) {
        return RC.get(`api/user/search?q=${q}`);
    }

    static getUsers(providerType) {
        return _.isEmpty(providerType) ? RC.get(`api/organisationUser`) : RC.get(`api/organisationUser?providerType=${providerType}`);
    }

    static loadUser(userId) {
        return RC.get(`api/organisationUser/${userId}`);
    }

    static findUser(userName) {
        return RC.get(`api/organisationUser?userName=${userName}`);
    }

    static registerOrgForOwner(orgName) {
        return RC.put(`api/user/organisation`, orgName);
    }
}

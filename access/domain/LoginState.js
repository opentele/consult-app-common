import _ from "lodash";

class LoginState {
    constructor() {
        this.passwordMode = true;
        this.otpMode = false;
        this.otpTries = 0;
        this.loginFailed = false;
    }

    otpRequested() {
        this.otpTries++;
        this.otpMode = true;
        this.passwordMode = false;
    }

    passwordModeChosen() {
        this.otpMode = false;
        this.otpTries = 0;
        this.passwordMode = true;
    }

    static clone(other) {
        let loginState = new LoginState();
        loginState.passwordMode = other.passwordMode;
        loginState.otpMode = other.otpMode;
        loginState.otpTries = other.otpTries;
        loginState.loginFailed = other.loginFailed;
        return loginState;
    }
}

export default LoginState;

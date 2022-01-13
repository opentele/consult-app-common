import _ from "lodash";

class LoginState {
    constructor() {
        this.passwordMode = true;
        this.otpMode = false;
        this.otpTries = 0;
        this.loginFailed = false;
        this.passwordOrOTP = "";
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

    passwordOrOTPChanged(passwordOrOtp) {
        this.passwordOrOTP = passwordOrOtp;
    }

    canShowOtpSentMessage() {
        return this.otpTries === 0 && this.otpMode;
    }

    canRequestOtpOrSwitchPassword() {
        return this.canRequestOtp() || this.canSwitchToPassword();
    }

    canRequestOtp() {
        return this.passwordMode;
    }

    canSwitchToPassword() {
        return this.otpMode;
    }

    passwordOrOTPProvided() {
        return !_.isEmpty(this.passwordOrOTP);
    }

    static clone(other) {
        let loginState = new LoginState();
        loginState.passwordMode = other.passwordMode;
        loginState.otpMode = other.otpMode;
        loginState.otpTries = other.otpTries;
        loginState.loginFailed = other.loginFailed;
        loginState.passwordOrOTP = other.passwordOrOTP;
        return loginState;
    }
}

export default LoginState;

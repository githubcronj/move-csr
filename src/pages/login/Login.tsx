import React from "react";
import TextField from "@material-ui/core/TextField";
import "./login.scss";
import { connect } from "react-redux";
import * as Action from "../../store/login/actions";
import { bindActionCreators } from "redux";
import Button from "../../components/atoms/Button";
import history from "../../routes/History";
import { transitions, positions, Provider as AlertProvider } from "react-alert";

type initialProps = {
  history: any;
  loginAction: any;
  loginState: any;
};

type initialState = {
  username: string;
  password: string;
  isButtonDisabled: Boolean;
  helperText: string;
  isError: Boolean;
  usernameErr: string;
  passwordErr: string;
  keepMeSignedIn: boolean;
  email: string;
  emailError: string;
  forgotPasswordPage: boolean;
  resetedPassword: boolean;
};

class Login extends React.Component<initialProps, initialState> {
  state: initialState = {
    username: "",
    password: "",
    isButtonDisabled: false,
    helperText: "",
    usernameErr: "",
    passwordErr: "",
    isError: false,
    keepMeSignedIn: false,
    email: "",
    emailError: "",
    forgotPasswordPage: false,
    resetedPassword: false,
  };

  componentDidMount() {
    window.scrollTo(0, 0);
    const token = localStorage.getItem("newToken");
    if (token) {
      this.props.history.push("/dashboard");
    }
  }

  handleUsernameChange = (e: any) => {
    this.setState({
      username: e.target.value,
    });
  };

  handleEmailChange = (e: any) => {
    this.setState({
      email: e.target.value,
    });
  };

  // handleKeyPress = (event: React.KeyboardEvent) => {
  //     if (event.keyCode === 13 || event.which === 13) {
  //         this.state.isButtonDisabled || this.handleLogin();
  //     }
  // };

  handlePasswordChange = (e: any) => {
    this.setState({
      password: e.target.value,
    });
  };

  validateFields = () => {
    let validate = true;
    // if (this.state.username === '' || !/^[a-zA-Z0-9]+$/.test(this.state.username)) {
    //     validate = false;
    //     this.setState({
    //         usernameErr: 'Please enter valid username',
    //     });
    // } else {
    //     this.setState({
    //         usernameErr: '',
    //     });
    // }

    if (this.state.password === "") {
      validate = false;
      this.setState({
        passwordErr: "Please enter password",
      });
    } else {
      this.setState({
        passwordErr: "",
      });
    }

    return validate;
  };

  handleLogin = async () => {
    const payload: any = {
      password: this.state.password,
      site_name: "MoveEasy",
      email: this.state.email,
    };

    this.props.loginAction.login(payload);
  };

  handleCheckboxChange = (type: any) => {
    if (type === "keepMeSignedIn") {
      this.setState({
        keepMeSignedIn: !this.state.keepMeSignedIn,
      });
    }
  };

  public static getDerivedStateFromProps(
    nextProps: initialProps,
    currentState: initialState
  ) {
    if (nextProps && nextProps.loginState && nextProps.loginState.isLoggedIn) {
      nextProps.loginState.isLoggedIn = false;

      nextProps.history.push({
        pathname: "/dashboard",
      });
      //  window.location.reload()
    }

    return currentState;
  }

  resetHandler = () => {};

  render() {
    const options = {
      // you can also just use 'bottom center'
      position: positions.BOTTOM_CENTER,
      timeout: 5000,
      offset: "30px",
      // you can also just use 'scale'
      transition: transitions.SCALE,
    };

    const { email, password, emailError, passwordErr } = this.state;
    return (
      <div className="container">
        <div className="login-getStartedDiv">
          <div className="loginContainer">
            <div className="loginContent">
              <div>
                <div className="loginWelcomeText">Welcome Back</div>
                <div
                  className="loginLine"
                  style={{
                    backgroundColor: "#273e59",
                  }}
                ></div>
                <div className="loginSignInText">
                  Sign in to continue to your account.
                </div>
              </div>

              <div className="login-form-main-div">
                <div>
                  <div className="Login-inputDiv">
                    <TextField
                      className="loginInput"
                      error={Boolean(emailError)}
                      label="Email"
                      type="email"
                      placeholder="Email"
                      id="outlined-start-adornment"
                      variant="filled"
                      value={email}
                      onChange={(e) => this.handleEmailChange(e)}
                      // onKeyPress={this.handleKeyPress}
                    />
                    {emailError !== "" ? (
                      <div className="errorSignup">
                        <small>{emailError}</small>
                      </div>
                    ) : null}
                  </div>
                  <div className="Login-inputDiv">
                    <TextField
                      className="loginInput"
                      error={Boolean(passwordErr)}
                      type="password"
                      label="Password"
                      id="outlined-start-adornment"
                      variant="filled"
                      onChange={(e) => this.handlePasswordChange(e)}
                      // onKeyPress={this.handleKeyPress}
                      value={password}
                    />
                    {passwordErr !== "" ? (
                      <div className="errorLogin">
                        <small>{passwordErr}</small>
                      </div>
                    ) : null}
                  </div>

                  <Button
                    className="signInButton"
                    onClick={this.handleLogin}
                    backgroundColor={"#273e59"}
                    disabled={
                      this.state.email && this.state.password ? false : true
                    }
                  >
                    Sign in
                  </Button>
                  <div className="loginForgotPassword">Forgot password?</div>

                  <div className="signUpDiv">
                    Not a member yet?{" "}
                    <span className="signUpText">Sign Up</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="loginMobileImgBottom">
          {/* <img src={mobileLogin} alt="" width="100%" /> */}
        </div>
      </div>
    );
  }
}
function mapDispatchToProps(dispatch: any) {
  return {
    loginAction: bindActionCreators(Action, dispatch),
  };
}

const mapStateToProps = (state: any) => ({
  loginState: state.login,
});

export default connect(mapStateToProps, mapDispatchToProps)(Login);

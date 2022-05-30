import React, { useEffect } from "react";
import { useHistory } from "react-router-dom";
import { connect } from "react-redux";

import { fetchUserByUsername } from "../../redux/actions/oneUserActions";
import { setCurrentUser } from "../../redux/actions/authActions";
import Form from "../../components/Form";
import { formInputsSignIn } from "../../common/utils/helpers/formInputs";

const TEXT_ERROR_SIGNIN = "Неверный логин или пароль";

const SignIn = ({ setUser, getUserByUsername }) => {
  const history = useHistory();

  const submitHandler = (formIsValid, formStateInputs, setValidData) => {
    if (!formIsValid) {
      return;
    }

    let userIsValid = false;
    getUserByUsername(formStateInputs.login.value).then((res) => {
      if (
        res.payload?.login &&
        res.payload?.password === formStateInputs.password.value
      ) {
        userIsValid = true;
      }

      if (userIsValid) {
        setUser(res.payload);
        setValidData(true);
        history.replace("/Home");
      } else {
        setValidData(false);
      }
    });
  };

  return (
    <Form
      formInputs={formInputsSignIn}
      onSubmit={submitHandler}
      textError={TEXT_ERROR_SIGNIN}
      labelButton="Войти"
    />
  );
};

const mapStateToProps = (state) => ({
  user: state.user.data,
});

const mapDispatchToProps = {
  getUserByUsername: fetchUserByUsername,
  setUser: setCurrentUser,
};

export default connect(mapStateToProps, mapDispatchToProps)(SignIn);

import React, { useEffect } from "react";
import { useHistory } from "react-router-dom";
import { connect } from "react-redux";

import { createUser } from "../../redux/actions/usersActions";
import { fetchUserByUsername } from "../../redux/actions/oneUserActions";
import Form from "../../components/Form";
import { formInputsSignUp } from "../../common/utils/helpers/formInputs";

const ROLE = "user";
const TEXT_ERROR_SIGNUP = "Данный логин уже занят";

const SignUp = ({ user, getUserByUsername, addUser }) => {
  const history = useHistory();

  const submitHandler = (formIsValid, formStateInputs, setValidData) => {
    if (!formIsValid) {
      return;
    }

    let userIsValid = true;
    getUserByUsername(formStateInputs.login.value)
    .then(res => {
      console.log(res);
      if (res.payload?.login) {
        userIsValid = false;
      }

      if (userIsValid) {
        const user = {
          login: formStateInputs.login.value,
          password: formStateInputs.password.value,
          fullname: formStateInputs.fullname.value,
          birth_date: formStateInputs.birth_date.value,
          city: formStateInputs.city.value,
          role: ROLE,
        };
        addUser(user);
        setValidData(true);
        history.replace("/SignIn");
      } else {
        setValidData(false);
      }
    });
  };

  return (
    <Form
      formInputs={formInputsSignUp}
      onSubmit={submitHandler}
      textError={TEXT_ERROR_SIGNUP}
      labelButton="Зарегистрироваться"
    />
  );
};

const mapStateToProps = (state) => ({
  user: state.user.data
});

const mapDispatchToProps = {
  addUser: createUser,
  getUserByUsername: fetchUserByUsername
};

export default connect(mapStateToProps, mapDispatchToProps)(SignUp);

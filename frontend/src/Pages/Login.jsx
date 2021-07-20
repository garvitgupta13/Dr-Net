import React, { useState } from "react";
import { SimpleToast } from "../components/UI/Toast";
import Container from "@material-ui/core/Container";
import Joi from "joi-browser";
import { makeStyles } from "@material-ui/core";
import axios from "axios";

const drawerWidth = 220;

const useStyle = makeStyles({
  container: {
    marginTop: "80px",
    width: `calc(100% - ${drawerWidth}px)`,
    marginLeft: drawerWidth,
    ["@media (max-width:660px)"]: {
      width: "100%",
      height: "100%",
      marginLeft: "0px"
    }
  }
});

export function Login(props) {
  const classes = useStyle();
  const schema = { email: "", password: "" };
  const [credential, setCredential] = useState(schema);
  const [errorObj, setErrorObj] = useState({});
  const [openSuccess, setOpenSuccessToast] = useState(false);
  const [openError, setOpenErrorToast] = useState(false);
  const [toastMessage, setToastMessage] = useState("");

  const validationSchema = {
    email: Joi.string().email().required(),
    password: Joi.string().min(6).required()
  };

  const isFormValid = () => {
    //Validate form data using joi submission
    const check = Joi.validate(credential, validationSchema, {
      abortEarly: false
    });
    if (!check.error) return true;
    const errors = {};
    check.error.details.map((item) => {
      if (!errors[item.path[0]]) errors[item.path[0]] = item.message;
      return 0;
    });
    setErrorObj(errors);
    return false;
  };

  const validateField = (input) => {
    const { name, value } = input;
    const obj = { [name]: value };
    const obj_schema = { [name]: validationSchema[name] };
    const result = Joi.validate(obj, obj_schema);

    return result.error ? result.error.details[0].message : null;
  };

  const handleChange = (e) => {
    //Validate input data
    const { currentTarget: input } = e;
    const errors = { ...errorObj };
    const errorMessage = validateField(input);
    if (errorMessage) errors[input.name] = errorMessage;
    else delete errors[input.name];
    //If data is correct then set it
    setCredential({ ...credential, [e.target.name]: e.target.value });
    setErrorObj(errors);
  };

  //Close the toast
  const handleCloseToast = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setToastMessage("");
    setOpenErrorToast(false);
    setOpenSuccessToast(false);
  };

  async function loginUser(e) {
    e.preventDefault();
    if (isFormValid()) {
      try {
        const header = {
          "Content-Type": "application/json",
          Accept: "application/json",
          "X-Requested-With": "XMLHttpRequest"
        };

        const { data: response } = await axios.post(
          `${process.env.REACT_APP_API_ENDPOINT}/users/${props.role}/signin`,
          credential,
          header
        );
        //Set the token in localstorage and redirect to homepage
        if (response.status === 200) {
          localStorage.setItem("token", response.token);
          setToastMessage(response.message);
          setOpenSuccessToast(true);
          window.location = "/AllDoctors";
        }
        //In case of any error throw error toast
        else {
          setToastMessage(response.message);
          setOpenErrorToast(true);
        }
      } catch (err) {
        //Handling rejected promise for backend error
        setToastMessage("SERVER ERROR: Please try again after some time");
        setOpenErrorToast(true);
      }
    }
  }

  return (
    <Container className={classes.container}>
      <form onSubmit={loginUser}>
        <div>
          <input
            type="text"
            name="email"
            placeholder="email"
            onChange={handleChange}
          />
          <div>
            {errorObj["email"] ? (
              <div>* {errorObj["email"]}</div>
            ) : (
              <div>&nbsp; &nbsp;</div>
            )}
          </div>
        </div>
        <div>
          <input
            type="password"
            name="password"
            placeholder="password"
            onChange={handleChange}
          />
          <div>
            {errorObj["password"] ? (
              <div>* {errorObj["password"]}</div>
            ) : (
              <div>&nbsp; &nbsp;</div>
            )}
          </div>
        </div>
        <button type="submit">Signin</button>
      </form>
      <SimpleToast
        open={openSuccess}
        message="Password Changed Successfully"
        handleCloseToast={handleCloseToast}
        severity="success"
      />
      <SimpleToast
        open={openError}
        message={toastMessage}
        handleCloseToast={handleCloseToast}
        severity="error"
      />
    </Container>
  );
}

export default Login;

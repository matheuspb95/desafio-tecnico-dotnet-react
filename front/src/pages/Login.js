import React, { useState, useRef, useCallback } from "react";
import { Box, Text } from "grommet";
import { MailOption, Lock } from "grommet-icons";
import { useNavigate } from "react-router-dom";
import api from "../api";
import FormCard from "../components/FormCard";
import AlertModal from "../components/AlertModal";

const fields = [
  {
    name: "email",
    messageError: "Email not valid",
    placeholder: "Email",
    regex: /^\w+([\\.-]?\w+)*@\w+([\\.-]?\w+)*(\.\w{2,3})+$/g,
    icon: MailOption,
  },
  {
    name: "password",
    messageError: "Password not valid",
    placeholder: "Password",
    type: "password",
    tip: "The password must contain at least 1 lowercase alphabetical character, 1 uppercase alphabetical character, 1 numeric character, at least one special character ([!@#$%^&*.]).",
    regex: /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&.*])(?=.{8,})/g,
    icon: Lock,
  },
];


const Login = () => {
  const history = useNavigate();
  const refRemenber = useRef();
  const [errors, setErrors] = useState([]);
  const [success, setSuccess] = useState(false);

  const signIn = useCallback(
    async (credentials) => {
      const bodyFormData = new FormData();
      bodyFormData.append("email", credentials.email);
      bodyFormData.append("password", credentials.password);
      try {
        const { data } = await api.post("/api/auth/login", bodyFormData, {
          headers: { "Content-Type": "application/json" },
        });
        const { value: token } = data;
        const { email } = credentials;
        const user = {
          email,
        };
        if (token) {
          setSuccess(true)
          setTimeout(() => {
            history("/home");
            localStorage.setItem("token", token);
            localStorage.setItem("user", JSON.stringify(user));
          }, 500);
        }
      } catch (e) {
        setErrors(["User not found"]);
      }
    },
    [history]
  );

  const submit = async ({ value }) => {
    fields.forEach((field) => {
      if (!field.regex.test(value[field.name])) {
        errors.push(field.messageError);
      }
    });

    setErrors([...errors]);
    if (errors.length === 0) {
      try {
        signIn(value);
      } catch (e) {
        errors.push("Network Error", e);
      }
    }
  };

  return (
    <Box
      align="center"
      justify="center"
      background="#e9ecef"
      fill
      direction="row"
    >
      <FormCard
        onSubmit={submit}
        confirmLabel="Sign In"
        subTitle="Sign in to start your session"
        fields={fields}
        checkboxes={[]}
        links={[
          {
            label: "Register a new membership",
            click: () => history("/register"),
          },
        ]}
      />
      <AlertModal
        errors={errors}
        setErrors={setErrors}
        success={success}
        sucessText="LOADING PAGE"
      />
    </Box>
  );
};

export default Login;
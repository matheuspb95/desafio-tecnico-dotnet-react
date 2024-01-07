import React, { useState, useRef } from "react";
import { Box, Text, Button, Heading, Layer } from "grommet";
import { useNavigate } from "react-router-dom";
import { User, MailOption, Lock } from "grommet-icons";
import api from "../api";
import FormCard from "../components/FormCard";
import Link from "../components/Link";

const fields = [
  {
    name: "name",
    messageError: "Name not valid",
    placeholder: "First Name",
    regex: /([a-zA-Z]+\s*)+/g,
    icon: User,
  },{
    name: "surname",
    messageError: "Name not valid",
    placeholder: "Last Name",
    regex: /([a-zA-Z]+\s*)+/g,
    icon: User,
  },
  {
    name: "email",
    messageError: "Email not valid",
    placeholder: "Email",
    regex: /^\w+([\\.-]?\w+)*@\w+([\\.-]?\w+)*(\.\w+)+$/g,
    icon: MailOption,
  },
  {
    name: "password",
    messageError: "Password not valid",
    placeholder: "Password",
    type: "password",
    tip: "The password must contain at least 1 lowercase alphabetical character, 1 uppercase alphabetical character, 1 numeric character, at least one special character ([!@#$%*()_+=-.,:;|]).",
    regex: /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%*()_+=-.,:;|])(?=.{8,})/g,
    icon: Lock,
  },
  {
    name: "confirm-password",
    messageError: "Password not valid",
    placeholder: "Confirm Password",
    type: "password",
    regex: /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%*()_+=-.,:;|])(?=.{8,})/g,
    icon: Lock,
  },
];

const Register = () => {
  const history = useNavigate();
  const goLogin = () => {
    history("/login");
  };
  const refAgree = useRef();

  const [errors, setErrors] = useState([]);
  const [success, setSuccess] = useState(false);

  const submit = async ({ value }) => {
    fields.forEach((field) => {
      console.log(field.name);
      console.log(value[field.name]);
      if (!field.regex.test(value[field.name])) {
        errors.push(field.messageError);
      }
    });
    if (value["password"] !== value["confirm-password"]) {
      errors.push("Passwords doesnt match");
    }
    value["accesType"] = refAgree.current.checked ? 0 : 1;
    setErrors([...errors]);
    if (errors.length === 0) {
      try {
        await api.post("/api/user", value);
        setSuccess(true);
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
        confirmLabel="Register"
        subTitle="Register a new membership"
        fields={fields}
        checkboxes={[
            {
              ref: refAgree,
              child: (
                <Text size="20" weight="bold">
                  Is Admin
                </Text>
              ),
            },
          ]}
        links={[
          {
            label: "I already have a membership",
            click: goLogin,
          },
        ]}
      />
      {errors.length > 0 && (
        <Layer onEsc={() => setErrors([])} onClickOutside={() => setErrors([])}>
          <Box pad="medium">
            <Heading color="status-error">ERRORS</Heading>
            {errors.map((error) => {
              return <Text>{error}</Text>;
            })}
            <Button label="close" onClick={() => setErrors([])} />
          </Box>
        </Layer>
      )}
      {success && (
        <Layer onEsc={goLogin} onClickOutside={goLogin}>
          <Box pad="medium">
            <Heading color="status-ok">SUCCESS</Heading>
            <Text>Do login to continue</Text>
            <Button label="close" onClick={goLogin} />
          </Box>
        </Layer>
      )}
    </Box>
  );
};

export default Register;
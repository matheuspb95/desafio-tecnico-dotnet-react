import React from "react";
import {
  Box,
  Card,
  CardHeader,
  CardBody,
  Text,
  CheckBox,
  Form,
  Heading,
} from "grommet";

import InputField from "../components/InputField";
import ConfirmButton from "../components/ConfirmButton";
import Link from "../components/Link";

const FormCard = (props) => {
  return (
    <Card width="360px" round="xsmall" background="light-1">
      <CardHeader
        height="80px"
        border={[
          {
            color: "blue",
            size: "3px",
            style: "solid",
            side: "top",
          },
          {
            color: "light-4",
            size: "xsmall",
            style: "solid",
            side: "bottom",
          },
        ]}
        pad={{ horizontal: "medium", vertical: "xxxsmall" }}
        justify="center"
      >
        <Heading level="2">
          React
          <Text weight="normal" size="36px">
            APP
          </Text>
        </Heading>
      </CardHeader>
      <CardBody gap="medium" align="center" pad="medium">
        <Text size="16px">{props.subTitle}</Text>
        <Form
          onSubmit={props.onSubmit}
          style={{ width: "-webkit-fill-available" }}
        >
          {props.fields.map((f) => {
            return (
              <InputField
                style={{ minWidth: "100%" }}
                key={f.name}
                id={f.name}
                {...f}
              />
            );
          })}
          <Box justify="between" direction="row" align="center">
            {props.checkboxes.map((checkbox, i) => {
              return (
                <Box key={i} align="center" gap="xsmall" direction="row">
                  <CheckBox ref={checkbox.ref} />
                  {checkbox.child}
                </Box>
              );
            })}
            <ConfirmButton color="#007bff" label={props.confirmLabel} />
          </Box>
        </Form>
        {props.links.map((link, i) => {
          return (
            <Link key={`link-${i}`} click={link.click} label={link.label} />
          );
        })}
      </CardBody>
    </Card>
  );
};

export default FormCard;
import React from "react";
import { Box, Text, TextInput, FormField, Tip, TextArea } from "grommet";

const InputField = (props) => {
  const icon = (
    <>
      {props.icon && (
        <div
          style={{
            position: "absolute",
            width: "inherit",
            display: "flex",
            justify: "center",
            top: "50%",
            transform: "translateY(-50%)",
            pointerEvents: "none",
            right: "-6px",
            borderRadius: "0px 3px 3px 0px",
            borderLeft: "1px solid grey",
            backgroundColor: "#e9ecef",
            padding: "6px",
          }}
        >
          {<props.icon size="18px" color="dark-1" />}
        </div>
      )}
    </>
  );

  if (props.tip) {
    return (
      <Tip
        dropProps={{
          align: { top: "top", left: "right" },
          width: "80px",
          margin: { left: "20px" },
        }}
        content={props.tip}
      >
        <FormField
          contentProps={{ border: false }}
          component={() => (
            <TextInput
              {...props}
              value={props.value}
              label={props.label}
              type={props.type}
              name={props.name}
              id={props.name}
              icon={icon}
              reverse={true}
              size="small"
              placeholder={props.placeholder}
            />
          )}
          value={props.value}
          id={props.name}
          htmlFor={props.name}
          {...props}
          label=""
        />
      </Tip>
    );
  }
  return (
    <Box direction={props.labelDirection || "row"}>
      {props.label && (
        <Text
          margin={{ vertical: "xsmall" }}
          size="14px"
          color="dark-1"
          weight="bold"
          style={{ width: "200px" }}
        >
          {props.label}
        </Text>
      )}
      <FormField
        style={{ width: "-webkit-fill-available" }}
        contentProps={{ border: false }}
        component={() => {
          if (props.textArea)
            return (
              <TextArea
                {...props}
                type={props.type}
                name={props.name}
                id={props.name}
                icon={icon}
                reverse={true}
                placeholder={props.placeholder}
                disabled={props.disabled}
              />
            );
          return (
            <TextInput
              {...props}
              value={props.value}
              label={props.label}
              type={props.type}
              name={props.name}
              id={props.name}
              icon={icon}
              reverse={true}
              size="small"
              placeholder={props.placeholder}
            />
          );
        }}
        id={props.name}
        htmlFor={props.name}
        {...props}
        label=""
      />
    </Box>
  );
};

export default InputField;
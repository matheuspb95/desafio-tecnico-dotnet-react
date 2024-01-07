import { Box, Text, Button, Heading, Layer } from "grommet";

const AlertModal = (props) => {
  const { errors, setErrors, success, sucessText } = props;
  return (
    <>
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
        <Layer>
          <Box pad="medium">
            <Heading color="status-ok">SUCCESS</Heading>
            <Text>{sucessText}</Text>
          </Box>
        </Layer>
      )}
    </>
  );
};

export default AlertModal;
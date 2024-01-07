import { Button } from "grommet";

const Link = (props) => {
  return <Button onClick={props.click} alignSelf="start" color="#007bff" label={props.label} plain />;
};

export default Link;
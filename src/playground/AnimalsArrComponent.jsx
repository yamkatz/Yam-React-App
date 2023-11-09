import { Container } from "@mui/material";
import nextKey from "generate-my-key";
import { Typography } from "@mui/material";

let animals = [];

const App = () => {
  if (!animals.length) {
    return (
      <Container>
        <Typography variant="h4"> all animals adoupted successfully</Typography>
      </Container>
    );
  }
  return (
    <Container>
      {animals.map((animal) => (
        <Typography key={nextKey()} variant="body1">
          {animal}
        </Typography>
      ))}
    </Container>
  );
};

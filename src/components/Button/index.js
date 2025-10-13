import { Text } from "../Text";

import { Container } from "./styles";

export default function Button({ children }) {
  return (
    <Container>
      <Text>{children}</Text>
    </Container>
  );
}
import { Text } from "../Text";

import { Container } from "./styles";

export default function Button({ children, onPress, primary = true }) {
  return (
    <Container primary={primary} onPress={onPress}>
      <Text color={primary ? '#fff' : '#333'}>{children}</Text>
    </Container>
  );
}
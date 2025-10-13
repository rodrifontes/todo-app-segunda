import { Text } from '../Text';

import { Add, Container } from './styles';

export default function AddTaskButton({ onPress }) {
  return (
    <Container onPress={onPress}>
      <Add>
        <Text size={40} color="#FFF">+</Text>
      </Add>
    </Container>
  );
}
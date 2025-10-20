import CustomModal from "../CustomModal";

import { Text } from "../Text";

import Button from "../Button";

import { Actions } from './styles';

export default function DeleteConfirmModal({ visible, onClose, onConfirm }) {
  return (
    <CustomModal
      visible={visible}
      onClose={onClose}
    >
      <Text weight="600" size={18}>
        Tem certeza que deseja remover a tarefa?
      </Text>

      <Text opacity={0.5} style={{ marginTop: 4 }}>
        Tem certeza que deseja remover a tarefa?
      </Text>

      <Actions>
        <Button primary={false} onPress={onClose}>Cancelar</Button>
        <Button onPress={onConfirm}>Confirmar</Button>
      </Actions>
    </CustomModal>
  );
}
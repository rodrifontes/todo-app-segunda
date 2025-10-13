import CustomModal from "../CustomModal";

import Button from "../Button";
import { Text } from "../Text";

export default function DeleteConfirmModal() {
  return (
    <CustomModal>
      <Text weight="600" size={18}>
        Tem certeza que deseja remover a tarefa?
      </Text>

      <Text opacity={0.5} style={{ marginTop: 4 }}>
        Tem certeza que deseja remover a tarefa?
      </Text>

      <Button>Confirmar</Button>
    </CustomModal>
  );
}
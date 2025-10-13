import { Modal } from 'react-native';


import { ModalBody, Overlay } from './styles';

export default function CustomModal({ children }) {
  return (
    <Modal
      statusBarTranslucent
    >
      <Overlay>
        <ModalBody>
          {children}
        </ModalBody>
      </Overlay>
    </Modal>
  );
}
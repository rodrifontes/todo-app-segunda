import { Modal } from 'react-native';


import { ModalBody, Overlay } from './styles';

export default function CustomModal({ children, visible, onClose }) {
  return (
    <Modal
      statusBarTranslucent
      visible={visible}
      onRequestClose={onClose}
      transparent
      animationType='fade'
    >
      <Overlay behavior='padding'>
        <ModalBody>
          {children}
        </ModalBody>
      </Overlay>
    </Modal>
  );
}
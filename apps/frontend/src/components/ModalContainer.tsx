import React from "react";
import {
  Button,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
} from "@chakra-ui/react";

type CustomModalProps = {
  title: string;
  onConfirm: () => void;
  confirmLabel?: string;
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode; // Accept any JSX content here
};

const CustomModal: React.FC<CustomModalProps> = ({
  title,
  onConfirm,
  confirmLabel = "Confirm",
  isOpen,
  onClose,
  children,
}) => {
  return (
    <Modal isOpen={isOpen} onClose={onClose} isCentered>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>{title}</ModalHeader>
        <ModalCloseButton />
        <ModalBody>{children}</ModalBody> {/* render children here */}

        <ModalFooter>
          <Button colorScheme="blue" mr={3} onClick={onConfirm}>
            {confirmLabel}
          </Button>
          <Button variant="ghost" onClick={onClose}>
            Close
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default CustomModal;

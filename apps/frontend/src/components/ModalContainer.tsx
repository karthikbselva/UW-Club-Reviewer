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
  Box,
  Divider,
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
    <Modal isOpen={isOpen} onClose={onClose} isCentered size="xl">
      <ModalOverlay bg="blackAlpha.600" backdropFilter="blur(4px)" />
      <ModalContent 
        borderRadius="2xl" 
        boxShadow="2xl"
        border="1px solid"
        borderColor="gray.200"
        maxW="600px"
      >
        <ModalHeader 
          fontSize="xl" 
          fontWeight="bold" 
          color="gray.800"
          pb={2}
        >
          {title}
        </ModalHeader>
        <ModalCloseButton 
          size="lg" 
          color="gray.500"
          _hover={{ color: "gray.700" }}
        />
        
        <Divider borderColor="gray.200" />
        
        <ModalBody py={6}>
          {children}
        </ModalBody>

        <Divider borderColor="gray.200" />
        
        <ModalFooter py={4}>
          <Button 
            colorScheme="blue" 
            mr={3} 
            onClick={onConfirm}
            borderRadius="full"
            px={6}
            fontWeight="semibold"
            _hover={{
              transform: "translateY(-1px)",
              boxShadow: "lg",
            }}
            transition="all 0.2s"
          >
            {confirmLabel}
          </Button>
          <Button 
            variant="ghost" 
            onClick={onClose}
            borderRadius="full"
            px={6}
            color="gray.600"
            _hover={{
              bg: "gray.100",
              color: "gray.800",
            }}
            transition="all 0.2s"
          >
            Cancel
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default CustomModal;

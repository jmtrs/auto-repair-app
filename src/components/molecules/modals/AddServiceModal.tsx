import React, { useState } from "react";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Button,
  FormControl,
  FormLabel,
  Input,
  Box,
  FormErrorMessage,
} from "@chakra-ui/react";

interface AddServiceModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (values: {
    code: number;
    date: string;
    cost: number;
    desc: string;
  }) => Promise<void>;
}

const AddServiceModal: React.FC<AddServiceModalProps> = ({
  isOpen,
  onClose,
  onSave,
}) => {
  const [formData, setFormData] = useState({
    code: 0,
    date: "",
    cost: 0,
    desc: "",
  });
  const [isLoading, setIsLoading] = useState(false);
  const [formErrors, setFormErrors] = useState({
    code: "",
    date: "",
    cost: "",
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const validateForm = () => {
    const errors: { [key: string]: string } = {};

    if (formData.code === 0) {
      errors.code = "Code is required";
    }

    if (formData.date === "") {
      errors.date = "Date is required";
    }

    if (formData.cost === 0) {
      errors.cost = "Cost is required";
    }

    return Object.keys(errors).length === 0;
  };

  const handleSave = async () => {
    if (!validateForm()) {
      return;
    }

    setIsLoading(true);
    try {
      await onSave(formData);
      onClose();
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} size="md">
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Add New Service</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <FormControl isRequired isInvalid={formErrors.code !== ""}>
            <FormLabel>Code</FormLabel>
            <Input
              type="number"
              name="code"
              value={formData.code}
              onChange={handleInputChange}
            />
            <FormErrorMessage>{formErrors.code}</FormErrorMessage>
          </FormControl>
          <FormControl mt={4} isRequired isInvalid={formErrors.date !== ""}>
            <FormLabel>Date</FormLabel>
            <Input
              type="date"
              name="date"
              value={formData.date}
              onChange={handleInputChange}
            />
            <FormErrorMessage>{formErrors.date}</FormErrorMessage>
          </FormControl>
          <FormControl mt={4} isRequired isInvalid={formErrors.cost !== ""}>
            <FormLabel>Cost ($)</FormLabel>
            <Input
              type="number"
              name="cost"
              value={formData.cost}
              onChange={handleInputChange}
            />
            <FormErrorMessage>{formErrors.cost}</FormErrorMessage>
          </FormControl>
          <FormControl mt={4}>
            <FormLabel>Description</FormLabel>
            <Input
              type="text"
              name="desc"
              value={formData.desc}
              onChange={handleInputChange}
            />
          </FormControl>
        </ModalBody>
        <ModalFooter>
          <Box mr={3}>
            <Button
              colorScheme="blue"
              onClick={handleSave}
              isLoading={isLoading}
            >
              Save
            </Button>
          </Box>
          <Button onClick={onClose}>Cancel</Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default AddServiceModal;

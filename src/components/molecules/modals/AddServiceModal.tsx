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
  const initialFormData = {
    code: 0,
    date: "",
    cost: 0,
    desc: "",
  };
  const initialFormErrors = {
    code: "",
    date: "",
    cost: "",
  };
  const [formData, setFormData] = useState(initialFormData);
  const [isLoading, setIsLoading] = useState(false);
  const [formErrors, setFormErrors] = useState(initialFormErrors);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const validateForm = () => {
    const errors: any = {};

    if (formData.code === 0) {
      errors.code = "Code is required";
    } else {
      errors.code = "";
    }

    if (formData.date === "") {
      errors.date = "Date is required";
    } else {
      errors.date = "";
    }

    if (formData.cost === 0) {
      errors.cost = "Cost is required";
    } else {
      errors.cost = "";
    }

    setFormErrors(errors);
    return Object.values(errors).every((err) => err === "");
  };

  const handleSave = async () => {
    if (!validateForm()) {
      return;
    }

    setIsLoading(true);
    try {
      await onSave(formData);
      setFormData(initialFormData);
      setFormErrors(initialFormErrors);
      onClose();
    } finally {
      setIsLoading(false);
    }
  };

  const handleClose = () => {
    setFormData(initialFormData);
    setFormErrors(initialFormErrors);
    onClose();
  };

  return (
    <Modal isOpen={isOpen} onClose={handleClose} size="md">
      <ModalOverlay />
      <ModalContent m={4}>
        <Box>
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
            <Button onClick={handleClose}>Cancel</Button>
          </ModalFooter>
        </Box>
      </ModalContent>
    </Modal>
  );
};

export default AddServiceModal;

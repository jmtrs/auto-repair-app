import React, { useState } from "react";
import {
  Box,
  Heading,
  Text,
  SimpleGrid,
  Badge,
  Button,
} from "@chakra-ui/react";
import AddServiceModal from "../molecules/modals/AddServiceModal"; // Adjust the path as needed

interface CustomerDetailsProps {
  firstName: string;
  lastName: string;
  year: number;
  make: string;
  model: string;
  services: {
    code: number;
    desc: string;
    date: string;
    cost: number;
  }[];
}

const CustomerDetails: React.FC<CustomerDetailsProps> = ({
  firstName,
  lastName,
  year,
  make,
  model,
  services,
}) => {
  const [isAddServiceModalOpen, setIsAddServiceModalOpen] = useState(false);
  const [customerServices, setCustomerServices] = useState(services);

  const handleAddServiceClick = () => {
    setIsAddServiceModalOpen(true);
  };

  const handleSaveService = async (values: {
    code: number;
    date: string;
    cost: number;
    desc: string;
  }) => {
    try {
      await promiseDelay(3000);
      const newService = { ...values };
      setCustomerServices([...customerServices, newService]);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Box
      borderWidth="1px"
      borderRadius="lg"
      p={4}
      boxShadow="md"
      bgColor="white"
      maxW="400px"
      w="100%"
    >
      <Heading as="h2" size="lg" mb={2}>
        {`${firstName} ${lastName}`}
      </Heading>
      <Text fontSize="sm" color="gray.500" mt={2}>
        Year: <span style={{ fontWeight: "bold" }}>{year}</span> | Make:{" "}
        <span style={{ fontWeight: "bold" }}>{make}</span> | Model:{" "}
        <span style={{ fontWeight: "bold" }}>{model}</span>
      </Text>
      <Heading as="h3" size="md" mt={4} mb={2}>
        Services:
      </Heading>
      <SimpleGrid minChildWidth="120px" spacing="20px">
        {customerServices.map((service, serviceIndex) => (
          <Box key={serviceIndex} bgColor="gray.100" p={2} borderRadius="md">
            <Badge colorScheme="blue" fontSize="sm">
              Code: {service.code}
            </Badge>
            <Text fontSize="sm" color="gray.600" mt={1}>
              Description: {service.desc}
            </Text>
            <Text fontSize="sm" color="gray.600" mt={1}>
              Date: {service.date}
            </Text>
            <Text fontSize="sm" fontWeight="bold" mt={1}>
              Cost: ${service.cost}
            </Text>
          </Box>
        ))}
      </SimpleGrid>
      <Button colorScheme="blue" mt={4} onClick={handleAddServiceClick}>
        Add Service
      </Button>
      <AddServiceModal
        isOpen={isAddServiceModalOpen}
        onClose={() => setIsAddServiceModalOpen(false)}
        onSave={handleSaveService}
      />
    </Box>
  );
};

export default CustomerDetails;

const promiseDelay = (ms: number): Promise<NodeJS.Timeout> =>
  new Promise((resolve) => setTimeout(resolve, ms));

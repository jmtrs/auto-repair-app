import React, { useState } from "react";
import {
  Box,
  Heading,
  Text,
  SimpleGrid,
  Badge,
  Button,
  useColorModeValue,
} from "@chakra-ui/react";
import AddServiceModal from "../molecules/modals/AddServiceModal";

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
  const bgColor = useColorModeValue("white", "gray.800");
  const miniCardsColor = useColorModeValue("gray.100", "gray.700");

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
      display="flex"
      flexDirection="column"
      borderWidth="1px"
      borderRadius="lg"
      p={4}
      boxShadow="md"
      bgColor={bgColor}
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
          <Box
            key={serviceIndex}
            bgColor={miniCardsColor}
            p={2}
            borderRadius="md"
          >
            <Badge colorScheme="blue" fontSize="sm">
              Code: {service.code}
            </Badge>
            <Text fontSize="sm" color="gray.500" mt={1}>
              Description: {service.desc}
            </Text>
            <Text fontSize="sm" color="gray.500" mt={1}>
              Date: {service.date}
            </Text>
            <Text fontSize="sm" fontWeight="bold" mt={1}>
              Cost: ${service.cost}
            </Text>
          </Box>
        ))}
      </SimpleGrid>
      <Box mt="auto" justifyContent="center" display="flex">
        <Button colorScheme="blue" onClick={handleAddServiceClick} mt={4}>
          Add Service
        </Button>
      </Box>
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

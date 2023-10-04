// src/components/molecules/CustomerDetails.tsx

import React from "react";
import { Box, Heading, Text, SimpleGrid, Badge } from "@chakra-ui/react";

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
        {services.map((service, serviceIndex) => (
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
    </Box>
  );
};

export default CustomerDetails;

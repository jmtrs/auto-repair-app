import React from "react";
import { SimpleGrid, Heading, Box, Container } from "@chakra-ui/react";
import CustomerDetails from "../molecules/CustomerDetails";
import customerData from "../../data/customerData";

const CustomerList: React.FC = () => {
  return (
    <Container maxW="container.lg" centerContent p={0} my={5}>
      <Heading as="h1" size="xl" mb={5}>
        Customer List
      </Heading>
      <SimpleGrid columns={[1, 2, 3]} spacing={4} width="100%">
        {customerData.map((customer, index) => (
          <CustomerDetails key={index} {...customer} />
        ))}
      </SimpleGrid>
    </Container>
  );
};

export default CustomerList;

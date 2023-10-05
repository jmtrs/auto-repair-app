import React from "react";
import { SimpleGrid, Heading, Box, Container, Button } from "@chakra-ui/react";
import { useColorMode, useColorModeValue } from "@chakra-ui/react";
import CustomerDetails from "../molecules/CustomerDetails";
import customerData from "../../data/customerData";

const CustomerList: React.FC = () => {
  const { colorMode, toggleColorMode } = useColorMode();
  const buttonColor = useColorModeValue("gray.600", "gray.600");

  return (
    <Container maxW="container.lg" centerContent p={0} my={5}>
      <Heading
        as="h1"
        size="xl"
        mb={5}
        onClick={toggleColorMode}
        cursor="pointer"
      >
        Customer List
      </Heading>
      <Box mx={2}>
        <SimpleGrid columns={[1, 2, 3]} spacing={4} width="100%">
          {customerData.map((customer, index) => (
            <CustomerDetails key={index} {...customer} />
          ))}
        </SimpleGrid>
      </Box>
    </Container>
  );
};

export default CustomerList;

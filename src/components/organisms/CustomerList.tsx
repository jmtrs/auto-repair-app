import React from "react";
import { SimpleGrid, Heading, Box, Container, Icon, Link } from "@chakra-ui/react";
import { useColorMode } from "@chakra-ui/react";
import CustomerDetails from "../molecules/CustomerDetails";
import customerData from "../../data/customerData";
import { FaHeart } from "react-icons/fa";
import { FiGithub } from "react-icons/fi";

const CustomerList: React.FC = () => {
  const { toggleColorMode } = useColorMode();

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
            <Box mt={10} textAlign="center">
                Created with{" "}
                <Link href="https://github.com/jmtrs/auto-repair-app" isExternal>
                    <Icon as={FaHeart} color="red.500" />{" "}
                </Link>
                for{" "}
                <Link href="https://altair.com" isExternal>
                    Altair
                </Link>
            </Box>
        </Container>
    );
};

export default CustomerList;

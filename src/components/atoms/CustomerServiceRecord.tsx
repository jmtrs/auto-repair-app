// src/components/atoms/CustomerServiceRecord.tsx

import React from "react";
import { Badge, Box, Text } from "@chakra-ui/react";

interface CustomerServiceRecordProps {
  code: number;
  desc: string;
  date: string;
  cost: number;
}

const CustomerServiceRecord: React.FC<CustomerServiceRecordProps> = ({
  code,
  desc,
  date,
  cost,
}) => {
  return (
    <Box
      bgColor="gray.100"
      p={2}
      borderRadius="md"
      boxShadow="sm"
      maxW="300px"
      w="100%"
    >
      <Badge colorScheme="blue" fontSize="sm">
        Service Code: {code}
      </Badge>
      <Text fontSize="sm">
        Description: {desc}
      </Text>
      <Text fontSize="sm">
        Date: {date}
      </Text>
      <Text fontSize="sm">
        Cost: ${cost}
      </Text>
    </Box>
  );
};

export default CustomerServiceRecord;

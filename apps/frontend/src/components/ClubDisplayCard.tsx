import React from "react";
import { HStack, Text } from "@chakra-ui/react";

type ClubInfoProps = {
  title: string;
  numRatings: number;
  percentLiked: number;
};

const ClubInfo: React.FC<ClubInfoProps> = ({
  title,
  numRatings,
  percentLiked,
}) => {
  return (
    <HStack spacing={8} mt={4}>
      <Text fontWeight="bold">{title}</Text>
      <Text>{numRatings}</Text>
      <Text>{percentLiked}%</Text>
    </HStack>
  );
};

export default ClubInfo;

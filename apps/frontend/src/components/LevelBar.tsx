// LevelBars.tsx
import React from "react";
import { HStack, Box } from "@chakra-ui/react";

type LevelBarsProps = {
  level: number;
};

const LevelBars: React.FC<LevelBarsProps> = ({ level }) => {
  // Determine number of filled bars
  let filledBars = level;

  return (
    <HStack spacing={1}>
      {[1, 2, 3].map((bar) => (
        <Box
          key={bar}
          w="8px"
          h="8px"
          bg={bar <= filledBars ? "blue.500" : "gray.300"}
          borderRadius="sm"
        />
      ))}
    </HStack>
  );
};

export default LevelBars;

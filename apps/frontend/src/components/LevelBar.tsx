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
          w="10px"
          h="10px"
          bg={bar <= filledBars ? "blue.500" : "gray.300"}
          borderRadius="sm"
          transition="all 0.2s"
          _hover={{
            transform: "scale(1.1)",
          }}
        />
      ))}
    </HStack>
  );
};

export default LevelBars;

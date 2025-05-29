// LevelBars.tsx
import React from "react";
import { HStack, Box } from "@chakra-ui/react";

type LevelBarsProps = {
  level: "Beginner" | "Intermediate" | "Advanced";
};

const LevelBars: React.FC<LevelBarsProps> = ({ level }) => {
  // Determine number of filled bars
  let filledBars = 0;
  switch (level) {
    case "Beginner":
      filledBars = 1;
      break;
    case "Intermediate":
      filledBars = 2;
      break;
    case "Advanced":
      filledBars = 3;
      break;
  }

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

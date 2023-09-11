import { Flex, Text } from "@chakra-ui/react";
import { SmileySad } from "@phosphor-icons/react";

export function EmptyState({ message }: { message: string }) {
  return (
    <Flex
      justifyContent="center"
      alignItems="center"
      flexDir="column"
      maxW="sm"
      mt={20}
      mx="auto"
    >
      <SmileySad size={64} />
      <Text textAlign="center" fontSize="lg" mt={4}>
        {message}
      </Text>
    </Flex>
  );
}

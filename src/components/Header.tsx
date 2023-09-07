import { Box, Button, chakra, Icon, IconButton, Image } from "@chakra-ui/react";
import { Faders, ListChecks, MagnifyingGlass } from "@phosphor-icons/react";
import Link from "next/link";

export function Header() {
  return (
    <Box
      w="full"
      px={20}
      h="80px"
      bg="white"
      display="flex"
      alignItems="center"
    >
      <Box flex={1}>
        <Link href="/">
          <Image src="/logo.svg" alt="ReceitaCheck" h="40px" w="auto" />
        </Link>
      </Box>

      <Box flex={1} display="flex" justifyContent="center">
        <Box
          h="48px"
          bg="gray.100"
          rounded="full"
          w="full"
          maxW="container.md"
          px={6}
          display="flex"
          alignItems="center"
          _focusWithin={{
            boxShadow: "outline",
          }}
        >
          <Icon mr={4} boxSize={6} as={MagnifyingGlass} color="gray.500" />

          <chakra.input
            placeholder="Pesquisar receitas"
            h="full"
            border="none"
            outline="none"
            bg="transparent"
            flex={1}
          />

          <IconButton
            aria-label="Filtros das receitas"
            variant="ghost"
            colorScheme="gray"
            rounded="full"
            icon={<Icon boxSize={6} as={Faders} color="gray.800" />}
          />
        </Box>
      </Box>

      <Box flex={1} display="flex" justifyContent="flex-end">
        <Button
          leftIcon={<ListChecks size={20} />}
          variant="outline"
          rounded="full"
        >
          Meus ingredientes
        </Button>
      </Box>
    </Box>
  );
}

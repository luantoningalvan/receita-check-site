import { Box, chakra, Icon, IconButton, BoxProps } from "@chakra-ui/react";
import { MagnifyingGlass, X } from "@phosphor-icons/react";

interface SearchBarProps extends BoxProps {
  search: string;
  setSearch: (search: string) => void;
  placeholder?: string;
}

export function SearchBar(props: SearchBarProps) {
  const { search, setSearch, placeholder, ...rest } = props;

  return (
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
      {...rest}
    >
      <Icon mr={4} boxSize={6} as={MagnifyingGlass} color="gray.500" />

      <chakra.input
        placeholder={placeholder}
        h="full"
        border="none"
        outline="none"
        bg="transparent"
        flex={1}
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

      {search && (
        <IconButton
          aria-label="Filtros das receitas"
          variant="ghost"
          colorScheme="gray"
          rounded="full"
          icon={<Icon boxSize={6} as={X} color="gray.800" />}
          onClick={() => setSearch("")}
        />
      )}
    </Box>
  );
}
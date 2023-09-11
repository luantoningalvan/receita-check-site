import { Box, chakra, Icon, IconButton, BoxProps } from "@chakra-ui/react";
import { LuSearch, LuX } from "react-icons/lu";

interface SearchBarProps extends BoxProps {
  search: string;
  setSearch: (search: string) => void;
  placeholder?: string;
  onSearchSubmit?: (text: string) => void;
}

export function SearchBar(props: SearchBarProps) {
  const { search, setSearch, placeholder, onSearchSubmit, ...rest } = props;

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    typeof onSearchSubmit === "function" && onSearchSubmit(search);
  }

  return (
    <Box
      as="form"
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
      onSubmit={handleSubmit}
      {...rest}
    >
      <Icon mr={4} boxSize={6} as={LuSearch} color="gray.500" />

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
          icon={<Icon boxSize={6} as={LuX} color="gray.800" />}
          onClick={() => setSearch("")}
        />
      )}
    </Box>
  );
}

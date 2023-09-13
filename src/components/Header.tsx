import React from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import {
  Box,
  Button,
  Container,
  Icon,
  IconButton,
  Image,
  Input,
  useBreakpoint,
} from "@chakra-ui/react";
import { LuChevronLeft, LuListChecks, LuSearch, LuX } from "react-icons/lu";
import { SearchBar } from "./SearchBar";

export function Header() {
  const breakpoint = useBreakpoint("lg");
  const [openSearch, setOpenSearch] = React.useState(false);
  const [search, setSearch] = React.useState("");
  const router = useRouter();

  const handleSearchSubmit = (text) => {
    if (!text) return;

    router.push(`/busca/${text}`);
    setOpenSearch(false);
  };

  if (["md", "lg", "xl", "2xl"].includes(breakpoint)) {
    return (
      <Container maxW="container.xl">
        <Box
          w="full"
          h="80px"
          bg="white"
          display="flex"
          alignItems="center"
          justifyContent="space-between"
          gap={8}
        >
          <Box w="200px">
            <Link href="/">
              <Image src="/logo.svg" alt="ReceitaCheck" h="40px" w="auto" />
            </Link>
          </Box>

          <SearchBar
            search={search}
            setSearch={setSearch}
            placeholder="Pesquisar receitas"
            onSearchSubmit={handleSearchSubmit}
          />

          <Box w="200px" display="flex" justifyContent="flex-end">
            <Button
              leftIcon={<LuListChecks size={20} />}
              variant="outline"
              rounded="full"
              as={Link}
              href="/meus-ingredientes"
            >
              Meus ingredientes
            </Button>
          </Box>
        </Box>
      </Container>
    );
  }

  return (
    <Box
      w="full"
      px={4}
      h="64px"
      display="flex"
      alignItems="center"
      borderBottomWidth={1}
      borderBottomColor="gray.100"
      pos="relative"
    >
      {openSearch && (
        <Box
          w="full"
          h="64px"
          position="absolute"
          top={0}
          left={0}
          bg="white"
          zIndex={1}
          borderBottomWidth={1}
          borderBottomColor="gray.100"
          display="flex"
          alignItems="center"
          as="form"
          onSubmit={(e) => {
            e.preventDefault();
            handleSearchSubmit(search);
          }}
          _focusWithin={{
            boxShadow: "outline",
          }}
        >
          <IconButton
            aria-label="Fechar busca"
            variant="ghost"
            rounded="full"
            icon={<Icon boxSize={6} as={LuChevronLeft} />}
            onClick={() => setOpenSearch(false)}
          />
          <Input
            autoFocus
            placeholder="Buscar por receita"
            flex={1}
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            h="full"
            border={0}
            inputMode="search"
            outline="none"
            _focusVisible={{
              border: "none",
            }}
          />
          <IconButton
            aria-label="Apagar busca"
            variant="ghost"
            rounded="full"
            icon={<Icon boxSize={6} as={LuX} />}
            onClick={() => setSearch("")}
          />
        </Box>
      )}
      <Box flexGrow={0} flexShrink={0}>
        <Link href="/">
          <Image src="/logo.svg" alt="ReceitaCheck" h="36px" w="auto" />
        </Link>
      </Box>

      <Box flex={1} display="flex" justifyContent="flex-end">
        <IconButton
          aria-label="Abrir menu"
          variant="outline"
          rounded="full"
          icon={<Icon boxSize={6} as={LuSearch} />}
          mr={4}
          onClick={() => setOpenSearch(true)}
        />
        {breakpoint == "base" ? (
          <IconButton
            aria-label="Abrir busca"
            variant="outline"
            rounded="full"
            icon={<Icon boxSize={6} as={LuListChecks} />}
            as={Link}
            href="/meus-ingredientes"
          />
        ) : (
          <Button
            leftIcon={<LuListChecks size={20} />}
            variant="outline"
            rounded="full"
            as={Link}
            href="/meus-ingredientes"
          >
            Meus ingredientes
          </Button>
        )}
      </Box>
    </Box>
  );
}

import React from "react";
import Link from "next/link";
import { Box, Button, Image } from "@chakra-ui/react";
import { ListChecks } from "@phosphor-icons/react";
import { SearchBar } from "./SearchBar";

export function Header() {
  const [search, setSearch] = React.useState("");

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

      <SearchBar
        search={search}
        setSearch={setSearch}
        placeholder="Pesquisar receitas"
      />

      <Box flex={1} display="flex" justifyContent="flex-end">
        <Button
          leftIcon={<ListChecks size={20} />}
          variant="outline"
          rounded="full"
          as={Link}
          href="/meus-ingredientes"
        >
          Meus ingredientes
        </Button>
      </Box>
    </Box>
  );
}

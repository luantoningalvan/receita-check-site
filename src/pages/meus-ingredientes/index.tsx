import React from "react";
import { Box, Container, Heading, SimpleGrid, Stack } from "@chakra-ui/react";
import { api } from "../../services/api";
import { GetServerSideProps } from "next";
import { Ingredient } from "../../common/Ingredient";
import { IngredientCard } from "../../components/IngredientCard";
import { SearchBar } from "../../components/SearchBar";
import { parseCookies, setCookie } from "nookies";

interface MyIngredientsProps {
  ingredients: Ingredient[];
  currentIngredients: Ingredient[];
}

export const getServerSideProps: GetServerSideProps<
  MyIngredientsProps
> = async (ctx) => {
  const res = await api.get("ingredients");

  let alreadyOwnsIngredients = [];

  const getSavedIngredients = parseCookies(ctx)["@ReceitaCheck:ingredients"];

  if (getSavedIngredients) {
    alreadyOwnsIngredients = JSON.parse(getSavedIngredients);
  }

  return {
    props: {
      ingredients: res.data,
      currentIngredients: alreadyOwnsIngredients,
    },
  };
};

export default function MyIngredients(props: MyIngredientsProps) {
  const { ingredients, currentIngredients } = props;

  const [alreadyOwnsIngredients, setAlreadyOwnsIngredients] =
    React.useState<Ingredient[]>(currentIngredients);

  const [search, setSearch] = React.useState("");
  const [searchOwns, setSearchOwns] = React.useState("");

  const onlyIngredientsIds = alreadyOwnsIngredients.map(
    (ingredient) => ingredient.id
  );

  const filteredIngredients = ingredients.filter(
    (ingredient) =>
      ingredient.description.toLowerCase().includes(search.toLowerCase()) &&
      !onlyIngredientsIds.includes(ingredient.id)
  );

  const filteredOwnsIngredients = alreadyOwnsIngredients.filter((ingredient) =>
    ingredient.description.toLowerCase().includes(searchOwns.toLowerCase())
  );

  const handleAddIngredient = React.useCallback(
    async (ingredient: Ingredient) => {
      const currentIngredients = parseCookies()["@ReceitaCheck:ingredients"];

      let newState = [ingredient];

      if (currentIngredients) {
        const parsedIngredients = JSON.parse(currentIngredients);

        if (
          parsedIngredients.find(
            (currentIngredient: Ingredient) =>
              currentIngredient.id === ingredient.id
          )
        ) {
          return;
        }

        newState = [...parsedIngredients, ingredient];
      }

      setAlreadyOwnsIngredients(newState);

      setCookie(null, "@ReceitaCheck:ingredients", JSON.stringify(newState));
    },
    []
  );

  const handleRemoveIngredient = React.useCallback(
    async (ingredient: Ingredient) => {
      const currentIngredients =
        parseCookies(null)["@ReceitaCheck:ingredients"];

      if (currentIngredients) {
        const parsedIngredients = JSON.parse(currentIngredients);

        const newState = parsedIngredients.filter(
          (currentIngredient: Ingredient) =>
            currentIngredient.id !== ingredient.id
        );

        setCookie(null, "@ReceitaCheck:ingredients", JSON.stringify(newState));

        setSearchOwns("");
        setAlreadyOwnsIngredients(newState);
      }
    },
    []
  );

  return (
    <Container my={8} w="full" maxW="1280px">
      <SimpleGrid columns={2} spacing={8}>
        <Box>
          <Heading size="md" fontWeight="normal" color="gray.600">
            Incluir novo ingrediente
          </Heading>

          <SearchBar
            search={search}
            setSearch={setSearch}
            placeholder="Pesquisar ingredientes"
            mt={4}
          />

          <Box
            mt={4}
            maxH="calc(100vh - 250px)"
            overflow="auto"
            css={{
              scrollbarGutter: "stable",
              "&::-webkit-scrollbar": {
                width: "14px",
              },
              "&::-webkit-scrollbar-track": {
                width: "6px",
              },
              "&::-webkit-scrollbar-thumb": {
                background: "#ccc",
                border: "4px solid rgba(0, 0, 0, 0)",
                borderRadius: "24px",
                backgroundClip: "padding-box",
              },
            }}
          >
            <Stack spacing={4}>
              {filteredIngredients.map((ingredient) => (
                <IngredientCard
                  ingredient={ingredient}
                  key={ingredient.id}
                  mode="add"
                  onAction={() => handleAddIngredient(ingredient)}
                />
              ))}
            </Stack>
          </Box>
        </Box>

        <Box>
          <Heading size="md" fontWeight="normal" color="gray.600">
            Ingredientes que você tem
          </Heading>

          <SearchBar
            search={searchOwns}
            setSearch={setSearchOwns}
            placeholder="Pesquisar ingredientes"
            mt={4}
          />

          <Box
            mt={4}
            maxH="calc(100vh - 250px)"
            overflow="auto"
            css={{
              scrollbarGutter: "stable",
              "&::-webkit-scrollbar": {
                width: "14px",
              },
              "&::-webkit-scrollbar-track": {
                width: "6px",
              },
              "&::-webkit-scrollbar-thumb": {
                background: "#ccc",
                border: "4px solid rgba(0, 0, 0, 0)",
                borderRadius: "24px",
                backgroundClip: "padding-box",
              },
            }}
          >
            <Stack spacing={4}>
              {filteredOwnsIngredients.map((ingredient) => (
                <IngredientCard
                  ingredient={ingredient}
                  key={ingredient.id}
                  mode="remove"
                  onAction={() => handleRemoveIngredient(ingredient)}
                />
              ))}
            </Stack>
          </Box>
        </Box>
      </SimpleGrid>
    </Container>
  );
}

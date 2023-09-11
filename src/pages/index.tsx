import Head from "next/head";
import { Center, Container, SimpleGrid } from "@chakra-ui/react";
import { GetServerSideProps } from "next";
import { Recipe } from "../common/Recipe";
import { api } from "../services/api";
import { RecipeCard } from "../components/RecipeCard";
import { parseCookies } from "nookies";
import { EmptyState } from "../components/EmptyState";

export const getServerSideProps: GetServerSideProps<{
  recipes: Recipe[];
}> = async (ctx) => {
  const getSavedIngredients = parseCookies(ctx)["@ReceitaCheck:ingredients"];

  let alreadyOwnsIngredients = [];

  if (getSavedIngredients) {
    alreadyOwnsIngredients = JSON.parse(getSavedIngredients).map(
      (ingredient) => ingredient.id
    );
  }

  const res = await api.post("recipes/list", {
    ingredients:
      alreadyOwnsIngredients.length > 0 ? alreadyOwnsIngredients : undefined,
  });

  return { props: { recipes: res.data } };
};

export default function Home({ recipes }: { recipes: Recipe[] }) {
  return (
    <>
      <Head>
        <title>Receita Check - Receitas com o que você tem</title>
      </Head>

      <Container my={8} w="full" maxW="1280px">
        {recipes.length === 0 && (
          <EmptyState message="Nenhuma receita encontrada utilizando somente seus ingredientes" />
        )}
        <SimpleGrid spacing={8} columns={3}>
          {recipes.map((recipe) => (
            <RecipeCard recipe={recipe} key={recipe.id} />
          ))}
        </SimpleGrid>
      </Container>
    </>
  );
}

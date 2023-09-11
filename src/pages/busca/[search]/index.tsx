import Head from "next/head";
import { Container, Heading, SimpleGrid } from "@chakra-ui/react";
import { GetServerSideProps } from "next";
import { Recipe } from "../../../common/Recipe";
import { api } from "../../../services/api";
import { RecipeCard } from "../../../components/RecipeCard";
import { EmptyState } from "../../../components/EmptyState";

interface SearchProps {
  recipes: Recipe[];
  search: string;
}

export const getServerSideProps: GetServerSideProps<SearchProps> = async (
  ctx
) => {
  const { search } = ctx.params;

  const res = await api.post(
    "recipes/list",
    {},
    {
      params: {
        title: search,
      },
    }
  );

  return { props: { recipes: res.data, search: search as string } };
};

export default function Search({ recipes, search }: SearchProps) {
  return (
    <>
      <Head>
        <title>Resultados para: {search} - Receita Check</title>
      </Head>

      <Container my={8} w="full" maxW="1280px">
        <Heading as="h1" size="md" mb={8}>
          Exibindo resultados para: “{search}”
        </Heading>

        {recipes.length === 0 && (
          <EmptyState message="Nenhuma receita encontrada para a sua busca" />
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

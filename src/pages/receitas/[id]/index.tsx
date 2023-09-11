import {
  Box,
  Checkbox,
  Container,
  Flex,
  Heading,
  Image,
  Stack,
  Text,
} from "@chakra-ui/react";
import { LuClock, LuUsers } from "react-icons/lu";
import { Recipe } from "../../../common/Recipe";
import { Fragment } from "react";
import { api } from "../../../services/api";
import { GetServerSideProps } from "next";
import Head from "next/head";

export const getServerSideProps: GetServerSideProps<{
  recipe: Recipe;
}> = async (ctx) => {
  try {
    const res = await api.get(`recipes/${ctx.params.id}`);
    return { props: { recipe: res.data } };
  } catch (error) {
    return {
      notFound: true,
    };
  }
};

export default function ShowRecipe({ recipe }: { recipe: Recipe }) {
  return (
    <Container my={8} w="full" maxW="container.lg">
      <Head>
        <title>{recipe.title} - Receita Check</title>
      </Head>
      <Box pos="relative" w="full" h="460px">
        <Image
          src={recipe.image_url}
          w="full"
          h="460px"
          overflow="hidden"
          objectFit="cover"
          borderRadius="xl"
        />

        {/* <Box
          w="full"
          top={0}
          left={0}
          pos="absolute"
          h="50%"
          display="flex"
          alignItems="flex-start"
          justifyContent="flex-end"
          p={4}
        >
          <IconButton
            aria-label="Favoritar"
            colorScheme="whiteAlpha"
            color="brand.100"
            icon={<Icon as={Heart} boxSize={7} />}
            size="lg"
          />
        </Box> */}

        <Box
          w="full"
          bottom={0}
          left={0}
          pos="absolute"
          h="50%"
          borderBottomRadius="xl"
          bgGradient={["linear(to-t, rgba(0,0,0,0.5), transparent)"]}
          display="flex"
          alignItems="flex-end"
          p={8}
        >
          <Heading as="h1" color="white" fontSize="4xl">
            {recipe.title}
          </Heading>
        </Box>
      </Box>

      <Flex mt={8} justifyContent="space-between" alignItems="center">
        <Flex direction="row" gap={4}>
          <Flex gap={2} alignItems="center">
            <LuUsers size={24} />
            <Text fontSize="lg" lineHeight={1}>
              {recipe.how_many_people} porções
            </Text>
          </Flex>
          <Flex gap={2} alignItems="center">
            <LuClock size={24} />
            <Text fontSize="lg" lineHeight={1}>
              {recipe.preparation_time} min.
            </Text>
          </Flex>
        </Flex>

        {/* <Flex gap={2} color="brand.main">
          <Star weight="fill" size={26} />
          <Star weight="fill" size={26} />
          <Star weight="fill" size={26} />
          <Star weight="fill" size={26} />
          <StarHalf weight="fill" size={26} />
        </Flex> */}
      </Flex>

      <Heading size="lg" mt={8} mb={4}>
        Ingredientes
      </Heading>

      <Stack spacing={4}>
        {recipe.ingredients.map((ingredient, index) => (
          <Fragment key={index}>
            {ingredient.startsWith("#") ? (
              <Heading size="md" mt={6}>
                {ingredient.replace("#", "")}
              </Heading>
            ) : (
              <Box ml={4} display="flex" alignItems="flex-start">
                <Checkbox size="lg" my="3px" id={`ingredient-${index}`} />
                <Text
                  lineHeight="26px"
                  ml={3}
                  as="label"
                  htmlFor={`ingredient-${index}`}
                >
                  {ingredient}
                </Text>
              </Box>
            )}
          </Fragment>
        ))}
      </Stack>

      <Heading size="lg" mt={8} mb={4}>
        Modo de preparo
      </Heading>

      <Stack spacing={4} mb={12}>
        {recipe.preparation_mode.map((step, index) => (
          <Fragment key={index}>
            {step.startsWith("#") ? (
              <Heading size="md" mb={6}>
                {step.replace("#", "")}
              </Heading>
            ) : (
              <Box ml={4} display="flex" alignItems="flex-start">
                <Checkbox size="lg" my="3px" id={`step-${index}`} />
                <Text
                  lineHeight="26px"
                  ml={3}
                  as="label"
                  htmlFor={`step-${index}`}
                >
                  {step}
                </Text>
              </Box>
            )}
          </Fragment>
        ))}
      </Stack>
    </Container>
  );
}

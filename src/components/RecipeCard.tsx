import { Box, Fade, Flex, Heading, Image, Stack, Text } from "@chakra-ui/react";
import { Recipe } from "../common/Recipe";
import { Blurhash } from "react-blurhash";
import { Clock, UsersThree } from "@phosphor-icons/react";
import Link from "next/link";

interface RecipeCardProps {
  recipe: Recipe;
}

export function RecipeCard({ recipe }: RecipeCardProps) {
  return (
    <Box
      w="full"
      rounded="lg"
      tabIndex={0}
      as={Link}
      href={`/receitas/${recipe.slug}`}
      outline="none"
      _focus={{
        boxShadow: "outline",
      }}
    >
      <Image
        fallback={
          <Blurhash
            hash={recipe.hash}
            width="100%"
            height={200}
            resolutionX={100}
            resolutionY={100}
            punch={1}
            style={{
              borderRadius: "8px 0px 0px 8px",
            }}
          />
        }
        fallbackStrategy="beforeLoadOrError"
        transition="1s"
        w="full"
        objectFit="cover"
        h="200px"
        src={recipe.image_url}
        alt={recipe.title}
        borderTopRadius="lg"
      />

      <Box
        borderBottomRadius="lg"
        p={4}
        borderTop={0}
        borderWidth={1}
        borderColor="gray.200"
      >
        <Heading fontWeight="medium" fontSize="1.3rem">
          {recipe.title}
        </Heading>

        <Flex direction="row" gap={4} mt={4}>
          <Flex gap={2} alignItems="center">
            <UsersThree size={22} />
            <Text fontSize="1rem" lineHeight={1}>
              {recipe.how_many_people} porções
            </Text>
          </Flex>
          <Flex gap={2} alignItems="center">
            <Clock size={22} />
            <Text fontSize="1rem" lineHeight={1}>
              {recipe.preparation_time} min.
            </Text>
          </Flex>
        </Flex>
      </Box>
    </Box>
  );
}

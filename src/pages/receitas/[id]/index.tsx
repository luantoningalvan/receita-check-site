import {
  Box,
  Checkbox,
  Container,
  Flex,
  Heading,
  Icon,
  IconButton,
  Image,
  Stack,
  Text,
} from "@chakra-ui/react";
import {
  Clock,
  Heart,
  Star,
  StarHalf,
  UsersThree,
} from "@phosphor-icons/react";
import { Recipe } from "../../../common/Recipe";
import { Fragment } from "react";
import { api } from "../../../services/api";
import { GetServerSideProps } from "next";

// const recipe: Recipe = {
//   id: "1",
//   title: "Bolo de morango",
//   category: "Bolos",
//   hash: "",
//   how_many_people: 20,
//   preparation_time: 60,
//   image_url: "https://img.cybercook.com.br/receitas/12/bolo-de-morango-3.jpeg",
//   ingredients: [
//     "# Massa",
//     "1/2 xícara de chá (xícara 200 ml) de leite",
//     "1 e 1/2 xícara de chá (xícara 200 ml) de farinha de trigo",
//     "1 colher de sopa de fermento químico em pó",
//     "1 pitada de sal",
//     "1 colher de café de essência de baunilha",
//     "1 xícara de chá (xícara 200 ml) de açúcar",
//     "3 ovos",
//     "# Cobertura",
//     "1/2 xícara de chá (xícara 200 ml) de água fervente",
//     "1 e 1/2 xícara de chá (xícara 200 ml) de açúcar refinado",
//     "1 envelope de gelatina incolor e sem sabor (12 gramas)",
//     "350g de morangos",
//   ],
//   ingredients_ref: [],
//   preparation_mode: [
//     "# Massa",
//     "Em uma tigela adicione os ovos e então separe as gemas da clara, reserve as gemas e então bata as claras por 3 minutos ou até chegarem ao ponto de neve.",
//     "Logo que as claras atingirem o ponto de neve volte as gemas, uma por vez, batendo bem até obter um creme bem fofo.",
//     "Agora aos poucos e sem parar de bater acrescente o açúcar, bate bem até obter um creme.",
//     "Logo em seguida acrescente a essência de baunilha, sal, leite morno e a farinha de trigo peneirada depois basta continuar batendo até a mistura ficar bem homogênea.",
//     "Para finalizar, acrescente o fermento para bolo e com uma colher ou fûe misture delicadamente até incorporar o fermento.",
//     "Transfira a massa para uma forma untada e enfarinhada e então leve para assar em forno preaquecido a 180° por 35 minutos ou até dourar.",
//     "Passado o tempo retire o bolo do forno, aguarde amornar e então desenforme. Reserve.",
//     "# Cobertura",
//     "Na batedeira adicione a gelatina incolor seguida pela água fervente, agora comece a bater em velocidade baixa até que uma espuminha comece a se formar sobre o líquido.",
//     "Agora, acrescente o açúcar refinado e então comece a bater em velocidade alta por cerca de 20 minutos ou até obter um glacê liso e bonito.",
//     "Quando chegar ao ponto certo pare de bater e comece a cobrir o bolo espalhando pelas paredes de modo que a cobertura fique lisa e bonita.",
//     "Corte os morangos em lâminas finas e comece a organizar organicamente sobre o bolo, de modo a formar uma bela rosa.",
//     "Para finalizar, coloque o restante das lâminas na base do bolo para decorar. Sirva gelado.",
//   ],
// };

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

export default function ShowRecipe({ recipe }) {
  return (
    <Container my={8} w="full" maxW="container.lg">
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
            <UsersThree size={26} />
            <Text fontSize="lg" lineHeight={1}>
              {recipe.how_many_people} porções
            </Text>
          </Flex>
          <Flex gap={2} alignItems="center">
            <Clock size={26} />
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

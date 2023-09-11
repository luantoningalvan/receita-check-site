import { Box, Icon, IconButton, Image, Text } from "@chakra-ui/react";
import { Ingredient } from "../common/Ingredient";
import { LuPlus, LuMinus } from "react-icons/lu";

interface IngredientCardProps {
  ingredient: Ingredient;
  mode: "add" | "remove";
  onAction: (ingredient: Ingredient) => void;
}

export function IngredientCard(props: IngredientCardProps) {
  const { ingredient, mode, onAction } = props;

  return (
    <Box
      key={ingredient.id}
      rounded="md"
      borderWidth={1}
      borderColor="gray.200"
      px={6}
      py={2}
      display="flex"
      alignItems="center"
      gap={4}
    >
      <Image
        src={ingredient.image_url}
        alt={ingredient.description}
        h="40px"
        w="auto"
      />
      <Text flex={1}>{ingredient.description}</Text>
      <IconButton
        size="sm"
        variant="outline"
        aria-label="Adicionar ingrediente"
        rounded="full"
        onClick={() => onAction(ingredient)}
        icon={<Icon boxSize={6} as={mode === "add" ? LuPlus : LuMinus} />}
      />
    </Box>
  );
}

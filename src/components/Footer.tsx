import { Box, Image } from "@chakra-ui/react";

export function Footer() {
  return (
    <Box as="footer" w="full" px={4} bg="gray.50" py={8}>
      <Box
        margin="auto"
        maxW="1240px"
        display="flex"
        justifyContent="space-between"
      >
        <Image src="/logo.svg" alt="ReceitaCheck" h="40px" w="auto" />

        <Box display="flex" gap={4}>
          <a
            href="https://play.google.com/store/apps/details?id=com.brightmoon.receitacheck"
            target="_blank"
          >
            <Image
              src="/google-play-badge.svg"
              alt="Baixar na Google Play"
              h="40px"
              w="135px"
            />
          </a>
          <a
            href="https://apps.apple.com/br/app/receitacheck/id6443531452"
            target="_blank"
          >
            <Image
              src="/app-store-badge.svg"
              alt="Baixar na App Store"
              h="40px"
              w="120px"
            />
          </a>
        </Box>
      </Box>
    </Box>
  );
}

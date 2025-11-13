import { useToast } from "@chakra-ui/react";

const rarityColor = (rarity: string) => {
  switch (rarity.toLowerCase()) {
    case "junk":
      return "#AAAAAA";
    case "basic":
      return "#000000";
    case "fine":
      return "#62A4DA";
    case "masterwork":
      return "#1a9306";
    case "rare":
      return "#fcd00b";
    case "exotic":
      return "#ffa405";
    case "ascended":
      return "#fb3e8d";
    case "legendary":
      return "#4C139D";
    default:
      return "#000000";
  }
}

// Copia chat_link nella clipboard con toast
const copyChatLink = (link: string, toast: ReturnType<typeof useToast>) => {
  navigator.clipboard.writeText(link);
  toast({
    title: "Copied!",
    description: "Chat link copied to clipboard.",
    status: "success",
    duration: 2000,
    isClosable: true,
  });
};

export { rarityColor, copyChatLink };

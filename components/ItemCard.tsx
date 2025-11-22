import { copyChatLink, rarityColor } from "@/app/lib/itemHelper";
import { theme } from "@/app/theme";
import { Item } from "@/models/item";
import {
  Flex,
  Box,
  Button,
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  Image as ChakraImage,
  Text,
  useToast,
  useColorModeValue,
} from "@chakra-ui/react";
import { forwardRef } from "react";

const ItemCard = forwardRef<HTMLDivElement, { data: Item }>(({ data }, ref) => {
  const toast = useToast();
  const bg = useColorModeValue(theme.colors.cardBg.light, theme.colors.cardBg.dark);
  const hoverBg = useColorModeValue(theme.colors.cardHover.light, theme.colors.cardHover.dark);

  return (
    <Flex
      ref={ref}
      key={data.id}
      p={4}
      borderWidth="1px"
      borderRadius="lg"
      bg={bg}
      _hover={{ shadow: "lg" }}
      align="center"
      gap={4}
    >
      {data.icon && (
        <ChakraImage
          borderColor={rarityColor(data?.rarity)}
          borderWidth="2px"
          borderStyle="solid"
          src={data.icon}
          alt={data.name}
          boxSize="48px"
          borderRadius="md"
        />
      )}

      <Box flex="1">
        <Flex justify="space-between" align="flex-start" mb={1}>
          <Box>
            <Text fontWeight="semibold" color={rarityColor(data?.rarity)}>
              {data.name}
            </Text>
            {data.details?.bonuses && (
              <Text as="span" fontSize="xs" color="gray.600">
                ({data.details.bonuses.join(", ")})
              </Text>
            )}
          </Box>

          <Box textAlign="right">
            {
              <Text fontSize="sm" color="gray.500">
                Lvl {data.level ?? "N/A"}
              </Text>
            }
            {data.chat_link && (
              <Button
                mt={1}
                size="xs"
                onClick={() => copyChatLink(data.chat_link, toast)}
              >
                Copy
              </Button>
            )}
          </Box>
        </Flex>

        <Flex gap={2} mt={1}>
          {/* <Tag>{data.type}</Tag>
                      {data.details?.type && <Tag>{data.details.type}</Tag>} */}
          <Breadcrumb fontSize="sm" separator=">">
            <BreadcrumbItem>
              <BreadcrumbLink>{data.type}</BreadcrumbLink>
            </BreadcrumbItem>
            {data.details?.type && (
              <BreadcrumbItem>
                <BreadcrumbLink>{data.details.type}</BreadcrumbLink>
              </BreadcrumbItem>
            )}
          </Breadcrumb>
        </Flex>
      </Box>
    </Flex>
  );
});

ItemCard.displayName = "ItemCard";
export default ItemCard;

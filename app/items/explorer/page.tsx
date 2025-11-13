"use client";

import { useState, useEffect, Suspense } from "react";
import {
  Flex,
  Box,
  Text,
  Image as ChakraImage,
  Spinner,
  VStack,
  Button,
  useToast,
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  Input,
  Select
} from "@chakra-ui/react";

// Funzione per colore rarità GW2
function rarityColor(rarity: string) {
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

export default function ItemsExplorer() {
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState("");
  const [subtype, setSubtype] = useState("");
  const [rarity, setRarity] = useState("");
  const [bonuses, setBonuses] = useState("");
  const [results, setResults] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);

  const toast = useToast();

  // Debounce + fetch API
  useEffect(() => {
    const handler = setTimeout(() => {
      const params = new URLSearchParams();
      if (query) params.append("q", query);
      if (category) params.append("category", category);
      if (subtype) params.append("subtype", subtype);
      if (rarity) params.append("rarity", rarity);
      if (bonuses) params.append("bonuses", bonuses);

      if (params.toString() === "") {
        setResults([]);
        return;
      }

      setLoading(true);
      fetch(`/api/items/search?${params.toString()}`)
        .then((res) => res.json())
        .then(setResults)
        .finally(() => setLoading(false));
    }, 300);

    return () => clearTimeout(handler);
  }, [query, category, subtype, rarity, bonuses]);

  // Copia chat_link nella clipboard con toast
  const handleCopy = (link: string) => {
    navigator.clipboard.writeText(link);
    toast({
      title: "Copied!",
      description: "Chat link copied to clipboard.",
      status: "success",
      duration: 2000,
      isClosable: true,
    });
  };

  return (
    <Box p={6}>
      <Text fontSize="2xl" fontWeight="bold" mb={4}>
        Item Explorer
      </Text>

      {/* Input Fields */}
      <Flex wrap="wrap" gap={4} mb={4}>
        <Box flex="1">
          <Input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Name"
          />
        </Box>
        <Box flex="1">
          <Input
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            placeholder="Category"
          />
        </Box>
        <Box flex="1">
          <Input
            value={subtype}
            onChange={(e) => setSubtype(e.target.value)}
            placeholder="Type"
          />
        </Box>
        <Box flex="1">
          <Select
            value={rarity}
            onChange={(e) => setRarity(e.target.value)}
            placeholder="All Rarities"
          >
            <option value="junk">Junk</option>
            <option value="basic">Basic</option>
            <option value="fine">Fine</option>
            <option value="masterwork">Masterwork</option>
            <option value="rare">Rare</option>
            <option value="exotic">Exotic</option>
            <option value="ascended">Ascended</option>
            <option value="legendary">Legendary</option>
          </Select>
        </Box>

        <Box flex="1">
          <Input
            value={bonuses}
            onChange={(e) => setBonuses(e.target.value)}
            placeholder="Bonuses"
          />
        </Box>
      </Flex>

      {loading && <Spinner />}

      {/* Cards */}
      <Suspense fallback={<Spinner />}>
        <VStack spacing={4} align="stretch">
          {results.map((item) => (
            <Flex
              key={item.data.id}
              p={4}
              borderWidth="1px"
              borderRadius="lg"
              bg="white"
              _hover={{ shadow: "lg" }}
              align="center"
              gap={4}
            >
              {item.data.icon && (
                <ChakraImage
                  src={item.data.icon}
                  alt={item.data.name}
                  boxSize="48px"
                  borderRadius="md"
                />
              )}

              <Box flex="1">
                <Flex justify="space-between" align="flex-start" mb={1}>
                  <Box>
                    <Text fontWeight="semibold" color={rarityColor(item.data?.rarity)}>
                      {item.data.name}
                    </Text>
                    {item.data.details?.bonuses && (
                      <Text as="span" fontSize="xs" color="gray.600">
                        ({item.data.details.bonuses.join(", ")})
                      </Text>
                    )}
                  </Box>

                  <Box textAlign="right">
                    {
                      <Text fontSize="sm" color="gray.500">
                        Lvl {item.data.level ?? "N/A"}
                      </Text>
                    }
                    {item.data.chat_link && (
                      <Button
                        mt={1}
                        size="xs"
                        onClick={() => handleCopy(item.data.chat_link)}
                      >
                        Copy
                      </Button>
                    )}
                  </Box>
                </Flex>

                <Flex gap={2} mt={1}>
                  {/* <Tag>{item.data.type}</Tag>
                  {item.data.details?.type && <Tag>{item.data.details.type}</Tag>} */}
                  <Breadcrumb fontSize="sm" separator=">">
                    <BreadcrumbItem>
                      <BreadcrumbLink>{item.data.type}</BreadcrumbLink>
                    </BreadcrumbItem>
                    {item.data.details?.type && (
                      <BreadcrumbItem>
                        <BreadcrumbLink>{item.data.details.type}</BreadcrumbLink>
                      </BreadcrumbItem>
                    )}
                  </Breadcrumb>
                </Flex>
              </Box>
            </Flex>
          ))}
        </VStack>
      </Suspense>
    </Box>
  );
}

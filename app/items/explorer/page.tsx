"use client";

import { useState, useEffect, Suspense } from "react";
import { Flex, Box, Text, Tag, Image as ChakraImage, Spinner, VStack } from "@chakra-ui/react";

// Funzione helper per colore della rarità
function rarityColor(rarity: string) {
  switch (rarity.toLowerCase()) {
    case "junk": return "#AAAAAA";        // grigio chiaro
    case "basic": return "#000000";       // nero
    case "fine": return "#62A4DA";        // blu chiaro
    case "masterwork": return "#1a9306";  // verde
    case "rare": return "#fcd00b";        // giallo
    case "exotic": return "#ffa405";      // arancione
    case "ascended": return "#fb3e8d";    // rosa/fucsia
    case "legendary": return "#4C139D";   // viola scuro
    default: return "#000000";            // fallback nero
  }
}

export default function ItemsExplorer() {
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState("");
  const [subtype, setSubtype] = useState("");
  const [rarity, setRarity] = useState("");
  const [results, setResults] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);

  // Debounce e fetch API
  useEffect(() => {
    const handler = setTimeout(() => {
      const params = new URLSearchParams();
      if (query) params.append("q", query);
      if (category) params.append("category", category);
      if (subtype) params.append("subtype", subtype);
      if (rarity) params.append("rarity", rarity);

      if (params.toString() === "") {
        setResults([]);
        return;
      }

      setLoading(true);
      fetch(`/api/items/search?${params.toString()}`)
        .then(res => res.json())
        .then(setResults)
        .finally(() => setLoading(false));
    }, 300); // debounce 300ms

    return () => clearTimeout(handler);
  }, [query, category, subtype, rarity]);

  return (
    <Box p={6}>
      <Text fontSize="2xl" fontWeight="bold" mb={4}>Item Explorer</Text>

      {/* Input Fields */}
      <Flex wrap="wrap" gap={4} mb={4}>
        <Box flex="1">
          <input
            value={query}
            onChange={e => setQuery(e.target.value)}
            placeholder="Name"
            className="border p-2 rounded w-full"
          />
        </Box>
        <Box flex="1">
          <input
            value={category}
            onChange={e => setCategory(e.target.value)}
            placeholder="Category"
            className="border p-2 rounded w-full"
          />
        </Box>
        <Box flex="1">
          <input
            value={subtype}
            onChange={e => setSubtype(e.target.value)}
            placeholder="Type"
            className="border p-2 rounded w-full"
          />
        </Box>
        <Box flex="1">
          <input
            value={rarity}
            onChange={e => setRarity(e.target.value)}
            placeholder="Rarity"
            className="border p-2 rounded w-full"
          />
        </Box>
      </Flex>

      {loading && <Spinner />}

      {/* Cards one per row */}
      <Suspense fallback={<Spinner />}>
        <VStack spacing={4} align="stretch">
          {results.map(item => (
            <Flex
              key={item.id}
              p={4}
              borderWidth="1px"
              borderRadius="lg"
              bg="white"
              _hover={{ shadow: "lg" }}
              align="center"
              gap={4}
            >
              {item.icon && (
                <ChakraImage src={item.icon} alt={item.name} boxSize="48px" borderRadius="md" />
              )}
              <Box flex="1">
                <Flex justify="space-between" align="center">
                  <Text fontWeight="semibold" color={rarityColor(item.rarity)}>{item.name}</Text>
                  {item.level && <Text fontSize="sm" color="gray.500">Lvl {item.level}</Text>}
                </Flex>
                <Flex gap={2} mt={1}>
                  <Tag>{item.type}</Tag>
                  {item.details?.type && <Tag>{item.details.type}</Tag>}
                </Flex>
              </Box>
            </Flex>
          ))}
        </VStack>
      </Suspense>
    </Box>
  );
}

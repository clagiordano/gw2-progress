"use client";

import { useState, useEffect, Suspense } from "react";
import {
  Flex,
  Box,
  Text,
  Spinner,
  VStack,
  Input,
  Select,
} from "@chakra-ui/react";

import ItemPopover from "@/components/ItemPopover";
import ItemCard from "@/components/ItemCard";

export default function ItemsExplorer() {
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState("");
  const [subtype, setSubtype] = useState("");
  const [rarity, setRarity] = useState("");
  const [bonuses, setBonuses] = useState("");
  const [results, setResults] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);

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
    }, 1000);

    return () => clearTimeout(handler);
  }, [query, category, subtype, rarity, bonuses]);


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
             <ItemPopover key={item.data.id} item={item.data}>
                <ItemCard key={item.id} data={item.data} />
              </ItemPopover>
          ))}
        </VStack>
      </Suspense>
    </Box>
  );
}

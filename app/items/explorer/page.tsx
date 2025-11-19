"use client";

import {
  useState,
  useEffect,
  Suspense,
  useMemo,
  useTransition,
  useCallback,
} from "react";
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
import { Item, ItemResult, TypeGroup } from "@/models/item";

export default function ItemsExplorer() {
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState("");
  const [subtype, setSubtype] = useState("");
  const [rarity, setRarity] = useState("");
  const [bonuses, setBonuses] = useState("");
  const [results, setResults] = useState<ItemResult[]>([]);

  const [loading, setLoading] = useState(false);

  const [categories, setCategories] = useState<string[]>([]);
  const [statsData, setStatsData] = useState<TypeGroup[]>([]);
  const [isPending, startTransition] = useTransition();

  const subtypes = useMemo(() => {
    if (!category) return [];
    const catData = statsData.find((t) => t.type === category);
    return (
      catData?.subtypes
        ?.filter((s: any) => s.subtype)
        .map((s: any) => s.subtype) || []
    );
  }, [category, statsData]);

  const fetchResults = useCallback(async () => {
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
    try {
      const res = await fetch(`/api/items/search?${params.toString()}`);
      const data = await res.json();
      setResults(data);
    } finally {
      setLoading(false);
    }
  }, [query, category, subtype, rarity, bonuses]);
  // Fetch categories and store stats
  useEffect(() => {
    fetch("/api/items/stats")
      .then((res) => res.json())
      .then((data: TypeGroup[]) => {
        setStatsData(data); // <-- save the entire object
        const cats = data.map((t) => t.type);
        setCategories(cats);
      });
  }, []);

  useEffect(() => {
    startTransition(() => setSubtype(""));
  }, [category]);

  // Debounce + fetch API
  useEffect(() => {
    const handler = setTimeout(() => {
      fetchResults();
    }, 1000);

    return () => clearTimeout(handler);
  }, [fetchResults]);

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

        {/* Category Dropdown */}
        <Box flex="1">
          <Select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            placeholder="All Categories"
          >
            {categories.map((c) => (
              <option key={c} value={c}>
                {c}
              </option>
            ))}
          </Select>
        </Box>

        {category && (
          <Box flex="1">
            <Select
              value={subtype}
              onChange={(e) => setSubtype(e.target.value)}
              placeholder="All Subtypes"
              isDisabled={subtypes.length === 0}
            >
              {subtypes &&
                subtypes.map((s: string) => (
                  <option key={s} value={s}>
                    {s}
                  </option>
                ))}
            </Select>
          </Box>
        )}

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
              <ItemCard data={item.data} />
            </ItemPopover>
          ))}
        </VStack>
      </Suspense>
    </Box>
  );
}

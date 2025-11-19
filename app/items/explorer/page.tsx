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
import { ItemResult, TypeGroup } from "@/models/item";

export default function ItemsExplorer() {
  const [query, setQuery] = useState("");
  const [bonuses, setBonuses] = useState("");

  const [debouncedQuery, setDebouncedQuery] = useState(query);
  const [debouncedBonuses, setDebouncedBonuses] = useState(bonuses);

  const [category, setCategory] = useState("");
  const [subtype, setSubtype] = useState("");
  const [rarity, setRarity] = useState("");

  const [results, setResults] = useState<ItemResult[]>([]);
  const [loading, setLoading] = useState(false);

  const [categories, setCategories] = useState<string[]>([]);
  const [statsData, setStatsData] = useState<TypeGroup[]>([]);
  const [isPending, startTransition] = useTransition();

  const subtypes = useMemo(() => {
    if (!category) return [];
    const catData = statsData.find((t) => t.type === category);
    return (
      catData?.subtypes?.filter((s: any) => s.subtype).map((s: any) => s.subtype) || []
    );
  }, [category, statsData]);

  // Debounce query
  useEffect(() => {
    const handler = setTimeout(() => setDebouncedQuery(query), 1000);
    return () => clearTimeout(handler);
  }, [query]);

  useEffect(() => {
    const handler = setTimeout(() => setDebouncedBonuses(bonuses), 1000);
    return () => clearTimeout(handler);
  }, [bonuses]);

  // Fetch categories and stats
  useEffect(() => {
    fetch("/api/items/stats")
      .then((res) => res.json())
      .then((data: TypeGroup[]) => {
        setStatsData(data);
        setCategories(data.map((t) => t.type));
      });
  }, []);

  // Reset subtype when category changes
  useEffect(() => {
    startTransition(() => setSubtype(""));
  }, [category]);

  // Fetch results
  const fetchResults = useCallback(async () => {
    const params = new URLSearchParams();
    if (debouncedQuery) params.append("q", debouncedQuery);
    if (category) params.append("category", category);
    if (subtype) params.append("subtype", subtype);
    if (rarity) params.append("rarity", rarity);
    if (debouncedBonuses) params.append("bonuses", debouncedBonuses);

    if (params.toString() === "") {
      setResults([]);
      return;
    }

    setLoading(true);
    try {
      const res = await fetch(`/api/items/search?${params.toString()}`);
      const data = await res.json();
      setResults(data);
    } catch (err) {
      console.error(err);
      setResults([]);
    } finally {
      setLoading(false);
    }
  }, [debouncedQuery, debouncedBonuses, category, subtype, rarity]);

  // Trigger fetch on debounced text inputs or immediate dropdowns
  useEffect(() => {
    fetchResults();
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

        <Box flex="1">
          <Select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            placeholder="All Categories"
          >
            {categories.map((c) => (
              <option key={c} value={c}>{c}</option>
            ))}
          </Select>
        </Box>

        {category && (
          <Box flex="1">
            {isPending && <Spinner size="sm" />}
            <Select
              value={subtype}
              onChange={(e) => setSubtype(e.target.value)}
              placeholder="All Subtypes"
              isDisabled={subtypes.length === 0}
            >
              {subtypes.map((s) => (
                <option key={s} value={s}>{s}</option>
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

      {(loading || isPending) && <Spinner />}

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

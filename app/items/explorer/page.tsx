"use client";

import { useState, useEffect } from "react";

export default function ItemsExplorer() {
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState("");
  const [subtype, setSubtype] = useState("");
  const [rarity, setRarity] = useState("");
  const [bonus, setBonus] = useState("");
  const [results, setResults] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const handler = setTimeout(() => {
      const params = new URLSearchParams();
      if (query) params.append("q", query);
      if (category) params.append("category", category);
      if (subtype) params.append("subtype", subtype);
      if (rarity) params.append("rarity", rarity);
      if (bonus) params.append("bonus", bonus);

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

    return () => clearTimeout(handler); // cancella il timeout se uno stato cambia prima
  }, [query, category, subtype,rarity, bonus]);

  return (
    <div className="p-6 space-y-4">
      <h1 className="text-2xl font-bold">Item Explorer</h1>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <input
          value={query}
          onChange={e => setQuery(e.target.value)}
          placeholder="Name"
          className="border p-2 rounded"
        />
        <input
          value={category}
          onChange={e => setCategory(e.target.value)}
          placeholder="Item Category"
          className="border p-2 rounded"
        />

        <input
          value={subtype}
          onChange={e => setSubtype(e.target.value)}
          placeholder="Item Type"
          className="border p-2 rounded"
        />
        <input
          value={rarity}
          onChange={e => setRarity(e.target.value)}
          placeholder="Rarity"
          className="border p-2 rounded"
        />
        {/* <input
          value={bonus}
          onChange={e => setBonus(e.target.value)}
          placeholder="Bonus"
          className="border p-2 rounded"
        /> */}
      </div>

      {loading && <p>Loading...</p>}

      <ul className="space-y-2">
        {results.map(item => (
          <li key={item.id} className="border p-2 rounded bg-gray-50">
            <strong>{item.name}</strong> — {item.type}, {item.rarity}
            <br />
            {/* <small>Bonus: {item.bonuses?.join(", ")}</small> */}
          </li>
        ))}
      </ul>
    </div>
  );
}

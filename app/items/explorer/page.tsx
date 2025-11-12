"use client";

import { useState, useEffect } from "react";

export default function ItemsExplorer() {
  const [query, setQuery] = useState("");
  const [type, setType] = useState("");
  const [rarity, setRarity] = useState("");
  const [bonus, setBonus] = useState("");
  const [results, setResults] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const params = new URLSearchParams();
    if (query) params.append("q", query);
    if (type) params.append("type", type);
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
  }, [query, type, rarity, bonus]);

  return (
    <div className="p-6 space-y-4">
      <h1 className="text-2xl font-bold">Esplora oggetti</h1>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <input
          value={query}
          onChange={e => setQuery(e.target.value)}
          placeholder="Nome"
          className="border p-2 rounded"
        />
        <input
          value={type}
          onChange={e => setType(e.target.value)}
          placeholder="Tipo"
          className="border p-2 rounded"
        />
        <input
          value={rarity}
          onChange={e => setRarity(e.target.value)}
          placeholder="Rarità"
          className="border p-2 rounded"
        />
        <input
          value={bonus}
          onChange={e => setBonus(e.target.value)}
          placeholder="Bonus"
          className="border p-2 rounded"
        />
      </div>

      {loading && <p>Caricamento...</p>}

      <ul className="space-y-2">
        {results.map(item => (
          <li key={item.id} className="border p-2 rounded bg-gray-50">
            <strong>{item.name}</strong> — {item.type}, {item.rarity}
            <br />
            <small>Bonus: {item.bonuses.join(", ")}</small>
          </li>
        ))}
      </ul>
    </div>
  );
}

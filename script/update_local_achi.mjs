const { default: items } = await import('../data/items.json', {
  with: { type: 'json' }
});

const { default: achievements } = await import('../data/achievements.json', {
  with: { type: 'json' }
});


for (const aIdx in achievements) {
    console.log(`Processing achievement group ${aIdx + 1} of ${achievements.length}`);
  for (const cIdx in achievements[aIdx].categories) {
    for (const achiIdx in achievements[aIdx].categories[cIdx].achievements) {
      const achi = achievements[aIdx].categories[cIdx].achievements[achiIdx];
      if (achi.bits) {
        for (const bitIdx in achi.bits) {
          const bit = achi.bits[bitIdx];
          if (bit.type === 'Item') {
            const item = items.find(i => i.id === bit.id);
            if (item) {
              achi.bits[bitIdx]["item"] = item;
            }
          }
        }
      }
    }
  }
}

import fs from 'fs/promises';

await fs.writeFile('data/achievements_detailed.json', JSON.stringify(achievements, null, 2));

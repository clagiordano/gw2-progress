
import fs from 'fs/promises';

const { default: items } = await import('../app/lib/items.json', {
  with: { type: 'json' }
});

const { default: skins } = await import('../app/lib/skins.json', {
  with: { type: 'json' }
});

const { default: achievements } = await import('../app/lib/achievements_detailed.json', {
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

          if (bit.type === 'Skin') {
            const skin = skins.find(i => i.id === bit.id);
            if (skin) {
              achi.bits[bitIdx]["skin"] = skin;
            }
          }
        }
      }

      if (achi.rewards) {
        /**
         * If there are rewards, add item details
         */
        for (const rewIdx in achi.rewards) {
          const reward = achi.rewards[rewIdx];

          if (reward.type === 'Item') {
            const item = items.find(i => i.id === reward.id);
            if (item) {
              achi.rewards[rewIdx]["item"] = item;
            }
          }
        }
      }
    }
  }
}


await fs.writeFile('../app/lib/achievements_detailed.json', JSON.stringify(achievements));
console.log('Updated achievements_detailed.json with item and skin details.');

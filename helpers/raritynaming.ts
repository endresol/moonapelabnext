const petRarityName = [
  "Basic",
  "Common",
  "Uncommon",
  "Rare",
  "Epic",
  "Mythic",
  "Legendary",
  "Artifact",
];
const petMADexchange = [1.0, 1.25, 1.5, 1.75, 2, 2.25, 2.5, 0];

const all_loot_types = [
  3, 1, 0, 1, 1, 2, 0, 0, 1, 1, 0, 1, 2, 2, 0, 2, 0, 0, 2, 2, 1, 0, 0, 0, 2, 0,
  2, 1, 3, 0, 2, 1, 1, 1, 1, 1, 1, 2, 2, 1, 0, 0, 1, 0, 1, 2, 1, 1, 2, 0, 3, 0,
  1, 1, 0, 2, 0, 0, 1, 2, 1, 1, 1, 2, 0, 1, 0, 2, 0, 0, 0, 1, 0, 0, 2, 2, 1, 1,
  2, 0, 1, 2, 1, 2, 2, 1, 0, 1, 0, 0, 2, 2, 0, 0, 0, 1, 2, 0, 2, 1, 3, 0, 1, 1,
  0, 2, 2, 0, 0, 2, 1, 3, 3, 2, 0, 0, 0, 0, 1, 1, 0, 1, 3, 2, 2, 2, 2, 0, 3, 2,
  1, 3, 1, 0, 1, 0, 0, 1, 2, 1, 0, 3, 0, 1, 1, 2, 1, 3, 0, 1, 0, 1, 1, 1, 2, 1,
  3, 3, 2, 1, 0, 0, 0, 0, 3, 2, 1, 1, 2, 1, 0, 2, 2, 0, 1, 0, 0, 2, 1, 0, 1, 1,
  1, 1, 0, 0, 2, 1, 2, 0, 1, 0, 0, 2, 0, 2, 2, 0, 3, 3, 0, 0, 2, 0, 0, 0, 0, 1,
  0, 0, 2, 1, 0, 3, 2, 1, 3, 1, 1, 0, 1, 2, 0, 1, 1, 1, 1, 3, 1, 2, 0, 0, 2, 2,
  3, 0, 1, 2, 2, 2, 0, 1, 0, 0, 0, 0, 3, 0, 0, 1, 0, 0, 2, 1, 1, 1, 1, 2, 2, 0,
  1, 3, 1, 1, 3, 1, 1, 0, 2, 2, 0, 2, 0, 0, 2, 0, 2, 1, 0, 2, 1, 1, 1, 0, 1, 2,
  1, 1, 0, 0, 1, 1, 1, 0, 2, 1, 1, 0, 0, 0, 2, 1, 1, 0, 0, 1, 1, 2, 1, 2, 0, 1,
  0, 1, 3, 2, 0, 2, 1, 3, 1, 2, 2, 1, 0, 3, 0, 0, 1, 0, 1, 1, 1, 0, 0, 0, 0, 0,
  1, 0, 2, 1, 0, 0, 0, 1, 2, 1, 1, 2, 0, 0, 0, 3, 0, 0, 0, 2, 0, 0, 2, 0, 1, 0,
  0, 3, 0, 1, 1, 0, 0, 2, 1, 2, 1, 1, 2, 1, 2, 0, 2, 1, 3, 0, 1, 1, 0, 2, 0, 1,
  2, 0, 0, 1, 1, 1, 0, 0, 2, 1, 0, 0, 1, 3, 2, 2, 1, 3, 2, 0, 2, 0, 0, 2, 3, 3,
  0, 0, 1, 2, 2, 2, 3, 0, 0, 1, 0, 2, 0, 0, 0, 3, 1, 0, 1, 1, 1, 1, 0, 2, 0, 0,
  0, 0, 3, 0, 3, 0, 3, 0, 0, 1, 3, 2, 1, 0, 0, 0, 0, 0, 1, 2, 1, 0, 2, 0, 3, 0,
  1, 0, 0, 3, 0, 0, 1, 0, 1, 0, 0, 0, 1, 2, 2, 0, 0, 1, 0, 2, 0, 1, 0, 0, 1, 1,
  2, 0, 0, 0, 0, 1, 1, 0, 2, 2, 0, 0, 1, 1, 1, 2, 1, 0, 2, 0, 0, 2, 2, 0, 0, 3,
  1, 3, 1, 0, 0, 0, 0, 0, 2, 0, 1, 1, 1, 2, 1, 1, 1, 1, 0, 1, 3, 2, 0, 0, 0, 1,
  2, 1, 2, 1, 1, 0, 3, 0, 2, 0, 0, 0, 3, 1, 0, 0, 0, 1, 1, 0, 0, 3, 2, 1, 0, 0,
  3, 3, 0, 0, 2, 1, 0, 2, 0, 1, 0, 2, 1, 0, 1, 0, 1, 0, 1, 2, 1, 2, 1, 0, 1, 0,
  1, 0, 1, 1, 2, 2, 2, 0, 3, 0, 1, 3, 0, 0, 1, 1, 3, 0, 1, 0, 2, 0, 2, 1, 0, 0,
  0, 2, 0, 1, 0, 0, 2, 0, 1, 3, 1, 0, 1, 1, 1, 3, 1, 0, 0, 3, 0, 1, 1, 0, 1, 3,
  1, 2, 1, 1, 0, 1, 0, 0, 2, 3, 3, 0, 3, 1, 0, 0, 3, 0, 0, 1, 3, 2, 0, 0, 2, 2,
  1, 0, 2, 0, 1, 1, 0, 0, 0, 0, 1, 0, 1, 1, 0, 1, 0, 1, 0, 1, 1, 2, 1, 2, 2, 3,
  1, 1, 2, 0, 0, 0, 3, 0, 1, 1, 0, 3, 0, 1, 3, 0, 0, 2, 3, 0, 1, 0, 1, 0, 0, 3,
  1, 2, 0, 3, 0, 3, 0, 1, 3, 0, 1, 0, 1, 2, 0, 0, 1, 3, 0, 1, 0, 1, 0, 2, 1, 2,
  2, 1, 2, 1, 1, 2, 1, 0, 1, 1, 1, 1, 2, 0, 2, 2, 1, 0, 2, 2, 3, 1, 1, 1, 2, 2,
  2, 2, 2, 2, 3, 1, 1, 0, 1, 3, 0, 0, 3, 0, 0, 1, 0, 3, 2, 0, 0, 0, 1, 0, 0, 0,
  2, 0, 0, 1, 1, 2, 3, 0, 0, 0, 0, 0, 1, 1, 3, 1, 0, 1, 3, 0, 1, 3, 0, 1, 3, 0,
  1, 1, 0, 0, 1, 1, 0, 1, 0, 2, 0, 1, 2, 3, 0, 0, 1, 2, 3, 0, 0, 1, 1, 0, 1, 1,
  0, 0, 1, 3, 1, 1, 2, 0, 3, 2, 2, 0, 2, 1, 0, 2, 1, 1, 1, 1, 0, 3, 2, 0, 1, 0,
  0, 2, 2, 1, 1, 0, 1, 2, 1, 0, 1, 0, 3, 0, 2, 0, 2, 1, 2, 1, 1, 0, 1, 2, 0, 0,
  1, 2, 0, 1, 1, 3, 1, 1, 0, 2, 2, 1, 1, 2, 0, 2, 0, 0, 0, 2, 1, 1, 2, 1, 3, 2,
  0, 1, 2, 1, 2, 1, 0, 2, 1, 2, 1, 1, 2, 1, 1, 3, 0, 0, 2, 2, 1, 3, 1, 3, 3, 0,
  2, 0, 1, 3, 3, 2, 0, 1, 0, 2, 3, 0, 1, 0, 0, 1, 1, 2, 0, 0, 2, 1, 1, 1, 3, 1,
  1, 0, 3, 1, 0, 0, 1, 0, 1, 1, 0, 1, 1, 1, 1, 0, 0, 1, 1, 0, 0, 2, 2, 0, 0, 1,
  0, 0, 1, 1, 0, 0, 3, 1, 2, 0, 3, 0, 1, 2, 3, 1, 2, 1, 0, 1, 1, 1, 1, 0, 0, 2,
  0, 0, 1, 1, 0, 0, 1, 0, 3, 1, 0, 0, 0, 2, 0, 3, 2, 1, 3, 1, 1, 1, 0, 0, 0, 2,
  3, 0, 0, 0, 0, 1, 1, 0, 1, 0, 0, 1, 0, 2, 1, 1, 0, 0, 1, 1, 0, 0, 2, 1, 0, 2,
  0, 3, 2, 0, 2, 0, 0, 0, 0, 1, 1, 1, 1, 0, 0, 3, 1, 0, 0, 0, 0, 0, 1, 0, 1, 3,
  2, 0, 0, 0, 2, 0, 1, 1, 2, 0, 1, 0, 1, 3, 2, 1, 3, 2, 2, 0, 1, 2, 0, 3, 1, 0,
  1, 1, 3, 2, 1, 0, 2, 0, 1, 1, 2, 1, 1, 1, 0, 1, 0, 0, 2, 2, 1, 2, 0, 0, 0, 1,
  2, 0, 1, 2, 0, 0, 1, 0, 1, 2, 0, 1, 1, 2, 1, 0, 0, 1, 2, 1, 0, 3, 0, 2, 2, 0,
  2, 3, 3, 1, 1, 1, 1, 1, 0, 2, 0, 0, 0, 0, 2, 0, 2, 3, 1, 0, 0, 1, 1, 0, 0, 2,
  1, 0, 0, 0, 3, 3, 0, 1, 0, 1, 0, 2, 0, 0, 0, 1, 0, 1, 2, 0, 0, 0, 0, 0, 1, 3,
  1, 2, 1, 0, 0, 2, 0, 1, 0, 1, 0, 1, 0, 0, 2, 0, 0, 0, 0, 2, 3, 2, 0, 0, 3, 1,
  2, 2, 2, 2, 0, 2, 1, 1, 1, 1, 0, 3, 0, 0, 0, 3, 0, 0, 1, 0, 0, 0, 2, 1, 2, 0,
  1, 0, 2, 0, 1, 1, 2, 1, 0, 1, 2, 0, 1, 2, 1, 0, 0, 0, 1, 1, 1, 1, 0, 0, 0, 3,
  1, 1, 1, 0, 1, 2, 1, 0, 0, 3, 3, 0, 1, 2, 0, 1, 1, 0, 2, 2, 0, 3, 2, 0, 2, 1,
  3, 2, 2, 2, 0, 0, 1, 0, 0, 1, 2, 0, 3, 1, 0, 0, 0, 3, 2, 3, 1, 2, 0, 0, 3, 0,
  0, 1, 2, 0, 0, 0, 2, 0, 0, 2, 0, 0, 0, 2, 3, 2, 1, 2, 1, 0, 2, 3, 0, 1, 2, 0,
  1, 1, 2, 2, 1, 0, 1, 2, 0, 2, 2, 1, 2, 2, 0, 2, 1, 0, 3, 2, 2, 2, 1, 2, 0, 0,
  1, 2, 1, 1, 1, 3, 0, 3, 1, 2, 0, 1, 3, 0, 1, 0, 1, 0, 1, 3, 0, 2, 1, 1, 1, 0,
  0, 0, 0, 0, 1, 2, 1, 3, 2, 0, 3, 2, 2, 3, 0, 1, 1, 0, 0, 2, 1, 0, 1, 0, 3, 0,
  0, 3, 0, 0, 0, 2, 0, 1, 0, 0, 2, 1, 0, 2, 1, 0, 0, 3, 1, 0, 2, 0, 3, 0, 0, 0,
  0, 2, 2, 0, 0, 1, 0, 1, 0, 1, 3, 0, 1, 0, 0, 0, 0, 3, 3, 0, 2, 2, 0, 0, 0, 0,
  0, 1, 3, 2, 0, 2, 0, 1, 1, 0, 1, 2, 1, 3, 0, 0, 1, 2, 1, 0, 0, 2, 0, 3, 1, 3,
  0, 1, 0, 3, 1, 0, 0, 0, 3, 2, 0, 0, 0, 0, 1, 0, 1, 3, 1, 2, 3, 3, 0, 0, 2, 3,
  0, 1, 3, 1, 1, 2, 2, 0, 2, 1, 0, 1, 2, 1, 0, 0, 0, 1, 1, 0, 1, 1, 0, 0, 3, 1,
  3, 1, 2, 1, 2, 1, 3, 1, 2, 1, 3, 3, 0, 2, 3, 2, 1, 0, 0, 2, 0, 1, 0, 1, 0, 3,
  1, 1, 0, 0, 0, 2, 0, 0, 2, 0, 0, 1, 1, 1, 1, 2, 0, 1, 0, 2, 0, 0, 1, 2, 0, 0,
  1, 1, 0, 0, 0, 2, 1, 0, 1, 0, 1, 0, 0, 0, 3, 0, 1, 0, 0, 3, 1, 2, 2, 1, 2, 2,
  0, 0, 2, 2, 0, 1, 2, 0, 1, 0, 1, 0, 1, 0, 0, 2, 1, 2, 2, 3, 1, 1, 0, 2, 3, 1,
  0, 0, 2, 0, 0, 2, 1, 2, 1, 2, 0, 1, 1, 2, 1, 0, 0, 1, 0, 0, 0, 0, 1, 2, 1, 3,
  1, 0, 0, 2, 0, 1, 2, 0, 3, 0, 0, 2, 1, 2, 0, 1, 1, 0, 1, 1, 0, 1, 1, 0, 2, 0,
  0, 2, 3, 0, 1, 1, 2, 3, 0, 0, 0, 0, 0, 3, 0, 0, 0, 0, 0, 0, 2, 0, 0, 1, 0, 0,
  0, 0, 0, 0, 0, 1, 2, 0, 0, 1, 0, 1, 2, 2, 3, 0, 0, 3, 0, 0, 1, 2, 0, 0, 0, 0,
  0, 1, 3, 0, 3, 0, 3, 0, 0, 0, 0, 0, 0, 1, 1, 0, 0, 1, 0, 0, 0, 1, 0, 1, 1, 0,
  1, 0, 0, 0, 0, 2, 2, 1, 1, 1, 2, 0, 2, 2, 1, 2, 0, 0, 2, 1, 1, 3, 2, 0, 0, 2,
  2, 0, 1, 1, 0, 1, 3, 3, 2, 2, 1, 1, 0, 3, 1, 1, 0, 1, 0, 3, 1, 1, 1, 1, 0, 0,
  1, 0, 1, 2, 0, 0, 3, 0, 2, 0, 0, 2, 1, 1, 1, 0, 2, 0, 0, 1, 0, 2, 0, 0, 0, 0,
  0, 0, 2, 0, 1, 2, 0, 3, 0, 0, 2, 1, 0, 0, 0, 0, 0, 1, 2, 3, 1, 2, 0, 1, 2, 0,
  1, 1, 3, 3, 1, 2, 2, 3, 1, 0, 0, 0, 2, 0, 1, 0, 0, 0, 2, 0, 0, 3, 1, 0, 2, 1,
  1, 0, 2, 0, 0, 2, 1, 0, 0, 0, 0, 3, 0, 1, 1, 0, 2, 0, 2, 0, 2, 0, 2, 0, 1, 0,
  0, 1, 2, 0, 1, 0, 0, 1, 1, 1, 0, 0, 0, 1, 3, 0, 3, 0, 0, 0, 3, 2, 0, 1, 1, 0,
  1, 0, 2, 0, 0, 0, 2, 0, 0, 1, 0, 0, 0, 1, 1, 3, 3, 1, 2, 1, 1, 2, 0, 1, 0, 0,
  1, 2, 0, 1, 1, 3, 0, 1, 0, 1, 0, 3, 0, 0, 1, 0, 2, 2, 2, 1, 0, 2, 2, 3, 2, 0,
  2, 1, 1, 0, 0, 0, 0, 0, 3, 1, 3, 0, 0, 0, 0, 1, 0, 1, 0, 0, 1, 3, 0, 1, 3, 3,
  0, 3, 0, 0, 3, 0, 1, 0, 1, 1, 1, 0, 1, 3, 0, 0, 2, 2, 1, 2, 2, 0, 0, 2, 0, 1,
  1, 1, 0, 1, 0, 0, 2, 0, 2, 1, 1, 1, 0, 1, 1, 1, 1, 0, 0, 3, 1, 0, 2, 1, 1, 0,
  1, 2, 2, 0, 0, 0, 2, 1, 1, 0, 0, 1, 0, 2, 0, 1, 2, 0, 2, 2, 2, 2, 0, 0, 0, 3,
  0, 1, 0, 0, 0, 2, 0, 2, 0, 2, 2, 2, 2, 3, 2, 1, 2, 1, 1, 0, 1, 2, 0, 2, 1, 0,
  0, 1, 0, 1, 0, 2, 1, 1, 0, 0, 3, 1, 2, 1, 2, 0, 0, 2, 0, 0, 0, 3, 1, 1, 0, 2,
  0, 2, 0, 2, 2, 2, 0, 3, 0, 1, 2, 0, 2, 0, 0, 0, 0, 0, 1, 1, 0, 0, 1, 0, 2, 0,
  3, 0, 1, 1, 2, 0, 1, 2, 3, 0, 0, 3, 0, 0, 2, 1, 1, 0, 3, 0, 1, 1, 2, 2, 3, 1,
  3, 1, 1, 0, 1, 0, 1, 0, 1, 0, 0, 2, 1, 1, 1, 3, 0, 1, 0, 1, 1, 0, 0, 1, 0, 2,
  0, 2, 2, 0, 0, 0, 0, 0, 1, 3, 1, 0, 1, 2, 1, 0, 0, 3, 0, 0, 3, 2, 0, 2, 0, 2,
  0, 1, 1, 2, 0, 0, 3, 0, 1, 0, 2, 0, 2, 0, 0, 0, 1, 1, 0, 2, 1, 2, 0, 0, 0, 0,
  0, 0, 0, 2, 0, 1, 2, 3, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 3, 3, 0,
  0, 0, 0, 3, 2, 0, 1, 2, 1, 0, 0, 1, 3, 1, 0, 1, 1, 3, 0, 1, 0, 0, 0, 2, 1, 0,
  3, 1, 0, 0, 2, 0, 1, 3, 2, 2, 2, 1, 0, 0, 0, 2, 0, 1, 2, 0, 0, 3, 1, 1, 0, 3,
  1, 3, 0, 0, 0, 2, 2, 1, 0, 1, 0, 1, 1, 1, 0, 1, 0, 0, 3, 0, 0, 1, 1, 0, 2, 0,
  1, 2, 3, 2, 0, 1, 2, 1, 1, 2, 0, 0, 1, 0, 3, 2, 0, 0, 1, 1, 2, 2, 1, 1, 0, 3,
  3, 1, 3, 0, 2, 3, 1, 0, 0, 3, 1, 2, 0, 0, 0, 2, 1, 2, 1, 0, 1, 2, 0, 1, 0, 0,
  2, 3, 3, 2, 0, 2, 1, 3, 1, 1, 3, 0, 2, 2, 1, 1, 1, 3, 1, 1, 0, 0, 2, 0, 0, 0,
  1, 0, 1, 0, 0, 0, 3, 0, 1, 2, 0, 0, 1, 0, 2, 0, 0, 2, 2, 0, 3, 1, 2, 1, 2, 1,
  2, 1, 2, 0, 2, 1, 1, 0, 2, 1, 0, 3, 0, 2, 2, 3, 3, 2, 0, 1, 1, 1, 0, 1, 0, 0,
  1, 1, 0, 0, 3, 1, 2, 1, 2, 3, 0, 1, 2, 2, 3, 0, 1, 0, 2, 0, 0, 0, 0, 3, 1, 0,
  0, 1, 1, 0, 0, 1, 3, 3, 0, 0, 2, 1, 3, 1, 0, 2, 0, 1, 2, 0, 1, 1, 0, 1, 2, 0,
  2, 0, 0, 1, 1, 3, 2, 2, 1, 2, 1, 2, 3, 2, 2, 3, 1, 2, 1, 0, 1, 0, 0, 1, 0, 0,
  1, 1, 3, 3, 0, 3, 1, 0, 0, 2, 0, 0, 0, 1, 1, 2, 1, 2, 3, 0, 1, 0, 2, 1, 0, 2,
  1, 1, 2, 0, 0, 3, 0, 1, 0, 0, 0, 1, 0, 2, 0, 2, 0, 0, 0, 1, 2, 1, 0, 0, 1, 2,
  1, 0, 1, 2, 1, 1, 3, 3, 1, 1, 1, 1, 0, 0, 0, 0, 0, 2, 1, 0, 2, 1, 0, 1, 2, 0,
  1, 1, 1, 2, 0, 2, 1, 1, 0, 2, 0, 1, 0, 0, 1, 3, 3, 1, 3, 0, 0, 0, 0, 1, 1, 2,
  1, 0, 0, 3, 0, 0, 1, 3, 0, 1, 1, 0, 2, 1, 0, 3, 1, 3, 0, 0, 2, 0, 2, 0, 0, 1,
  1, 2, 0, 0, 1, 0, 2, 2, 1, 2, 0, 1, 0, 1, 1, 0, 1, 0, 1, 1, 1, 2, 0, 0, 0, 0,
  1, 1, 2, 0, 2, 0, 0, 0, 2, 2, 3, 3, 3, 0, 1, 0, 0, 2, 2, 0, 3, 1, 0, 1, 2, 2,
  0, 3, 2, 3, 1, 1, 0, 2, 1, 0, 3, 2, 3, 0, 2, 0, 2, 0, 3, 2, 0, 2, 0, 0, 2, 0,
  0, 0, 1, 0, 1, 1, 0, 1, 2, 3, 3, 0, 0, 0, 0, 3, 2, 1, 2, 0, 2, 2, 2, 0, 2, 0,
  1, 0, 1, 2, 3, 0, 1, 0, 0, 0, 3, 1, 0, 0, 0, 0, 1, 1, 3, 1, 0, 2, 1, 0, 0, 3,
  0, 0, 1, 1, 1, 1, 0, 0, 0, 1, 0, 2, 0, 1, 0, 0, 1, 0, 2, 0, 0, 0, 0, 1, 2, 0,
  3, 1, 0, 0, 2, 1, 0, 0, 2, 0, 1, 2, 3, 1, 2, 2, 3, 1, 2, 0, 3, 1, 2, 0, 1, 1,
  0, 3, 1, 2, 2, 2, 2, 2, 3, 0, 2, 1, 2, 0, 0, 0, 1, 1, 0, 1, 1, 0, 2, 1, 0, 0,
  2, 1, 0, 2, 2, 0, 0, 0, 1, 2, 2, 2, 1, 0, 0, 2, 1, 0, 2, 0, 1, 0, 1, 0, 0, 2,
  1, 0, 1, 1, 2, 0, 1, 3, 1, 2, 1, 0, 2, 0, 0, 2, 1, 1, 0, 1, 2, 0, 1, 0, 1, 0,
  0, 0, 2, 2, 1, 1, 0, 0, 2, 0, 2, 0, 1, 1, 3, 1, 0, 0, 1, 0, 1, 0, 3, 3, 0, 1,
  1, 0, 0, 2, 2, 1, 0, 2, 0, 0, 0, 3, 1, 2, 0, 0, 2, 0, 0, 1, 2, 0, 0, 1, 0, 3,
  1, 0, 0, 0, 0, 2, 2, 0, 3, 0, 1, 0, 1, 1, 2, 2, 2, 0, 1, 3, 0, 0, 0, 0, 0, 1,
  3, 0, 0, 0, 0, 2, 1, 0, 0, 2, 0, 0, 1, 2, 2, 0, 0, 0, 0, 0, 0, 1, 0, 2, 0, 2,
  0, 0, 2, 3, 0, 2, 2, 2, 1, 0, 0, 3, 0, 3, 0, 2, 3, 0, 2, 1, 2, 1, 0, 2, 0, 1,
  0, 1, 1, 2, 1, 3, 0, 2, 2, 0, 2, 2, 3, 3, 0, 0, 2, 1, 3, 0, 3, 2, 0, 1, 0, 3,
  2, 1, 1, 3, 2, 0, 0, 3, 0, 1, 2, 2, 1, 0, 0, 1, 1, 1, 1, 1, 2, 1, 0, 0, 2, 2,
  1, 0, 1, 1, 1, 3, 0, 0, 3, 0, 0, 2, 1, 1, 0, 0, 1, 2, 1, 2, 0, 2, 0, 1, 1, 0,
  0, 1, 1, 0, 3, 1, 1, 3, 0, 1, 2, 3, 2, 1, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 2,
  0, 1, 1, 1, 0, 0, 2, 0, 0, 1, 1, 3, 1, 0, 1, 0, 0, 0, 1, 3, 0, 0, 0, 1, 1, 0,
  1, 2, 0, 2, 1, 3, 2, 0, 1, 3, 0, 0, 0, 0, 0, 1, 0, 0, 2, 2, 2, 2, 2, 1, 0, 3,
  3, 0, 2, 1, 0, 2, 2, 1, 2, 1, 2, 0, 0, 1, 3, 0, 0, 0, 0, 1, 2, 2, 3, 0, 2, 2,
  1, 3, 2, 1, 0, 3, 1, 0, 2, 0, 1, 1, 0, 2, 1, 0, 1, 1, 2, 0, 1, 3, 0, 1, 0, 0,
  2, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 1, 0, 0, 0, 0, 3, 2, 2, 3, 2, 2, 0,
  1, 3, 2, 0, 2, 0, 1, 2, 1, 0, 0, 2, 1, 1, 1, 0, 0, 3, 3, 0, 1, 0, 0, 0, 1, 0,
  0, 0, 2, 3, 3, 1, 1, 1, 0, 1, 0, 0, 0, 1, 3, 1, 0, 2, 1, 2, 3, 2, 0, 2, 0, 2,
  2, 0, 1, 1, 3, 2, 0, 1, 0, 0, 1, 1, 2, 2, 2, 2, 0, 2, 1, 1, 0, 3, 2, 0, 2, 1,
  0, 0, 1, 0, 0, 0, 0, 0, 1, 0, 1, 0, 1, 2, 0, 3, 1, 0, 0, 0, 1, 1, 1, 1, 1, 1,
  1, 2, 0, 1, 0, 3, 1, 2, 0, 2, 1, 2, 0, 0, 2, 1, 0, 0, 2, 0, 1, 0, 1, 1, 0, 0,
  1, 1, 0, 1, 0, 1, 2, 1, 1, 0, 0, 1, 0, 0, 1, 1, 0, 0, 1, 0, 0, 2, 0, 0, 1, 3,
  3, 0, 1, 2, 0, 2, 2, 1, 2, 1, 1, 0, 0, 0, 0, 1, 2, 2, 0, 0, 1, 2, 0, 0, 2, 1,
  1, 2, 0, 0, 2, 0, 1, 0, 0, 0, 1, 1, 1, 0, 0, 2, 1, 1, 1, 3, 1, 0, 1, 1, 2, 0,
  3, 2, 3, 0, 0, 1, 0, 3, 3, 1, 0, 1, 2, 2, 0, 0, 0, 0, 1, 0, 0, 1, 0, 2, 1, 0,
  2, 2, 2, 0, 0, 0, 3, 0, 2, 0, 2, 3, 2, 1, 2, 1, 1, 3, 2, 2, 1, 3, 1, 3, 1, 1,
  0, 0, 2, 0, 2, 1, 1, 3, 2, 0, 3, 0, 0, 2, 2, 0, 1, 0, 1, 0, 0, 1, 3, 0, 2, 2,
  0, 1, 2, 2, 1, 2, 1, 1, 0, 0, 0, 2, 2, 3, 0, 1, 1, 3, 3, 1, 2, 0, 3, 1, 1, 2,
  1, 1, 1, 1, 0, 0, 0, 3, 1, 2, 0, 0, 3, 1, 3, 0, 1, 0, 0, 0, 0, 3, 0, 1, 2, 3,
  2, 0, 1, 0, 1, 2, 1, 3, 2, 3, 0, 2, 1, 0, 0, 2, 2, 2, 2, 1, 1, 3, 1, 0, 0, 3,
  0, 1, 0, 1, 2, 0, 2, 1, 1, 0, 2, 0, 0, 0, 0, 2, 2, 0, 0, 1, 0, 0, 3, 1, 0, 2,
  0, 1, 1, 0, 0, 3, 0, 0, 0, 1, 0, 1, 0, 1, 2, 1, 1, 3, 1, 2, 2, 1, 0, 2, 2, 0,
  1, 2, 2, 2, 0, 0, 1, 0, 0, 0, 2, 2, 0, 1, 0, 1, 0, 2, 1, 1, 1, 2, 1, 3, 0, 2,
  1, 3, 1, 0, 0, 2, 0, 0, 0, 2, 2, 1, 1, 2, 0, 3, 2, 0, 1, 1, 0, 0, 0, 0, 0, 3,
  1, 3, 0, 2, 1, 3, 1, 0, 1, 0, 1, 0, 0, 1, 0, 0, 0, 0, 1, 0, 1, 1, 0, 1, 2, 0,
  0, 2, 3, 0, 3, 0, 0, 0, 0, 1, 0, 1, 1, 1, 1, 1, 3, 1, 0, 2, 3, 0, 1, 2, 0, 2,
  1, 2, 0, 1, 3, 1, 0, 1, 0, 2, 1, 0, 1, 3, 0, 0, 1, 1, 0, 0, 0, 0, 1, 1, 0, 1,
  1, 0, 0, 0, 2, 1, 3, 2, 1, 0, 1, 2, 1, 2, 2, 2, 0, 0, 1, 2, 0, 0, 1, 3, 2, 2,
  3, 0, 1, 0, 0, 2, 2, 0, 0, 1, 2, 1, 0, 0, 2, 0, 3, 0, 0, 3, 1, 2, 1, 0, 2, 1,
  2, 0, 3, 1, 3, 3, 2, 0, 1, 0, 2, 1, 0, 0, 0, 3, 2, 1, 2, 0, 0, 0, 0, 0, 0, 3,
  0, 0, 0, 0, 0, 1, 0, 1, 0, 1, 1, 2, 0, 2, 0, 1, 1, 1, 1, 1, 3, 3, 3, 1, 0, 1,
  1, 2, 1, 1, 3, 3, 3, 0, 0, 2, 2, 0, 1, 0, 0, 0, 1, 0, 0, 0, 2, 1, 3, 3, 1, 0,
  1, 0, 1, 2, 1, 0, 1, 2, 0, 0, 0, 0, 0, 1, 2, 0, 2, 2, 2, 1, 1, 1, 0, 0, 0, 0,
  0, 2, 1, 1, 1, 1, 1, 0, 3, 1, 1, 0, 1, 2, 1, 1, 1, 2, 1, 1, 0, 0, 3, 0, 1, 0,
  2, 0, 1, 0, 1, 0, 1, 1, 0, 0, 0, 1, 2, 1, 0, 1, 0, 1, 0, 0, 1, 0, 2, 2, 3, 1,
  1, 0, 0, 0, 1, 0, 3, 0, 2, 0, 3, 2, 2, 1, 0, 2, 1, 0, 2, 0, 2, 2, 1, 0, 2, 1,
  1, 1, 2, 1, 2, 3, 0, 1, 3, 0, 3, 0, 3, 1, 0, 3, 0, 0, 0, 2, 0, 0, 1, 3, 0, 3,
  1, 1, 0, 0, 2, 1, 0, 3, 1, 2, 2, 1, 0, 0, 0, 0, 2, 0, 2, 0, 0, 3, 2, 1, 1, 0,
  0, 1, 0, 1, 1, 0, 0, 1, 1, 0, 2, 1, 0, 2, 2, 3, 0, 0, 1, 0, 0, 1, 0, 2, 0, 2,
  2, 0, 1, 2, 0, 0, 0, 2, 1, 0, 2, 0, 1, 1, 1, 1, 0, 2, 2, 0, 1, 2, 0, 2, 0, 0,
  1, 0, 1, 0, 1, 0, 1, 0, 0, 2, 1, 1, 0, 0, 0, 0, 2, 1, 2, 1, 1, 1, 3, 2, 0, 1,
  0, 2, 1, 2, 0, 1, 3, 1, 1, 0, 1, 0, 1, 2, 2, 2, 3, 2, 2, 1, 1, 0, 2, 0, 0, 1,
  3, 3, 0, 0, 1, 0, 0, 0, 0, 1, 2, 0, 1, 2, 1, 2, 2, 3, 2, 1, 2, 1, 2, 0, 1, 0,
  1, 2, 0, 0, 2, 2, 0, 0, 2, 1, 3, 1, 1, 2, 3, 0, 1, 2, 0, 1, 0, 3, 3, 1, 0, 0,
  3, 2, 2, 1, 1, 0, 1, 1, 0, 2, 1, 1, 1, 0, 2, 3, 0, 0, 0, 1, 2, 0, 1, 0, 1, 0,
  2, 0, 2, 1, 0, 1, 0, 2, 2, 3, 1, 0, 2, 0, 2, 0, 0, 1, 0, 0, 0, 1, 2, 1, 1, 0,
  0, 2, 3, 1, 0, 0, 1, 3, 0, 1, 0, 0, 2, 3, 3, 0, 2, 0, 1, 1, 1, 3, 2, 2, 1, 1,
  1, 0, 1, 2, 1, 0, 3, 0, 0, 1, 2, 2, 0, 1, 1, 1, 2, 0, 2, 2, 0, 1, 0, 0, 1, 0,
  3, 0, 1, 0, 1, 0, 0, 2, 0, 1, 1, 2, 1, 3, 1, 0, 0, 1, 0, 1, 0, 0, 0, 0, 2, 0,
  0, 2, 0, 1, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 3, 1, 0, 1, 0, 2, 1, 1, 2, 3, 1, 0,
  3, 3, 2, 1, 0, 3, 0, 3, 0, 2, 1, 0, 0, 0, 2, 2, 0, 1, 1, 0, 0, 1, 3, 0, 3, 0,
  2, 3, 1, 0, 0, 3, 3, 2, 2, 1, 0, 1, 1, 2, 1, 1, 0, 2, 0, 0, 0, 0, 2, 0, 1, 0,
  0, 2, 1, 0, 1, 3, 0, 0, 1, 1, 1, 1, 2, 2, 1, 0, 3, 3, 2, 0, 0, 0, 0, 0, 1, 0,
  0, 2, 0, 0, 1, 0, 2, 0, 0, 2, 2, 3, 2, 0, 1, 0, 2, 3, 2, 0, 2, 1, 1, 2, 0, 3,
  0, 1, 3, 1, 0, 2, 1, 1, 1, 1, 3, 1, 3, 2, 2, 0, 2, 1, 0, 1, 2, 1, 1, 3, 0, 1,
  1, 2, 0, 0, 3, 0, 0, 0, 1, 1, 1, 1, 0, 2, 1, 1, 0, 0, 0, 1, 0, 1, 0, 0, 2, 0,
  2, 0, 0, 0, 0, 2, 1, 2, 1, 0, 1, 2, 1, 0, 0, 2, 1, 0, 0, 0, 2, 1, 2, 2, 1, 1,
  2, 1, 2, 0, 1, 3, 3, 0, 1, 3, 0, 1, 3, 2, 3, 0, 1, 1, 0, 1, 0, 3, 0, 1, 1, 1,
  0, 1, 0, 2, 1, 0, 0, 0, 0, 1, 1, 2, 3, 1, 2, 1, 0, 1, 2, 0, 1, 3, 0, 0, 0, 0,
  0, 2, 0, 0, 2, 0, 2, 0, 1, 2, 2, 2, 2, 0, 0, 0, 0, 0, 2, 0, 1, 1, 1, 3, 1, 0,
  0, 2, 2, 1, 0, 0, 0, 2, 1, 3, 2, 0, 1, 0, 1, 2, 1, 2, 0, 0, 0, 1, 0, 0, 0, 0,
  1, 0, 1, 2, 1, 1, 1, 3, 1, 0, 3, 3, 0, 1, 0, 1, 2, 1, 1, 1, 3, 0, 3, 0, 0, 0,
  1, 1, 0, 1, 2, 1, 2, 3, 3, 1, 2, 0, 3, 1, 3, 3, 2, 1, 2, 1, 1, 0, 3, 2, 1, 0,
  1, 1, 3, 0, 1, 1, 3, 2, 2, 1, 0, 0, 1, 1, 0, 2, 3, 3, 0, 1, 0, 1, 3, 0, 2, 0,
  0, 0, 0, 1, 3, 1, 2, 0, 1, 1, 1, 1, 0, 2, 1, 2, 1, 2, 0, 1, 0, 1, 0, 0, 0, 2,
  2, 2, 0, 0, 0, 0, 0, 1, 0, 3, 1, 1, 0, 0, 1, 0, 2, 0, 1, 0, 0, 0, 1, 3, 0, 0,
  0, 0, 1, 2, 0, 0, 1, 2,
];

const lootRarityName = ["common", "uncommon", "rare", "legendary"];

const lootMADexchange = [1.3, 1.5, 1.7, 1.9];

export function getPetRarityName(index: number): string {
  return petRarityName[index];
}

export function getPetMADexchange(index: number): number {
  return petMADexchange[index];
}

export function getLootType(index: number): number {
  return all_loot_types[index - 1];
}

export function getLootTypeName(type: number): string {
  return lootRarityName[type];
}

export function getLootTypeNameFromIndex(index: number): string {
  if (index < 1 || index >= all_loot_types.length) {
    return "unknown";
  }
  const type = getLootType(index);
  return getLootTypeName(type);
}

export function getLootMADexchangeFromIndex(index: number): number {
  const type = getLootType(index);
  return lootMADexchange[type];
}

export function getMutantMadPrice(index: number): number {
  if (index <= 10000) return 5;
  if (index <= 16000) return 10;
  return 15;
}

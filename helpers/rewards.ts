interface Result {
  reward: number;
};

export function getApeReward (inputType: string): Result | undefined {
  const lookupTable: Record<string, Result> = {
    "Common": { reward: 250 },
    "Uncommon": { reward: 300 },
    "Rare": { reward: 350 },
    "Epic": { reward: 425 },
    "Legendary": { reward: 500 }
  };

  return lookupTable[inputType];
};

export function getLootReward (inputType: string): Result | undefined {
  const lookupTable: Record<string, Result> = {
    "unknown": { reward: 1 }, // "unknown" is the default value
    "common": { reward: 1.2 },
    "uncommon": { reward: 1.5 },
    "rare": { reward: 2 },
    "legendary": { reward: 3 }
  };

  return lookupTable[inputType];
};

export function getBaseApeRewardS1 (inputType: string): Result | undefined {
  const lookupTable: Record<string, Result> = {
    "Common": { reward: 150 },
    "Uncommon": { reward: 180 },
    "Rare": { reward: 210 },
    "Epic": { reward: 240 },
    "Legendary": { reward: 300 }
  };

  return lookupTable[inputType];
};



export function getApeRewardWithLoot (inputApeType: string, inputLootType: string ): Result | undefined {

  console.log("ape", inputApeType, "loot", inputLootType);
  const apeBaseReward = getBaseApeRewardS1(inputApeType);
  console.log("apebase", apeBaseReward);
  console.log("lootbase", getLootReward(inputLootType));
  
  return {
    reward: apeBaseReward.reward * getLootReward(inputLootType).reward
  }
};

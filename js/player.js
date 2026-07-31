// too many functions
// btw hello person!!!! ig you don't do javascript/html/css but it is pretty useful



const player = {
    energy: new Decimal(281.09),
    // hehehe
    dimensions: createAllDimensions(),
    compressedEnergy: new Decimal(0),
    compressedEnergyCost: new Decimal(1e10),
    entropy: new Decimal(1),
    entropyUpgradeCost: E(100),
    entropyUpgradeEffect: E(1),
    entropyUpgradeAmount: E(0),

    matter: E(0),
    rollCoolDownReciprocal: E(100),
    luckMultiplier: E(1),
    bestRoll: E(1),
    luckMultiplierCost: E(0.16666667),

    notation: "Mixed Scientific",
    timePlayed: 0,
    version: 7,

    alpha: new Decimal(1),
    cordleWins: new Decimal(0),


    matterUnlockedBOOL: false
};

const achievements = [
    createAllAchievements()
];


const deltaTime = 0.05;



function produce() {

    player.energy = player.energy.add(
        player.dimensions[0].amount.mul(deltaTime)
    );

    for (let i = 1; i < player.dimensions.length; i++) {
        player.dimensions[i - 1].amount_past = player.dimensions[i - 1].amount
        player.dimensions[i - 1].amount =
            player.dimensions[i - 1].amount.add(
                player.dimensions[i].amount
                .mul(getDimensionMultiplier(i - 1))
                .mul(deltaTime)
            );
    }

    player.alpha = player.alpha.mul(1.001);

    player.timePlayed += deltaTime;
}

function getInfinityProgress() {
    const value = player.energy;
    const target = new Decimal("1.7976931348623157e308");

    if (!value || value.isNan() || value.lte(0)) return 0;

    const ratio = value.log10().div(target.log10()).toNumber();
    return Math.min(1, Math.max(0, ratio));
}

function updateInfinityBar() {
    const fill = document.getElementById("infinityProgressFill");
    const text = document.getElementById("infinityProgressText");

    if (!fill || !text) return;

    const progress = getInfinityProgress();
    const percent = format(E(progress * 100));

    fill.style.width = `${Math.min(100, Math.max(0, progress * 100))}%`;
    text.textContent = `${percent}% to e308`;
}

function updateUI() {
    // Generators
    document.getElementById("energy").textContent = format(player.energy);

    for (let i = 0; i < player.dimensions.length; i++) {
        const dim = player.dimensions[i];

        document.getElementById("amount" + i).textContent =
            "Amount: " + format(dim.amount);

        document.getElementById("cost" + i).textContent =
            "Cost: " + format(dim.cost);

        if (i + 1 < player.dimensions.length) {
        document.getElementById("rate" + i).textContent = 
            `+${format(dim.amount.div(dim.amount_past).pow(20).sub(1).mul(100))}%/s`;
        }
        //document.getElementById("button" + i).title =
            //`Amount: ${format(player.dimensions[i].bought)}\n×${format(getDimensionMultiplier(i))}`

    }

    document.getElementById("entropyConverterButton").textContent = player.energy.gte(1e90) ? `Reset Energy, Dimensions, and Compressed Energy for: ${format(player.entropy.add(player.energy.div(1e90).pow(0.5)))} Entropy.` : "You don't have enough Energy. So sad.";
    document.getElementById("compressedEnergyDisplay").textContent = format(player.compressedEnergy) + " Compressed Energy";
    document.getElementById("entropyDisplay").textContent = format(player.entropy) + " Entropy";


    // Settings

    document.getElementById("totalPlaytime").textContent = "Playtime: " + format(E(player.timePlayed));
    
    // Bonus

    document.getElementById("alphaDisplay").textContent = `You have ${format(player.alpha)} alpha.`
    updateInfinityBar();
}

const DEVELOPER_speedUp = 10

function gameLoop() {

    for (let i=0; i < DEVELOPER_speedUp; i++) {

        produce();

    }

    checkAchievements();
    updateUI();
}

function getDimensionMultiplier(index) {
    const dim = player.dimensions[index];
    let multiplier = new Decimal(1);
    multiplier = multiplier
        .mul(dim.amount.log( E(20).max(E(100).sub(player.compressedEnergy.mul(player.entropy.log(10).max(1)).pow(0.5))) ).pow(new Decimal(Math.floor(dim.bought / 20)))
            .pow(0.3)) // to keep the numbers from flipping exploding during startgame
        .mul(player.compressedEnergy.mul(player.entropy.log(10).max(1)).pow(3.7).max(1))  // Ensure multiplier stays at least 1
        .mul(player.entropyUpgradeEffect);
    return multiplier;
}

function getCostGrowthFactor(index, currentCost) {
    const tierBase = new Decimal((index + 1) * 6);
    const priceScale = currentCost && currentCost.gt(0)
        ? currentCost.log10().div(100).add(1).min(5)
        : new Decimal(1);

    return tierBase.mul(priceScale);
}

function buyDimension(index) {
    const dim = player.dimensions[index];
    if (player.energy.gte(dim.cost)) {
        const factor = getCostGrowthFactor(index, dim.cost);
        player.energy = player.energy.sub(dim.cost);
        dim.bought++;
        dim.amount = dim.amount.add(1);
        dim.cost = dim.cost.mul(factor);
        updateUI();
    }
}

function buyMaxDimension(index) {
    const dim = player.dimensions[index];
    const cost0 = dim.cost;
    const energy = player.energy;

    if (energy.lt(cost0)) return;

    const factor = getCostGrowthFactor(index, cost0);
    const n = energy
        .div(cost0)
        .mul(factor.sub(1))
        .add(1)
        .log(factor)
        .floor()
        .toNumber();

    if (n <= 0) return;

    const totalCost = cost0.mul(
        factor.pow(n).sub(1).div(factor.sub(1))
    );

    player.energy = energy.sub(totalCost);
    dim.bought += n;
    dim.amount = dim.amount.add(n);
    dim.cost = cost0.mul(factor.pow(n));

    updateUI();
}

function maxAllDimensions() {
    for (let i = 0; i < player.dimensions.length; i++) {
        buyMaxDimension(i);
    }
}
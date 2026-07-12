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
    const percent = (progress * 100).toFixed(2);

    fill.style.width = `${Math.min(100, Math.max(0, progress * 100))}%`;
    text.textContent = `${percent}% to e308`;
}

function updateUI() {
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

    updateInfinityBar();
}

const DEVELOPER_speedUp = 1

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
        .mul(dim.amount.log( new Decimal(20).max(new Decimal(100).sub(player.compressedEnergy.pow(0.5))) ).pow(new Decimal(Math.floor(dim.bought / 20)))
            .pow(0.3)) // to keep the numbers from flipping exploding during startgame
        .mul(player.compressedEnergy.pow(3.7));
    return multiplier;
}

function getCostGrowthFactor(index, boughtCount) {
    const tierBase = 2 + index * 0.35;
    const boughtBoost = Math.min(1.2, 0.03 * boughtCount);
    return new Decimal(tierBase + boughtBoost);
}

function getEffectiveBuyMaxFactor(index, boughtCount, purchases) {
    const startFactor = getCostGrowthFactor(index, boughtCount);
    const capFactor = new Decimal(2 + index * 3 + 1.2);

    // Tuning knobs:
    // - rampLength: larger => slower scaling, smaller => faster scaling
    // - curvePower: larger => more aggressive early scaling, smaller => more gradual
    const rampLength = 20;
    const curvePower = 1.2;

    const progress = Math.min(1, Math.max(0, purchases / rampLength));
    const easedProgress = Math.pow(progress, curvePower);

    return startFactor.add(capFactor.sub(startFactor).mul(easedProgress));
}

function buyDimension(index) {
    const dim = player.dimensions[index];
    if (player.energy.gte(dim.cost)) {
        const factor = getCostGrowthFactor(index, dim.bought);
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

    const estimateFactor = getEffectiveBuyMaxFactor(index, dim.bought, 1);
    const n = energy
        .div(cost0)
        .mul(estimateFactor.sub(1))
        .add(1)
        .log(estimateFactor)
        .floor()
        .toNumber();

    if (n <= 0) return;

    const totalCost = cost0.mul(
        estimateFactor.pow(n).sub(1).div(estimateFactor.sub(1))
    );

    player.energy = energy.sub(totalCost);
    dim.bought += n;
    dim.amount = dim.amount.add(n);
    dim.cost = cost0.mul(estimateFactor.pow(n));

    updateUI();
}

function maxAllDimensions() {
    for (let i = 0; i < player.dimensions.length; i++) {
        buyMaxDimension(i);
    }
}

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
}

function gameLoop() {
    produce();
    updateUI();
}

function getDimensionMultiplier(index) {
    const dim = player.dimensions[index];
    let multiplier = new Decimal(1);
    multiplier = multiplier
    .mul(dim.amount.log(10).pow(Math.floor(dim.bought / 20)));
    return multiplier
}

function buyDimension(index) {
    const dim = player.dimensions[index];
    if (player.energy.gte(dim.cost)) {
        player.energy = player.energy.sub(dim.cost);
        dim.bought++;
        dim.amount = dim.amount.add(1);
        dim.cost = dim.cost.mul(5.9);
        updateUI();
    }
}
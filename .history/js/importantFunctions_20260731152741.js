function E(value) {
    return new Decimal(value);
}

function toSuperscript(text) {
    return `<sup>${text}</sup>`
}

function toSubscript(text) {
    return `<sub>${text}</sub>`;
}

function loadHalfActiveItems() {
    document.getElementById("compressEnergyButton").textContent = "Compress your energy and generators for a log boost: " + format(player.compressedEnergyCost) + " Energy";
    document.getElementById("compressBoost").innerHTML = "log"+toSubscript(format(E(20).max(E(100).sub(player.compressedEnergy.pow(0.5)))))+"()";
    document.getElementById("compressEnergyButton").textContent = "Compress your energy and generators for a log boost: " + format(player.compressedEnergyCost) + " Energy";
    document.getElementById("entropyBoost").textContent = format(player.entropy.log(10).max(1));
    document.getElementById("entropyUpgradeButton").textContent = `Upgrade your Dimension gain by x1.1 per Level: ${format(player.entropyUpgradeCost)}`;
    document.getElementById("matterDisplay").textContent = format(player.matter) + " Matter";
    document.getElementById("theInfiniteLuck").textContent = `Multiply Luck by 5: ${format(player.luckMultiplierCost)} Matter`

}


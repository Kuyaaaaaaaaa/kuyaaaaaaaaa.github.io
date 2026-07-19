function save() {
    const saveData = JSON.stringify(player, (key, value) => {
        if (value instanceof Decimal) return value.toString();
        return value;
    });
    localStorage.setItem("genesisAugmentationSave", saveData);
}

function load() {
    const saveData = localStorage.getItem("genesisAugmentationSave");
    if (saveData === null) return;
    let loaded;
    try {
        loaded = JSON.parse(saveData);
    } catch (error) {
        console.warn("Failed to parse save data.", error);
        return;
    }

    if (!loaded || typeof loaded !== "object") return;

        try {
            player.energy = new Decimal(loaded.energy ?? 0);
            player.notation = (loaded.notation && NOTATIONS[loaded.notation]) ? loaded.notation : "Mixed Scientific";
            const notationSelect = document.getElementById("notationSelect");
            if (notationSelect) {
                notationSelect.value = player.notation;
            }
            player.compressedEnergy = new Decimal(loaded.compressedEnergy ?? 0);
            player.compressedEnergyCost = new Decimal(loaded.compressedEnergyCost ?? 1e10);
            player.entropy = new Decimal(loaded.entropy ?? 1);
            player.timePlayed = Number(loaded.timePlayed ?? 0);
            player.version = loaded.version ?? player.version;
            player.alpha = new Decimal(loaded.alpha ?? 1);
            player.entropyUpgradeCost = E(loaded.entropyUpgradeCost ?? 100);
            player.entropyUpgradeEffect = E(loaded.entropyUpgradeEffect ?? 1);

        } catch (error) {
            console.error("Save load failed partway through — falling back to defaults for remaining fields.", error);
        }


    if (Array.isArray(loaded.dimensions)) {
        player.dimensions = createAllDimensions();
        for (let i = 0; i < Math.min(loaded.dimensions.length, player.dimensions.length); i++) {
            const savedDim = loaded.dimensions[i];
            const dim = player.dimensions[i];
            if (!savedDim || typeof savedDim !== "object") continue;

            dim.amount = new Decimal(savedDim.amount ?? 0);
            dim.amount_past = new Decimal(savedDim.amount_past ?? dim.amount ?? 1);
            dim.bought = Number(savedDim.bought ?? 0);
            dim.cost = new Decimal(savedDim.cost ?? dim.baseCost ?? 0);
            dim.multiplier = new Decimal(savedDim.multiplier ?? 1);
        }
    } else {
        player.dimensions = createAllDimensions();
    }

    if (typeof updateUI === "function") {
        updateUI();
    }

    if (typeof playSoundLib === "function" && clickSound) {
        playSoundLib(clickSound);
    }

    // load the prestige buttons like a person would
    document.getElementById("compressEnergyButton").textContent = "Compress your energy and generators for a log boost: " + format(player.compressedEnergyCost) + " Energy";
    document.getElementById("compressBoost").textContent = "log"+format(new Decimal(20).max(new Decimal(100).sub(player.compressedEnergy.pow(0.5))))+"()";
    document.getElementById("compressEnergyButton").textContent = "Compress your energy and generators for a log boost: " + format(player.compressedEnergyCost) + " Energy";
    document.getElementById("entropyBoost").textContent = format(player.entropy.log(10).max(1));


}

function importCode() {
    return btoa(JSON.stringify(player));
}

function exportCode(value) {
    return atob(value);
}

const wipeButton = document.getElementById("wipeButton");
const confirmWipe = document.getElementById("confirmWipe");
const cancelWipe = document.getElementById("cancelWipe");
const wipeConfirm = document.getElementById("wipeConfirm");

if (wipeButton) {
    wipeButton.addEventListener("click", function () {
        if (wipeConfirm) {
            wipeConfirm.style.display = "block";
        }
    });
}

if (confirmWipe) {
    confirmWipe.addEventListener("click", function () {
        localStorage.removeItem("genesisAugmentationSave");
        location.reload();
    });
}

if (cancelWipe) {
    cancelWipe.addEventListener("click", function () {
        if (wipeConfirm) {
            wipeConfirm.style.display = "none";
        }
    });
}


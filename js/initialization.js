const dimensionContainer = document.getElementById("dimensionContainer");
const achievementContainer = document.getElementById("achievementContainer");
const prestigeContainer = document.getElementById("prestigeContainer");

const notationSelect = document.getElementById("notationSelect");

function refNotUpdatedUI() {
    document.getElementById("compressEnergyButton").textContent = "Compress your energy and generators for a log boost: " + format(player.compressedEnergyCost) + " Energy";
    document.getElementById("compressBoost").textContent = "log"+format(new Decimal(20).max(new Decimal(100).sub(player.compressedEnergy.pow(0.5))))+"()";
    document.getElementById("entropyBoost").textContent = format(player.entropy.log(10).max(1));
}

const NOTATIONS = {
    "Mixed Scientific": new MixedScientificNotation(),
    "Shi": new ShiNotation(),
    "Standard": new StandardNotation(),
    "Pickle Dough": new PickleDoughNotation(),
    "Assorted Moans": new AssortedMoansNotation()
};

if (notationSelect) {
    notationSelect.value = player.notation || "Mixed Scientific";
    notationSelect.addEventListener("change", function () {
        player.notation = notationSelect.value;
        save();
        updateUI();
        refNotUpdatedUI();
        updateNewsTicker();
    });
}


function format(decimalValue) {
    return NOTATIONS[player.notation].formatC(decimalValue);
}


function createDimensionRow(index) {
    const row = document.createElement("div");
    row.className = "dimensionRow";

    const name = document.createElement("div");
    name.className = "dimensionName";
    name.textContent = player.dimensions[index].name;

    const rate = document.createElement("div");
    rate.className = "dimensionsName";
    rate.textContent = "";
    rate.id = "rate" + index;


    const amount = document.createElement("div");
    amount.className = "dimensionAmount";
    amount.id = "amount" + index;

    const cost = document.createElement("div");
    cost.className = "dimensionCost";
    cost.id = "cost" + index;

    const button = document.createElement("button");
    button.textContent = "Buy";
    // button.title = `Amount: ${format(player.dimensions[index].bought)}\nMultiplier: ×${format(getDimensionMultiplier(index))}`;
    button.id = "button" + index;

    button.addEventListener("click", function () {
        buyDimension(index);
        clickSound.currentTime = 0;
        clickSound.play();

    });

    button.addEventListener("mouseenter", function () {
    button.title =
        `Bought: ${format(Decimal.fromNumber(player.dimensions[index].bought))}\nMultiplier: ×${format(getDimensionMultiplier(index))}`;
    });

    row.appendChild(name);
    row.appendChild(rate);
    row.appendChild(amount);
    row.appendChild(cost);
    row.appendChild(button);

    dimensionContainer.appendChild(row);
    // i love child
}

for (let i = 0; i < player.dimensions.length; i++) {
    createDimensionRow(i);
    // woah GENESIS WOAH WOAH WOAH GENESISSSSSSIIJ DJFOjsojfpjafsojsifdojifdojifsodp
}

// Initialize the news ticker with a random message
const ticker = document.getElementById("news-text");

function showRandomTickerMessage() {
    const messages = Array.isArray(newsmessages) && newsmessages.length > 0
        ? newsmessages
        : ["Welcome to Genesis Augmentations!"];
    const message = messages[Math.floor(Math.random() * messages.length)];
    if (ticker) {
        ticker.textContent = message;
    }

    // Reset the animation
    /*ticker.style.animation = "none";
    void ticker.offsetWidth;
    ticker.style.animation = "ticker 30s linear infinite";*/
}

ticker.addEventListener("animationiteration", () => {
    showRandomTickerMessage();
});

function createAchievementRow(achievement) {
    const row = document.createElement("div");
    row.className = "achievementRow";

    const name = document.createElement("div");
    name.className = "achievementName";
    name.textContent = achievement.name;

    const description = document.createElement("div");
    description.className = "achievementDescription";
    description.textContent = achievement.description;

    const unlocked = document.createElement("div");
    unlocked.className = "achievementUnlocked";
    unlocked.id = "unlockedSign" + achievement.id
    unlocked.textContent = "✘"

    row.appendChild(name);
    row.appendChild(description);
    row.appendChild(unlocked);

    achievementContainer.appendChild(row);
}

for (let i = 0; i < achievements[0].length; i++) {
    createAchievementRow(achievements[0][i]);
}

document.getElementById("compressEnergyButton").addEventListener("click", function () {
    if (player.energy.gte(player.compressedEnergyCost)) {
        player.compressedEnergy = player.compressedEnergy.add(1);
        player.energy = new Decimal(0);
        player.compressedEnergyCost = player.compressedEnergyCost.mul(2.2142e2);
        document.getElementById("compressEnergyButton").textContent = "Compress your energy and generators for a log boost: " + format(player.compressedEnergyCost) + " Energy";

        for (let i = 0; i < player.dimensions.length - 1; i++) {
            player.dimensions[i].amount = new Decimal(10);
        };

        document.getElementById("compressBoost").textContent = "log"+format(E(20).max(E(100).sub(player.compressedEnergy.pow(0.5))))+"()";
    };
});

document.getElementById("entropyConverterButton").addEventListener("click", function () {
    if (player.energy.gte(1e90)) {
        player.entropy = player.entropy.add(player.energy.div(1e90).pow(0.5));
        player.compressedEnergy = new Decimal(0);
        player.compressedEnergyCost = new Decimal(1e10);
        player.dimensions = createAllDimensions();

        document.getElementById("entropyBoost").textContent = format(player.entropy.log(10).max(1));
        document.getElementById("compressBoost").textContent = "log"+format(E(20).max(E(100).sub(player.compressedEnergy.pow(0.5))))+"()";
        document.getElementById("compressEnergyButton").textContent = "Compress your energy and generators for a log boost: " + format(player.compressedEnergyCost) + " Energy";
        player.energy = new Decimal(280.9);
        updateUI();
    };
});

load();

newsmessages = fetchNews();
console.log(newsmessages);

setInterval(save, 10000);
setInterval(gameLoop,50)

openAPoopyTab("dimensions");


function playSoundLib(sound) {
  sound.currentTime = 0;
  sound.play();
}


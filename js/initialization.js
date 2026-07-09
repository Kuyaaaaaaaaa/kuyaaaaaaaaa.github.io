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
        `Multiplier: ×${format(Decimal.fromNumber(player.dimensions[index].bought))}\nBought:${format(getDimensionMultiplier(index))}`;
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

const ticker = document.getElementById("news-text");

ticker.addEventListener("animationiteration", () => {
  /*const charsPerSecond = 3;

  let seconds =
    ticker.textContent.length / charsPerSecond;

  ticker.style.animationDuration = `${seconds}s`;
  */

  ticker.textContent =
  newsmessages[Math.floor(Math.random() * newsmessages.length)];

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

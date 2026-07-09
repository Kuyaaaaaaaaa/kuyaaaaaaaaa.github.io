function save() {
    const saveData = JSON.stringify(player);
    localStorage.setItem("genesisAugmentationSave", saveData);
}

function load() {
    const saveData = localStorage.getItem("genesisAugmentationSave");
    if (saveData === null) return;
    const loaded = JSON.parse(saveData);
    player.energy = new Decimal(loaded.energy);
    player.notation = loaded.notation;
    for (let i = 0; i < player.dimensions.length; i++) {
    player.dimensions[i].amount =
        new Decimal(loaded.dimensions[i].amount);

    player.dimensions[i].cost =
        new Decimal(loaded.dimensions[i].cost);

    player.dimensions[i].bought =
        loaded.dimensions[i].bought;
    }
    playSoundLib(clickSound)
}

/*function wipeSave() {
    const wipers = document.querySelectorAll("wipeConfirm");
    wipers.style.display = "block";
    
}*/

wipeButton.addEventListener("click", function () {
    document.getElementById("wipeConfirm").style.display = "block";
});

confirmWipe.addEventListener("click", function () {
    localStorage.removeItem("genesisAugmentationSave");
    location.reload();
});

cancelWipe.addEventListener("click", function (){
    document.getElementById("wipeConfirm").style.display = "none";
});

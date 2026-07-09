function ordinal(number) {
    if (number % 10 > 3 || Math.floor(number/10) === 1) {
        return number + "th";
    };
    if (number % 10 === 1) {
        return number + "st";
    };
    if (number % 10 === 2) {
        return number + "nd";
    };
    if (number % 10 === 3) {
        return number + "rd";
    };
    return number + "th";
    
}

function createAllDimensions() {
    const dimensions = [];
    
    for (let i = 0; i < 12; i++) {
        dimensions.push(
            createDimension(
                ordinal(i + 1) + " Generator",
                Decimal.pow(11,i+1)
            )
        );
    }
    return dimensions;
}

function createDimension(name, baseCost) {
    return {
        name: name,
        amount: new Decimal(0),
        amount_past: new Decimal(1),
        bought: 0,
        multiplier: new Decimal(1),
        baseCost: new Decimal(baseCost),
        cost: new Decimal(baseCost)
    };
}

const clickSound = new Audio("assets/audio/clickSound.wav");

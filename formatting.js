function integerSlog(x) {

    let y = x;
    let extra = 0;

    while (y.gte(10) || extra < 1) {
        y = y.log10();
        extra++;
    }

    return extra;

}

function testFunction() {
    return this.mul(2)
}

function format(value) {

    if ( value.isNan() || value == "null") {
        value = new Decimal(0);
        //what the actual barnicles
    }

    if ( player.notation === "Mixed Scientific" ) {

        let firstTen = ["K","M","B","T","Qa","Qi","Sx","Sp","Oc","No","De"];

        if (!value) return "0";

        value = new Decimal(value);

        if (value.lt(1000)) {
            return value.toString().substring(0,5);
        }

        if (value.lt(1e36)) {
            return value.div(value.log10().div(3).floor().mul(3).pow_base(10))
            .toFixed(2) + firstTen[value.log10().div(3).sub(1).floor().toNumber()]
        }

        return value.toExponential(2);

    }

    if ( player.notation === "Shi" ) {
        // extended :3
        const SHI = "世使侍勢十史嗜士始室實屍市恃拭拾施是時氏濕獅矢石視試詩誓識逝適釋食";
        const SHISquared = "〇一二三四五六七八九";
        let result = "";


        if (integerSlog(value) >= 3) {
            
            let layer = integerSlog(value);
            
            layer = (layer % 2) + 1;

            newValueLayer = integerSlog(value);

            newValue = value;

            for (let i = 0; newValueLayer > layer + i; i++) {
                newValue = newValue.log10();
            }
            
            result += SHISquared[Math.ceil((integerSlog(value) - 4) / 2)];

        } else {

            newValue = value;

        }


        const scaled = newValue.add(1).log10().mul(1000).pow(0.11680876460599135674);

        for (let i=0; i < 4; i++) {
            const index = Decimal.fromNumber(i).pow_base(33).mul(scaled).floor().mod(33);
            result += SHI[index.floor().toNumber()];
        }

        return result;

    }
}

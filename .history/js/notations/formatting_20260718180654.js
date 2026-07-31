function integerSlog(x) {

    let y = x;
    let extra = 0;
    let tolerance = 10;

    while (y.gte(10) || extra < 1) {
        y = y.log10();
        extra++;
    }

    return extra;

}

function testFunction() {
    return this.mul(2)
}


console.log("dih")

class Notation {

    formatC(decimalValue) {
                
        if (typeof decimalValue === 'number') {
            return this.formatValue(fromDecimal(decimalValue));
        }

        if (this.isInvalid(decimalValue)) {
            return this.onInvalid(decimalValue);
        }

        if (!(decimalValue instanceof Decimal)) {
            console.warn(`format() called with a non-Decimal value:`, decimalValue);
            decimalValue = new Decimal(decimalValue);
        }

        return this.formatValue(decimalValue);
    }

    isInvalid(decimalValue) {
        if (decimalValue === undefined || decimalValue === null) return true;
        if (typeof decimalValue === "number" && Number.isNaN(decimalValue)) return true;
        // break_eternity Decimals: check .mantissa, since NaN mantissa means NaN decimal
        if (decimalValue && typeof decimalValue.mantissa === "number" && Number.isNaN(decimalValue.mantissa)) return true;
        return false;
    }

    onInvalid(decimalValue) {
        return "0";
    }

    getSB3Layer(decimalValue) {
        let exponent = E(decimalValue.exponent);
        let mantissa = E(decimalValue.mantissa);
        let layer = E(decimalValue.layer);
        let innermost = exponent.pow_base(10).mul(mantissa);

        if (innermost.gte(E("e10"))) {
            innermost = innermost.log10();
            layer = layer.add(1);
        }

        return layer.add(innermost.log10().log10());

    }

    integerSlog(x) {
    let y = x;
    let extra = 0;
    let tolerance = 10;

    while (y.gte(10) || extra < 1) {
        y = y.log10();
        extra++;
    }

    return extra;
    }

    formatValue(decimalValue) {
        throw new Error(`format() is not implemented for ${this.constructor.name}`
        )
    }

}

class MixedScientificNotation extends Notation {
    
    formatValue(decimalValue) {
        let firstTen = ["K","M","B","T","Qa","Qi","Sx","Sp","Oc","No","De"];

        if (decimalValue.lt(1000)) {
            return decimalValue.toString().substring(0,5);
        }

        if (decimalValue.lt(1e36)) {
            return decimalValue.div(decimalValue.log10().div(3).floor().mul(3).pow_base(10))
            .toFixed(2) + firstTen[decimalValue.log10().div(3).sub(1).floor().toNumber()];
        }

        return decimalValue.toExponential(2);
    }
}

class ShiNotation extends Notation {

    formatValue(decimalValue) {
        const SHI = "世使侍勢十史嗜士始室實屍市恃拭拾施是時氏濕獅矢石視試詩誓識逝適釋食";
        const SHISquared = "〇一二三四五六七八九";
        let result = "";


        /*if (integerSlog(decimalValue) >= 3) {
            
            let layer = integerSlog(decimalValue);
            
            layer = (layer % 2) + 1;

            newValueLayer = integerSlog(decimalValue);

            newValue = decimalValue;

            for (let i = 0; newValueLayer > layer + i || i > 16; i++) {
                newValue = newValue.log10();
            }
            
            result += SHISquared[Math.ceil((integerSlog(decimalValue) - 4) / 2)];

        } else {

            newValue = decimalValue;

        }*/

        let newValue = decimalValue;


        const scaled = newValue.add(1).log10().mul(1000).pow(0.11680876460599135674);

        for (let i=0; i < 4; i++) {
            const index = Decimal.fromNumber(i).pow_base(33).mul(scaled).floor().mod(33);
            result += SHI[index.floor().toNumber()];
        }

        return result;
    }
}

class StandardNotation extends Notation {
    formatValue(decimalValue) {
        let firstTen = ["K","M","B","T","Qa","Qi","Sx","Sp","Oc","No","De"];
        let firstLayer = ["","u","d","t","qa","qi","sx","sp","oc","no","","De","Vg","Tg","qg","Qg","sg","Sg","Og","Ng","","Ce","Du","Tc","qc","Qc","sc","Sc","Oa","Nn"]
        let secondLayer = ["","MI","MC","NA","PI","FE","AT","ZE","YO","XO","VE","RO","QE","MEC"]

        if (decimalValue.lt(1000)) {
            return decimalValue.toString().substring(0,5);
        }

        if (decimalValue.lt(1e36)) {
            return decimalValue.div(decimalValue.log10().div(3).floor().mul(3).pow_base(10))
            .toFixed(2) + firstTen[decimalValue.log10().div(3).sub(1).floor().toNumber()];
        }

        if (decimalValue.lt(E("1e3003"))) {
            let notatedNumber = decimalValue.log10().div(3).sub(1).floor().toNumber();
            return decimalValue.div(decimalValue.log10().div(3).floor().mul(3).pow_base(10))
            .toFixed(2) + firstLayer[notatedNumber % 10] + firstLayer[10 + Math.floor((notatedNumber / 10) % 10)] + firstLayer[20 + Math.floor((notatedNumber / 100) % 10)]
        }

        if (decimalValue.lt(E("ee36"))) {

            
            let notatedNumberSquared = decimalValue.log10().div(3).sub(1).log10().div(3).sub(1).floor().toNumber();
            //return notatedNumberSquared;
            let notatedNumber = decimalValue.log10().div(decimalValue.log10().log10().div(3).sub(1).floor().pow_base(1000)).div(3).floor().toNumber();
            let layer1Part = decimalValue.div(decimalValue.log10().div(3).floor().mul(3).pow_base(10))
            .toFixed(2);
            //return notatedNumber;
            return decimalValue.gte(E("e3000003")) ? 
                firstLayer[Math.floor((notatedNumber / 1000) % 10)] + firstLayer[10 + Math.floor((notatedNumber / 10000) % 10)] + firstLayer[20 + Math.floor((notatedNumber / 100000) % 10)] + secondLayer[notatedNumberSquared+1] + "-"
                 + firstLayer[notatedNumber % 10] + firstLayer[10 + Math.floor((notatedNumber / 10) % 10)] + firstLayer[20 + Math.floor((notatedNumber / 100) % 10)] + secondLayer[notatedNumberSquared]
                 : layer1Part + firstLayer[Math.floor((notatedNumber / 1000) % 10)] + firstLayer[10 + Math.floor((notatedNumber / 10000) % 10)] + firstLayer[20 + Math.floor((notatedNumber / 100000) % 10)] + secondLayer[notatedNumberSquared+1] + "-"
                 + firstLayer[notatedNumber % 10] + firstLayer[10 + Math.floor((notatedNumber / 10) % 10)] + firstLayer[20 + Math.floor((notatedNumber / 100) % 10)] + secondLayer[notatedNumberSquared]
        }

        return decimalValue.toExponential(2);
    }
}

class PickleDoughNotation extends Notation {
    formatValue(decimalValue) {
        const pickleDough = ["\u{1F952}","\u{1F956}","\u{1F950}","\u{1F369}","\u{1F968}","\u{1F95F}","\u{1F382}","\u{1F967}","d","i","h"]
        const bigNumber = decimalValue.layer;
        const moderateNumber = E(decimalValue.exponent);
        const smallNumber = E(decimalValue.mantissa);
        
        const imInABigPickle = smallNumber.mul(moderateNumber.pow_base(10)).log(40).mul(2000).floor().toNumber();
        const theSeventhDimension = imInABigPickle.toString(8);
        let result = "";

        if (theSeventhDimension === NaN || theSeventhDimension === "NaN") {
            return "\u{1F952}\u{1F35E}\u{1F35E}\u{1F35E}";
        }

        for (let i=0; i < theSeventhDimension.length; i++) {
            result += theSeventhDimension[i] === "-" ? "\u{1F35E}" : pickleDough[theSeventhDimension[i]];
        }

        return pickleDough[bigNumber] + result;
    }
}

class AssortedMoansNotation extends Notation {
    formatValue(decimalValue) {
        const assortedMoans = ["nnggyah", "annnnh", "mmffghh", "nngghh", "nnnggyyyuhh", "mmnnghh", "mmnnghyya", "nnmmgyyu", "aannyah", "mffnnngh", "nnnyammmffgh", "mmffnnhh","ngh"];
        const outOfBounds = {"a":"11","-":"12"}
        const keyValue = this.getSB3Layer(decimalValue);
        const scaled = E(keyValue).mul(6969).floor().toNumber().toString(11);
        let result = "";
        if (scaled === "NaN") {
            return "nnnggyyahmmghh"
        }

        for (let i=0; i < scaled.length; i++) {
            result += scaled[i] === "-" || scaled[i] === "a" ? assortedMoans[outOfBounds[scaled[i]]] + " " : assortedMoans[scaled[i]] + " "
        }

        return result;
    }
}
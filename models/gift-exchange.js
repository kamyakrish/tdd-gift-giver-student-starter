const { BadRequestError } = require('../utils/errors');

class GiftExchange {
    static pairs(names) {

        if (names.length % 2 != 0) {
            throw new BadRequestError("List of names cannot be odd");
        }
        else {
            //Array to store pairings
            const pairings = [];
            const used = [];

            while (true) {
                if (pairings.length == names.length / 2) {
                    break;
                }


                let random1 = Math.floor(Math.random() * names.length)
                let random2 = Math.floor(Math.random() * names.length)

                if (random1 == random2 || used.includes(names[random1]) || used.includes(names[random2])) {
                    continue;
                }


                pairings.push([names[random1], names[random2]]);
                used.push(names[random1]);
                used.push(names[random2]);
            }

            return pairings;
        }
    }

    static traditional(names) {

        const pairings = [];
        const used = [];
        let firstGiver = names[0];
        let curGiver = names[0];

        let random = Math.floor(Math.random() * names.length - 1) + 1;

        //List random pairings
        pairings.push(firstGiver + " is giving a gift to " + names[random]);
        used.push(firstGiver);
        curGiver = names[random];

        while (true) {
            if (used.length == names.length - 1) {
                pairings.push(curGiver + " is giving a gift to " + firstGiver);
                break;
            }

            random = Math.floor(Math.random() * names.length);

            if (used.includes(names[random]) || names[random] == curGiver) {
                continue;
            }
            else {
                pairings.push(curGiver + " is giving a gift to " + names[random]);
                used.push(curGiver);
                curGiver = names[random];
            }

        }

        return pairings;
    }
}

module.exports = GiftExchange;

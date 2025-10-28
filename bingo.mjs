import { commonTopics, likelyTopics, maybeTopics, rarelyTopics, legendaryTopics, ultimateTopics } from "./topics.mjs";
import { Save } from "./save.mjs";
import { RNG } from "./rng.mjs";

let date = new Date();
date.setUTCHours(0, 0, 0, 0);

// load save if applicable
const save = new Save(date.getTime());

cardnumber.innerText = save.cardNumber;

// seed the RNG
const rng = new RNG(date.getTime() - save.cardNumber);

let pickedTopics = new Map();

function pickTopic(topics, topicRarity) {
    const topicsIndex = Math.abs(rng.next()) % topics.length

    pickedTopics.set(topics[topicsIndex], topicRarity);
    topics.splice(topicsIndex, 1)
}

const commonIdx = 12;
const commonLikelyIdxs = [7, 11, 13, 17];
const likelyMaybeIdxs = [1, 3, 5, 9, 15, 19, 21, 23];

// This is not very pretty, but it does seem to work very well.
for (let i = 0; i < 25; i++) {
    if (i === commonIdx) {
        pickTopic(commonTopics, 0);
    } else if (commonLikelyIdxs.includes(i)) {
        if (rng.next() % 3 > 0 && commonTopics.length > 0)
            pickTopic(commonTopics, 0)
        else
            pickTopic(likelyTopics, 1)
    } else if (likelyMaybeIdxs.includes(i)) {
        if (rng.next() % 3 > 0 && likelyTopics.length > 0)
            pickTopic(likelyTopics, 1)
        else
            pickTopic(maybeTopics, 2)
    } else {
        let chance = rng.next() % 1_000
        if (chance === 333 && ultimateTopics.length > 0) {
            pickTopic(ultimateTopics, 5);
        } else if (chance > 989 && legendaryTopics.length > 0) {
            pickTopic(legendaryTopics, 4);
        } else if (chance < 333 && rarelyTopics.length > 0) {
            pickTopic(rarelyTopics, 3);
        } else {
            pickTopic(maybeTopics, 2);
        }
    }
}

if (pickedTopics.size < 25) {
    alert("shit's fucked. ping boons");
}

let bingoSpaces = document.getElementById("bingo-card")

let iterator = pickedTopics.entries();

for (let i = 0; i < 25; i++) {
    let [topic, rarity] = iterator.next().value; 

    let child = document.createElement("div")
    
    child.innerText = topic;

    // indicate rarity
    child.classList.add("rarity"+rarity);

    child.addEventListener('click', _ => {
        save.checkedSquares[i] == 1 ?
            save.checkedSquares[i] = 0 
        : 
            save.checkedSquares[i] = 1;

        child.classList.contains("checked") ? child.classList.remove("checked") : child.classList.add("checked")
        save.save(); // save when someone has clicked a square
    });

    if (save.checkedSquares[i] === 1) {
        child.classList.add("checked")
    }

    bingoSpaces.appendChild(child)
}

save.save();
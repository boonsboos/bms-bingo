/**
 * Simple xorshift rng
 */
class RNG {
    constructor(state) {
        this.state = state
    }

    /**
     * 
     * @returns {number}
     */
    next() {
        this.state ^= this.state << 13;
        this.state ^= this.state >> 7;
        this.state ^= this.state << 17;

        return this.state;
    }

    shuffleArray(array) {
        for (let i = array.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [array[i], array[j]] = [array[j], array[i]];
        }
    }

}

let seed = 0;

let date = new Date();
date.setUTCHours(0, 0, 0, 0);

seed = date.getTime();

if (globalThis.location.search != "") {
    const params = new URLSearchParams(globalThis.window.search);
    seed = Number(params.get("seed"));
}

const rng = new RNG(seed);

let topics = [
    "punchline is sex",
    "pig pepsi",
    "slap random trainer",
    "osu! map request",
    "st12 request",
    "switch misfire check",
    "not raising arms enough to hit ka",
    "DAIKO",
    "LR2 crashes",
    "IR rank 1",
    "full combo",
    "78% gauge",
    "fox appears",
    "vape hit",
    "rag is the only AAA",
    "Xa",
    "forgot speed mod",
    "kkm snipe",
    "complaining about overjoy table",
    "weed",
    "programmer nerd chat",
    "wriggle archive",
    "infinitas",
    "polish goon cave",
    "seiryu card",
    "toby snipe",
    "AAA-1",
    "forgot to start streaming award",
    "googly eyes",
    "continuous bombardment",
    "SNYK",
    "bottle falls off desk",
    "FIRST COMES SCRATCHING",
    "HEARTFUL or HEARTLESS sabun",
    "+0000",
    "DFC"
];

let pickedTopics = [];
for (let i = 0; i < 24; i++) {
    const topicsIndex = Math.abs(rng.next()) % topics.length

    pickedTopics.push(topics[topicsIndex]);
    topics.splice(topicsIndex, 1)
}

let bingoSpaces = document.getElementById("bingo-card")

rng.shuffleArray(pickedTopics);

pickedTopics = [...pickedTopics.slice(0, 12), "free space", ...pickedTopics.slice(12)]

for (let i = 0; i < 25; i++) {
    let child = document.createElement("div")

    child.innerText = pickedTopics[i];

    // free space can't be checked
    if (i === 12) {
        child.style.border = 0;
    } else {
        child.addEventListener('click', _ => {
            child.classList.contains("checked") ? child.classList.remove("checked") : child.classList.add("checked")
        });
    }

    bingoSpaces.appendChild(child)
}
/**
 * Simple xorshift rng
 */
export class RNG {
    constructor(state) {
        this.state = state
    }

    /** 
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
            const j = this.next() % i + 1;
            [array[i], array[j]] = [array[j], array[i]];
        }
    }
}

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
}

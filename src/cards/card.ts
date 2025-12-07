import {allSuits, CardSuit} from "./suit.ts";
import {allRanks, type CardRank} from "./rank.ts";

export class Card {
    readonly suit: CardSuit;
    readonly rank: CardRank;

    private constructor(suit: CardSuit, rank: CardRank) {
        this.suit = suit;
        this.rank = rank;
    }

    public isRed(): boolean {
        return this.suit === CardSuit.HEARTS || this.suit === CardSuit.DIAMONDS;
    }

    public isBlack(): boolean {
        return !this.isRed();
    }

    public isEven(): boolean {
        return this.rank % 2 === 0;
    }

    public isOdd(): boolean {
        return !this.isEven();
    }

    public static getAllCards(): Card[] {
        const cards: Card[] = [];
        for (const suit of allSuits()) {
            for (const rank of allRanks()) {
                cards.push(new Card(suit, rank));
            }
        }
        return cards;
    }
}
import {Card} from "./card.ts";
import {secureShuffle} from "../utils/random.ts";
import {assert} from "../utils/assert.ts";

export interface CardDeck {
    hasNextCard(): boolean;

    nextCard(): Card;
}

class FiniteCardDeck implements CardDeck {
    private readonly cards: Card[];
    private cardPointer: number = 0;

    private constructor(cards: Card[]) {
        this.cards = cards;
    }

    hasNextCard(): boolean {
        return this.cardPointer < this.cards.length;
    }

    nextCard(): Card {
        assert(this.hasNextCard(), "No more cards left in deck");
        return this.cards[this.cardPointer++];
    }

    public static createRandomlyShuffled(): FiniteCardDeck {
        return new FiniteCardDeck(secureShuffle(Card.getAllCards()));
    }
}

class InfiniteCardDeck implements CardDeck {
    private deck: FiniteCardDeck;

    private constructor(deck: FiniteCardDeck) {
        this.deck = deck;
    }

    hasNextCard(): boolean {
        return true;
    }

    nextCard(): Card {
        if (!this.deck.hasNextCard()) {
            this.deck = FiniteCardDeck.createRandomlyShuffled();
        }
        return this.deck.nextCard();
    }

    public static create() {
        return new InfiniteCardDeck(FiniteCardDeck.createRandomlyShuffled());
    }
}

export function createInfiniteDeck(): CardDeck {
    return InfiniteCardDeck.create();
}
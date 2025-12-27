import {type CardRow, Pyramid, PyramidRowsIterator} from "./pyramid.ts";
import {CardHand} from "../../cards/hand.ts";
import {type CardDeck, createInfiniteDeck} from "../../cards/deck.ts";
import {type Card} from "../../cards/card.ts";
import type {CardRank} from "../../cards/rank.ts";
import {WonTokensCalculationStrategy, WonTokensCalculator} from "./won_tokens_calculator.ts";
import {DeterministicShuffler} from "../../cards/shuffler.ts";
import type {GameConfig} from "./config.ts";

const PYRAMID_SIZE = 5;
const CARDS_PER_PLAYER = 5;

export class GameController {
    private readonly singleGameControllerFactory: () => SingleGameController;
    private singleGameController: SingleGameController;

    constructor(singleGameControllerFactory: () => SingleGameController) {
        this.singleGameControllerFactory = singleGameControllerFactory;
        this.singleGameController = this.singleGameControllerFactory();
    }

    public activateCard(card: Card): number | null {
        return this.singleGameController.activateCard(card);
    }

    public getHand(): CardHand {
        return this.singleGameController.getHand();
    }

    public getPyramidSize(): number {
        return this.singleGameController.getPyramidSize();
    }

    public revealCardsRow(): CardRow {
        return this.singleGameController.revealCardsRow();
    }

    public startNewPyramid(): void {
        this.singleGameController = this.singleGameControllerFactory();
    }

    public static create(gameConfig: GameConfig): GameController {
        const deck = createInfiniteDeck(new DeterministicShuffler(gameConfig.randomSeed));
        return new GameController(() => SingleGameController.create(gameConfig, deck));
    }
}

class SingleGameController {
    private readonly wonTokensCalculator: WonTokensCalculator;
    private readonly pyramidRowsIterator: PyramidRowsIterator;
    private hand: CardHand;
    private readonly activeCardRanks: Map<CardRank, number> = new Map<CardRank, number>();

    constructor(wonTokensCalculatorStrategy: WonTokensCalculationStrategy, pyramidRowsIterator: PyramidRowsIterator, hand: CardHand) {
        this.wonTokensCalculator = new WonTokensCalculator(wonTokensCalculatorStrategy, pyramidRowsIterator);
        this.pyramidRowsIterator = pyramidRowsIterator;
        this.hand = hand;
    }

    public getPyramidSize(): number {
        return PYRAMID_SIZE;
    }

    public getHand(): CardHand {
        return this.hand;
    }

    public revealCardsRow(): CardRow {
        this.activeCardRanks.clear();
        return this.pyramidRowsIterator.nextRow();
    }

    public activateCard({rank}: Card): number | null {
        if (this.hand.getCards().filter(c => c.rank === rank).length === 0) {
            return null;
        }
        this.activeCardRanks.set(rank, (this.activeCardRanks.get(rank) ?? 0) + 1)
        this.hand = this.hand.withCardRankRemoved(rank);
        return this.wonTokensCalculator.calculateWonTokens(this.activeCardRanks);
    }

    public static create({
                             wonTokensCalculatorStrategy,
                             playerNumber,
                             numPlayers
                         }: GameConfig, deck: CardDeck): SingleGameController {
        const pyramidRowsIterator = createPyramidRowsIterator(deck);
        const cardHand = createCardHand(deck, playerNumber, numPlayers);
        return new SingleGameController(wonTokensCalculatorStrategy, pyramidRowsIterator, cardHand);
    }
}

function createPyramidRowsIterator(deck: CardDeck): PyramidRowsIterator {
    return Pyramid.create(deck, PYRAMID_SIZE).newRowsIterator();
}

function createCardHand(deck: CardDeck, playerNumber: number, numPlayers: number): CardHand {
    return createCardHands(deck, numPlayers)[playerNumber];
}

function createCardHands(deck: CardDeck, numPlayers: number): CardHand[] {
    return Array.from({length: numPlayers}, () => CardHand.create(deck, CARDS_PER_PLAYER));
}
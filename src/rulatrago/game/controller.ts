import {type Bet, BetGroup} from "./bet_group.ts";
import {type CardDeck, createInfiniteDeck} from "../cards/deck.ts";
import type {Card} from "../cards/card.ts";

const MAX_BETS = 6;

export class GameController {
    private readonly deck: CardDeck;
    private activeBetGroup: BetGroup;

    private constructor(deck: CardDeck, activeBetGroup: BetGroup) {
        this.deck = deck;
        this.activeBetGroup = activeBetGroup;
    }

    public addBet(bet: Bet): boolean {
        if (this.activeBetGroup.getBetsCount() >= MAX_BETS) {
            return false;
        }
        this.activeBetGroup.addBet(bet);
        return true;
    }

    public getBetsTotalAmount(): number {
        return this.activeBetGroup.getTotalAmount();
    }

    public getActiveBets(): Bet[] {
        return this.activeBetGroup.getAllBets();
    }

    public drawCardAndEndRound(): RoundResult {
        const drawnCard = this.deck.nextCard();
        const {tokensWon, tokensLost} = this.activeBetGroup.getResult(drawnCard);
        const bets = this.getActiveBets();
        this.endRound();
        return {drawnCard, tokensWon, tokensLost, bets};
    }

    public clearBets(): void {
        this.activeBetGroup = BetGroup.empty();
    }

    private endRound(): void {
        this.activeBetGroup = BetGroup.empty();
    }

    public static createNew(): GameController {
        return new GameController(createInfiniteDeck(), BetGroup.empty());
    }
}

export interface RoundResult {
    drawnCard: Card;
    tokensWon: number;
    tokensLost: number;
    bets: Bet[];
}
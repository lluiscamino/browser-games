import type {Card} from "../cards/card.ts";
import {CardRank} from "../cards/rank.ts";
import {CardSuit} from "../cards/suit.ts";

export type BetRule = {
    won: (card: Card) => boolean;
}

// Color rules
export const redCardRule: BetRule = createRule(card => card.isRed());
export const blackCardRule: BetRule = createRule(card => card.isBlack());

// Parity rules
export const evenCardRule: BetRule = createRule(card => card.isEven());
export const oddCardRule: BetRule = createRule(card => card.isOdd());

// Rank intervals
export const twoToFourCardRule: BetRule = createRankIntervalRule(CardRank.TWO, CardRank.FOUR);
export const fiveToSevenCardRule: BetRule = createRankIntervalRule(CardRank.FIVE, CardRank.SEVEN);
export const eightToTenCardRule: BetRule = createRankIntervalRule(CardRank.EIGHT, CardRank.TEN);
export const jackToKingCardRule: BetRule = createRankIntervalRule(CardRank.JACK, CardRank.KING);

// Suit rules
export const spadesCardRule: BetRule = createSuitRule(CardSuit.SPADES);
export const heartsCardRule: BetRule = createSuitRule(CardSuit.HEARTS);
export const diamondsCardRule: BetRule = createSuitRule(CardSuit.DIAMONDS);
export const clubsCardRule: BetRule = createSuitRule(CardSuit.CLUBS);

// Rank rules
export const aceCardRule: BetRule = createRankRule(CardRank.ACE);
export const twoCardRule: BetRule = createRankRule(CardRank.TWO);
export const threeCardRule: BetRule = createRankRule(CardRank.THREE);
export const fourCardRule: BetRule = createRankRule(CardRank.FOUR);
export const fiveCardRule: BetRule = createRankRule(CardRank.FIVE);
export const sixCardRule: BetRule = createRankRule(CardRank.SIX);
export const sevenCardRule: BetRule = createRankRule(CardRank.SEVEN);
export const eightCardRule: BetRule = createRankRule(CardRank.EIGHT);
export const nineCardRule: BetRule = createRankRule(CardRank.NINE);
export const tenCardRule: BetRule = createRankRule(CardRank.TEN);
export const jackCardRule: BetRule = createRankRule(CardRank.JACK);
export const queenCardRule: BetRule = createRankRule(CardRank.QUEEN);
export const kingCardRule: BetRule = createRankRule(CardRank.KING);

function createRankIntervalRule(minRank: CardRank, maxRank: CardRank): BetRule {
    return {won: card => card.rank >= minRank && card.rank <= maxRank};
}

function createSuitRule(suit: CardSuit): BetRule {
    return {won: card => card.suit === suit};
}

function createRankRule(rank: CardRank): BetRule {
    return {won: card => card.rank === rank};
}

function createRule(won: (card: Card) => boolean): BetRule {
    return {won};
}
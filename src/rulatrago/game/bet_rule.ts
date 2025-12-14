import type {Card} from "../cards/card.ts";
import {CardRank} from "../cards/rank.ts";
import {CardSuit} from "../cards/suit.ts";

export type BetRule = {
    won: (card: Card) => boolean;
    winMultiplier: number;
}

// Color rules
export const redCardRule: BetRule = createRule(card => card.isRed(), /* winMultiplier = */ 1);
export const blackCardRule: BetRule = createRule(card => card.isBlack(), /* winMultiplier = */ 1);

// Parity rules
export const evenCardRule: BetRule = createRule(card => card.isEven(), /* winMultiplier = */ 1);
export const oddCardRule: BetRule = createRule(card => card.isOdd(), /* winMultiplier = */ 1);

// Rank intervals
export const twoToFourCardRule: BetRule = createRankIntervalRule(CardRank.TWO, CardRank.FOUR, /* winMultiplier = */ 3);
export const fiveToSevenCardRule: BetRule = createRankIntervalRule(CardRank.FIVE, CardRank.SEVEN, /* winMultiplier = */ 3);
export const eightToTenCardRule: BetRule = createRankIntervalRule(CardRank.EIGHT, CardRank.TEN, /* winMultiplier = */ 3);
export const jackToKingCardRule: BetRule = createRankIntervalRule(CardRank.JACK, CardRank.KING, /* winMultiplier = */ 3);

// Suit rules
export const spadesCardRule: BetRule = createSuitRule(CardSuit.SPADES, /* winMultiplier = */ 3);
export const heartsCardRule: BetRule = createSuitRule(CardSuit.HEARTS, /* winMultiplier = */ 3);
export const diamondsCardRule: BetRule = createSuitRule(CardSuit.DIAMONDS, /* winMultiplier = */ 3);
export const clubsCardRule: BetRule = createSuitRule(CardSuit.CLUBS, /* winMultiplier = */ 3);

// Rank rules
export const aceCardRule: BetRule = createRankRule(CardRank.ACE, /* winMultiplier = */ 12);
export const twoCardRule: BetRule = createRankRule(CardRank.TWO, /* winMultiplier = */ 12);
export const threeCardRule: BetRule = createRankRule(CardRank.THREE, /* winMultiplier = */ 12);
export const fourCardRule: BetRule = createRankRule(CardRank.FOUR, /* winMultiplier = */ 12);
export const fiveCardRule: BetRule = createRankRule(CardRank.FIVE, /* winMultiplier = */ 12);
export const sixCardRule: BetRule = createRankRule(CardRank.SIX, /* winMultiplier = */ 12);
export const sevenCardRule: BetRule = createRankRule(CardRank.SEVEN, /* winMultiplier = */ 12);
export const eightCardRule: BetRule = createRankRule(CardRank.EIGHT, /* winMultiplier = */ 12);
export const nineCardRule: BetRule = createRankRule(CardRank.NINE, /* winMultiplier = */ 12);
export const tenCardRule: BetRule = createRankRule(CardRank.TEN, /* winMultiplier = */ 12);
export const jackCardRule: BetRule = createRankRule(CardRank.JACK, /* winMultiplier = */ 12);
export const queenCardRule: BetRule = createRankRule(CardRank.QUEEN, /* winMultiplier = */ 12);
export const kingCardRule: BetRule = createRankRule(CardRank.KING, /* winMultiplier = */ 12);

function createRankIntervalRule(minRank: CardRank, maxRank: CardRank, winMultiplier: number): BetRule {
    return {won: card => card.rank >= minRank && card.rank <= maxRank, winMultiplier};
}

function createSuitRule(suit: CardSuit, winMultiplier: number): BetRule {
    return {won: card => card.suit === suit, winMultiplier};
}

function createRankRule(rank: CardRank, winMultiplier: number): BetRule {
    return {won: card => card.rank === rank, winMultiplier};
}

function createRule(won: (card: Card) => boolean, winMultiplier: number): BetRule {
    return {won, winMultiplier};
}
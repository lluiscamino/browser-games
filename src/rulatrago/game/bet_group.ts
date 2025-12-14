import type {BetRule} from "./bet_rule.ts";
import type {Card} from "../cards/card.ts";

export class BetGroup {
    private readonly bets: Bet[] = [];

    public addBet(bet: Bet) {
        this.bets.push(bet);
    }

    public getBetsCount(): number {
        return this.getAllBets().length;
    }

    public getTotalAmount(): number {
        return sumWinMultipliedAmounts(this.bets);
    }

    public getAllBets(): Bet[] {
        return this.bets;
    }

    public getResult(drawnCard: Card): BetGroupResult {
        const winningBets = this.bets.filter(({rule}) => rule.won(drawnCard));
        const losingBets = this.bets.filter(({rule}) => !rule.won(drawnCard));
        return {
            tokensWon: sumWinMultipliedAmounts(winningBets),
            tokensLost: sumAmounts(losingBets)
        }
    }

    public static empty(): BetGroup {
        return new BetGroup();
    }
}

export type Bet = {
    amount: number
    rule: BetRule
}

export type BetGroupResult = {
    tokensWon: number,
    tokensLost: number
}

function sumWinMultipliedAmounts(bets: Bet[]): number {
    return bets.reduce((acc, {amount, rule}) => acc + amount * rule.winMultiplier, 0);
}

function sumAmounts(bets: Bet[]): number {
    return bets.reduce((acc, {amount}) => acc + amount, 0);
}
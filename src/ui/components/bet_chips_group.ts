import type {Bet} from "../../game/bet_group.ts";
import {BetChip} from "./bet_chip.ts";
import {getBetButtonData} from "../ui_data.ts";

export class BetChipsGroup {
    private readonly doc: Document;
    private readonly container: HTMLElement;

    constructor(doc: Document, bets: Bet[]) {
        this.doc = doc;
        this.container = doc.createElement('div');
        this.container.className = 'chips-group';
        this.update(bets);
    }

    public render(): HTMLElement {
        return this.container;
    }

    public update(bets: Bet[]): void {
        this.container.innerHTML = '';
        bets.forEach((bet: Bet) => {
            this.container.appendChild(new BetChip(this.doc, getBetButtonData(bet.rule)).render());
        });
    }
}
import type {BetButtonDataGroup} from "../ui_data.ts";
import {BetButton} from "./bet_button.ts";
import type {Bet} from "../../game/bet_group.ts";

export class BetButtonsGroup {
    private readonly container: HTMLElement;

    constructor(doc: Document, {
        title,
        numColumns,
        buttons,
    }: BetButtonDataGroup, onBetAdded: (bet: Bet) => void) {
        this.container = doc.createElement('section');
        const label = this.createLabel(doc, title);
        this.container.appendChild(label);
        const grid = doc.createElement('div');
        grid.className = 'buttons-grid';
        grid.style.gridTemplateColumns = `repeat(${numColumns}, 1fr)`;
        this.container.appendChild(grid);
        for (const buttonData of buttons) {
            grid.appendChild(new BetButton(doc, buttonData, () => onBetAdded({
                amount: 1,
                rule: buttonData.betRule
            })).render());
        }
    }

    private createLabel(doc: Document, label: string): HTMLElement {
        const element = doc.createElement('h2');
        element.innerText = label;
        return element;
    }

    public render(): HTMLElement {
        return this.container;
    }
}
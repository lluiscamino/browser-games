import {translate} from "../../i18n/translate.ts";
import type {GameController} from "../../game/controller.ts";
import {BetChipsGroup} from "./bet_chips_group.ts";

export class BetsAmountDisplay {
    private readonly gameController: GameController;
    private readonly container: HTMLElement;
    private readonly label: HTMLElement;
    private readonly betChipsGroup: BetChipsGroup;

    constructor(doc: Document, gameController: GameController) {
        this.gameController = gameController;
        this.container = doc.createElement('section');
        this.label = doc.createElement('span');
        this.betChipsGroup = new BetChipsGroup(doc, this.gameController.getActiveBets());
        this.container.appendChild(this.label);
        this.container.appendChild(this.betChipsGroup.render());
        this.container.appendChild(this.createClearButton(doc));
        this.updateBetsAmount();
    }

    private createClearButton(doc: Document): HTMLElement {
        const button = doc.createElement('button');
        button.className = 'clear-bets-button';
        button.innerText = translate('clear_bets');
        button.onclick = () => this.onClearButtonClick();
        return button;
    }

    private onClearButtonClick(): void {
        this.gameController.clearBets();
        this.updateBetsAmount();
    }

    public render(): HTMLElement {
        return this.container;
    }

    public updateBetsAmount(): void {
        this.label.innerText = translate('bets_amount', {amount: this.gameController.getBetsTotalAmount()});
        this.betChipsGroup.update(this.gameController.getActiveBets());
    }
}
import type {RoundResult} from "../../game/controller.ts";
import {CardHolder} from "./card_holder.ts";
import {translate} from "../../i18n/translate.ts";
import {BetChipsGroup} from "./bet_chips_group.ts";

export class RoundResultDialog {
    private readonly dialog: HTMLDialogElement;
    private readonly dialogTitle: HTMLElement;
    private readonly dialogText: HTMLElement;
    private readonly cardHolder: CardHolder;
    private readonly betChipsGroup: BetChipsGroup;

    constructor(doc: Document) {
        this.dialog = doc.createElement('dialog');
        this.dialog.className = 'game-dialog';
        this.dialogTitle = doc.createElement('h2');
        this.dialogTitle.className = 'dialog-title';
        this.dialogText = doc.createElement('p');
        this.cardHolder = new CardHolder(doc);
        this.betChipsGroup = new BetChipsGroup(doc, []);
        const button = doc.createElement('button');
        button.className = 'dialog-btn';
        button.innerText = translate('ok');
        button.onclick = () => this.dialog.close();
        this.dialog.appendChild(this.cardHolder.render());
        this.dialog.appendChild(this.dialogTitle);
        this.dialog.appendChild(this.dialogText);
        this.dialog.appendChild(this.betChipsGroup.render());
        this.dialog.appendChild(button);
    }

    render(): HTMLElement {
        return this.dialog;
    }

    displayResult(roundResult: RoundResult): void {
        this.dialogTitle.innerText = getDialogTitle(roundResult);
        this.dialogText.innerText = translate('round_result', roundResult);
        this.cardHolder.displayCard(roundResult.drawnCard);
        this.betChipsGroup.update(roundResult.bets);
        this.dialog.showModal();
    }
}

function getDialogTitle({tokensWon, tokensLost}: RoundResult) {
    if (tokensWon === tokensLost) {
        return translate('you_draw');
    } else if (tokensWon > tokensLost) {
        return translate('you_won');
    } else {
        return translate('you_lost');
    }
}
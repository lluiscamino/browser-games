import {CardHolder} from "./card_holder.ts";
import type {GameController} from "../../game/controller.ts";
import {RoundResultDialog} from "./round_result_dialog.ts";
import {Logo} from "./logo.ts";
import {BetsAmountDisplay} from "./bets_amount_display.ts";
import {WarningDialog} from "./warning_dialog.ts";
import {translate} from "../../i18n/translate.ts";

export class Header {

    private readonly doc: Document;
    private readonly container: HTMLElement;
    private readonly betsAmountDisplay: BetsAmountDisplay;
    private readonly cardHolder: CardHolder;
    private readonly gameController: GameController;
    private readonly roundResultDialog: RoundResultDialog;

    constructor(doc: Document, gameController: GameController) {
        this.doc = doc;
        this.gameController = gameController;
        this.roundResultDialog = new RoundResultDialog(doc);
        this.container = doc.createElement('header');
        this.container.className = 'game-header';
        this.container.appendChild(new Logo(doc).render());
        this.betsAmountDisplay = new BetsAmountDisplay(doc, gameController);
        this.updateBetsAmount();
        this.container.appendChild(this.betsAmountDisplay.render());
        const cardHolderContainer = doc.createElement('div');
        cardHolderContainer.className = 'scale-66';
        this.cardHolder = new CardHolder(doc, {
            label: translate('draw_card'),
            onClick: () => this.onDrawCard()
        });
        cardHolderContainer.appendChild(this.cardHolder.render());
        this.container.appendChild(cardHolderContainer);
        this.container.appendChild(this.roundResultDialog.render());
    }

    public render(): HTMLElement {
        return this.container;
    }

    public updateBetsAmount(): void {
        this.betsAmountDisplay.updateBetsAmount();
    }

    private onDrawCard(): void {
        if (this.gameController.getBetsTotalAmount() === 0) {
            WarningDialog.show(this.doc, translate('bet_required'));
            return;
        }
        const result = this.gameController.drawCardAndEndRound();
        this.cardHolder.displayCard(result.drawnCard);
        this.roundResultDialog.displayResult(result);
        this.updateBetsAmount();
    }
}
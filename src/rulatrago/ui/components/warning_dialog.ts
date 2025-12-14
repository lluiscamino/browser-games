import {translate} from "../../i18n/translate.ts";

export class WarningDialog {
    private readonly dialog: HTMLDialogElement;

    public constructor(doc: Document, text: string) {
        this.dialog = doc.createElement('dialog');
        this.dialog.className = 'game-dialog';
        const dialogTitle = doc.createElement('h2');
        dialogTitle.className = 'dialog-title';
        dialogTitle.innerText = translate('hey');
        const dialogText = doc.createElement('p');
        dialogText.innerText = text;
        const button = doc.createElement('button');
        button.className = 'dialog-btn';
        button.innerText = translate('ok');
        button.onclick = () => this.dialog.close();
        this.dialog.appendChild(dialogTitle);
        this.dialog.appendChild(dialogText);
        this.dialog.appendChild(button);
    }

    public render(): HTMLElement {
        return this.dialog;
    }

    public show(): void {
        this.dialog.showModal();
    }

    public static show(doc: Document, text: string): void {
        const dialog = new WarningDialog(doc, text);
        doc.body.appendChild(dialog.render());
        dialog.show();
    }
}
import type {BetButtonData} from "../ui_data.ts";

export class BetButton {
    private readonly button: HTMLButtonElement;

    constructor(doc: Document, {name, className}: BetButtonData, onClick: () => void) {
        this.button = doc.createElement('button');
        this.button.classList.add('bet-button');
        this.button.classList.add(className);
        this.button.innerText = name;
        this.button.onclick = onClick;
    }

    public render(): HTMLElement {
        return this.button;
    }
}
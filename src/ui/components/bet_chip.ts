import type {BetButtonData} from "../ui_data.ts";

export class BetChip {
    private readonly container: HTMLElement;

    constructor(doc: Document, {name, shortName, className}: BetButtonData) {
        this.container = doc.createElement('div');
        this.container.classList.add('bet-chip');
        this.container.classList.add(className);
        this.container.innerText = shortName ?? name;
        this.container.title = name;
    }

    public render(): HTMLElement {
        return this.container;
    }
}
import type {Card} from "../../cards/card.ts";

export class CardHolder {
    private readonly container: HTMLElement;

    constructor(doc: Document, onClick: (() => void) | undefined = undefined) {
        this.container = doc.createElement(onClick ? 'button' : 'div');
        this.setClasses(['card-holder', 'back-card']);
        if (onClick) {
            this.container.onclick = onClick;
        }
    }

    render(): HTMLElement {
        return this.container;
    }

    displayCard({suit, rank}: Card): void {
        this.container.title = `${rank} ${suit}`;
        this.setClasses(['card-holder', `card-suit-${suit}`, `card-rank-${rank}`]);
    }

    private setClasses(classNames: string[]): void {
        this.container.className = '';
        classNames.forEach(className => this.container.classList.add(className));
    }
}
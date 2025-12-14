import type {Card} from "../../cards/card.ts";

export class CardHolder {
    private readonly container: HTMLElement;

    constructor(doc: Document, onClickConfig: OnClickConfig | undefined = undefined) {
        this.container = doc.createElement(onClickConfig ? 'button' : 'div');
        this.setClasses(['card-holder', 'back-card']);
        if (onClickConfig) {
            this.container.onclick = onClickConfig.onClick;
            this.container.title = onClickConfig.label;
            this.container.ariaLabel = onClickConfig.label;
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

interface OnClickConfig {
    label: string
    onClick: (() => void)
}
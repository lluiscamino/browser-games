import {translate} from "../../i18n/translate.ts";

export class Logo {
    private readonly logo: HTMLImageElement;

    constructor(doc: Document) {
        this.logo = doc.createElement('img');
        this.logo.alt = translate('game_name');
        this.logo.src = 'logo.png';
        this.logo.className = 'logo';
    }

    public render(): HTMLElement {
        return this.logo;
    }
}
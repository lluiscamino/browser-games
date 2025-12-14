import {translate} from "../../i18n/translate.ts";

export class Logo {
    private readonly logo: HTMLImageElement;

    constructor(doc: Document) {
        this.logo = doc.createElement('img');
        this.logo.alt = translate('game_name');
        this.logo.src = 'rulatrago/logo.webp';
        this.logo.className = 'logo';
        this.logo.width = 123;
        this.logo.height = 80;
        this.logo.fetchPriority = 'high';
    }

    public render(): HTMLElement {
        return this.logo;
    }
}
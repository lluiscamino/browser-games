import {esTranslations} from "./data/es.ts";
import type {TranslationKey} from "./translations.ts";
import {assert} from "../utils/assert.ts";

export function translate(key: TranslationKey, args: any | undefined = undefined): string {
    const translation = esTranslations[key];
    if (typeof translation === 'string') {
        return translation;
    } else {
        assert(args, 'No translation args provided')
        return translation(args);
    }
}
import type {Translations} from "../translations.ts";

export const esTranslations: Translations = {
    game_name: 'RulaTrago',
    draw_card: 'Destapar carta',
    red: 'Rojo',
    black: 'Negro',
    even: 'Par',
    even_short: 'P',
    odd: 'Impar',
    odd_short: 'I',
    bets_amount: (({amount}) => `Tragos apostados: ${amount}`),
    ok: 'De acuerdo',
    you_draw: 'Tu hígado respira aliviado',
    you_won: 'Tus enemigos tiemblan',
    you_lost: 'La cagaste, Burt Lancaster',
    round_result: ({tokensWon, tokensLost}) => `Bebe ${tokensLost} y reparte ${tokensWon} tragos`,
    clear_bets: 'Retirar apuesta',
    hey: 'Eh eh eh',
    bet_required: '¡Tienes que apostar algo para poder destapar la carta!',
    too_many_bets: 'Ya no puedes hacer más apuestas'
}
export type Translations = {
    [key in TranslationKey]: string | ((obj: any) => string);
};

export type TranslationKey =
    'game_name'
    | 'draw_card'
    | 'red'
    | 'black'
    | 'even'
    | 'even_short'
    | 'odd'
    | 'odd_short'
    | 'bets_amount'
    | 'ok'
    | 'you_draw'
    | 'you_lost'
    | 'you_won'
    | 'round_result'
    | 'clear_bets'
    | 'hey'
    | 'bet_required'
    | 'too_many_bets';
export enum CardSuit {
    HEARTS = 'hearts',
    DIAMONDS = 'diamonds',
    CLUBS = 'clubs',
    SPADES = 'spades'
}

export function allSuits(): CardSuit[] {
    return Object.values(CardSuit);
}
import {translate} from "../i18n/translate.ts";
import {
    aceCardRule,
    type BetRule,
    blackCardRule,
    clubsCardRule,
    diamondsCardRule,
    eightCardRule,
    eightToTenCardRule,
    evenCardRule,
    fiveCardRule,
    fiveToSevenCardRule,
    fourCardRule,
    heartsCardRule,
    jackCardRule,
    jackToKingCardRule,
    kingCardRule,
    nineCardRule,
    oddCardRule,
    queenCardRule,
    redCardRule,
    sevenCardRule,
    sixCardRule,
    spadesCardRule,
    tenCardRule,
    threeCardRule,
    twoCardRule,
    twoToFourCardRule
} from "../game/bet_rule.ts";
import {assertDefined} from "../utils/assert.ts";

const RED_BACKGROUND_CLASSNAME = 'red-bg';
const BLACK_BACKGROUND_CLASSNAME = 'black-bg';
const BLUE_BACKGROUND_CLASSNAME = 'blue-bg';
const GREEN_BACKGROUND_CLASSNAME = 'green-bg';

export interface BetButtonDataGroup {
    title: string,
    numColumns: number,
    buttons: BetButtonData[]
}

export interface BetButtonData {
    name: string,
    shortName?: string,
    className: string,
    betRule: BetRule
}

export const betButtonDataGroups: BetButtonDataGroup[] = [
    {
        title: 'x1',
        numColumns: 4,
        buttons: [
            {
                name: translate('red'),
                shortName: '',
                className: RED_BACKGROUND_CLASSNAME,
                betRule: redCardRule
            },
            {
                name: translate('black'),
                shortName: '',
                className: BLACK_BACKGROUND_CLASSNAME,
                betRule: blackCardRule
            },
            {
                name: translate('even'),
                shortName: translate('even_short'),
                className: BLUE_BACKGROUND_CLASSNAME,
                betRule: evenCardRule
            },
            {
                name: translate('odd'),
                shortName: translate('odd_short'),
                className: BLUE_BACKGROUND_CLASSNAME,
                betRule: oddCardRule
            }
        ]
    },
    {
        title: 'x3',
        numColumns: 4,
        buttons: [
            {
                name: '2-4',
                className: BLUE_BACKGROUND_CLASSNAME,
                betRule: twoToFourCardRule
            },
            {
                name: '5-7',
                className: BLUE_BACKGROUND_CLASSNAME,
                betRule: fiveToSevenCardRule
            },
            {
                name: '♠',
                className: BLACK_BACKGROUND_CLASSNAME,
                betRule: spadesCardRule
            },
            {
                name: '♥',
                className: RED_BACKGROUND_CLASSNAME,
                betRule: heartsCardRule
            },
            {
                name: '8-10',
                className: BLUE_BACKGROUND_CLASSNAME,
                betRule: eightToTenCardRule
            },
            {
                name: 'J-K',
                className: BLUE_BACKGROUND_CLASSNAME,
                betRule: jackToKingCardRule
            },
            {
                name: '♦',
                className: RED_BACKGROUND_CLASSNAME,
                betRule: diamondsCardRule
            },
            {
                name: '♣',
                className: BLACK_BACKGROUND_CLASSNAME,
                betRule: clubsCardRule
            }
        ]
    },
    {
        title: 'x12',
        numColumns: 3,
        buttons: [ // TODO: Dynamically generate?
            {
                name: '2',
                className: RED_BACKGROUND_CLASSNAME,
                betRule: twoCardRule
            },
            {
                name: '3',
                className: BLACK_BACKGROUND_CLASSNAME,
                betRule: threeCardRule
            },
            {
                name: '4',
                className: RED_BACKGROUND_CLASSNAME,
                betRule: fourCardRule
            },
            {
                name: '5',
                className: BLACK_BACKGROUND_CLASSNAME,
                betRule: fiveCardRule
            },
            {
                name: '6',
                className: RED_BACKGROUND_CLASSNAME,
                betRule: sixCardRule
            },
            {
                name: '7',
                className: BLACK_BACKGROUND_CLASSNAME,
                betRule: sevenCardRule
            },
            {
                name: '8',
                className: RED_BACKGROUND_CLASSNAME,
                betRule: eightCardRule
            },
            {
                name: '9',
                className: BLACK_BACKGROUND_CLASSNAME,
                betRule: nineCardRule
            },
            {
                name: '10',
                className: RED_BACKGROUND_CLASSNAME,
                betRule: tenCardRule
            },
            {
                name: 'J',
                className: BLACK_BACKGROUND_CLASSNAME,
                betRule: jackCardRule
            },
            {
                name: 'Q',
                className: RED_BACKGROUND_CLASSNAME,
                betRule: queenCardRule
            },
            {
                name: 'K',
                className: BLACK_BACKGROUND_CLASSNAME,
                betRule: kingCardRule
            },
            {
                name: 'A',
                className: GREEN_BACKGROUND_CLASSNAME,
                betRule: aceCardRule
            },
        ]
    }
];

export function getBetButtonData(betRule: BetRule): BetButtonData {
    const allData = betButtonDataGroups.flatMap(group => group.buttons);
    const result = allData.find(data => data.betRule === betRule);
    return assertDefined(result, `No bet button data found for bet rule ${betRule}`);
}
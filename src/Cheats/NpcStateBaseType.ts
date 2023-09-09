export interface NpcStateBase0 {
    chastity: { penis: "", vagina: "", anus: "" },
    location: {},
    skills: {},
    pronouns: {},
    traits: [],
}

export interface NpcStateBase1 extends NpcStateBase0 {
    penis: string,
    vagina: string,
    gender: string,
    description: string,
    title: string,
    insecurity: string,
    pronoun: string,
    pronouns: { [key: string]: string },
    penissize: number,
    penisdesc: string,
    bottomsize: number,
    ballssize: number,
    breastsize: number,
    breastdesc: string,
    breastsdesc: string,
    skincolour: number,
    teen: number,
    adult: number,
    init: number,
    intro: string,
    type: string,
    trust: number,
    love: number,
    dom: number,
    lust: number,
    rage: number,
    state: string,
    trauma: number,
    eyeColour: string,
    hairColour: string,
    virginity: {
        vaginal: boolean,
        temple: boolean,
        oral: boolean,
        anal: boolean,
        handholding: string,
        kiss: string,
        penile: string,
    },
}

export interface NpcStateBase2 extends NpcStateBase1 {
    sextoys: { [key: string]: any[] },
    outfits: string[],
    clothes: {
        lower: { name: string, integrity: number },
        upper: { name: string, integrity: number },
    },
}

export interface NpcStateBase3 extends NpcStateBase2 {
    nam: string,
}

export interface NpcStateBase100 extends NpcStateBase3 {
}

export interface NpcSydney extends NpcStateBase100 {
    purity: number,
    corruption: number,
}

export interface NpcKylar extends NpcStateBase100 {
    rage: number,
}

export interface NpcIvoryWraith extends NpcStateBase100 {
}

export interface NpcBlackWolf extends NpcStateBase100 {
    harmony: number;
    ferocity: number;
}

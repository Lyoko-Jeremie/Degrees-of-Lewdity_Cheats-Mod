import {get, isString, set, isNil} from 'lodash';

export class NpcItem {
    constructor(
        public baseRef: NpcRelation,
        public npcName: string,
    ) {
    }

    get npcRef(): NpcStateBase100 | NpcSydney | NpcKylar {
        return this.baseRef.getNpcState(this.npcName)!;
    }

    get name() {
        return this.npcRef.nam;
    }

    get love() {
        return this.npcRef.love;
    }

    set love(v: number) {
        this.npcRef.love = v;
    }

    get lust() {
        return this.npcRef.lust;
    }

    set lust(v: number) {
        this.npcRef.lust = v;
    }

    get dom() {
        return this.npcRef.dom;
    }

    set dom(v: number) {
        this.npcRef.dom = v;
    }

    isSydney(r: any): r is NpcSydney {
        return !isNil(r.purity) && !isNil(r.corruption) && r.nam === 'Sydney';
    }

    isKylar(r: any): r is NpcKylar {
        return !isNil(r.rage) && r.nam === 'Kylar';
    }

    get purity() {
        if (this.isSydney(this.npcRef)) {
            return this.npcRef.purity;
        }
        return undefined;
    }

    set purity(v: number | undefined) {
        if (this.isSydney(this.npcRef) && v) {
            this.npcRef.purity = v;
        }
    }

    get corruption() {
        if (this.isSydney(this.npcRef)) {
            return this.npcRef.corruption;
        }
        return undefined;
    }

    set corruption(v: number | undefined) {
        if (this.isSydney(this.npcRef) && v) {
            this.npcRef.corruption = v;
        }
    }

    get rage() {
        if (this.isKylar(this.npcRef)) {
            return this.npcRef.rage;
        }
        return undefined;
    }

    set rage(v: number | undefined) {
        if (this.isKylar(this.npcRef) && v) {
            this.npcRef.rage = v;
        }
    }
}

// NPCNameList = ["Avery","Bailey","Briar","Charlie","Darryl","Doren","Eden","Gwylan","Harper","Jordan","Kylar","Landry","Leighton","Mason","Morgan","River","Robin","Sam","Sirris","Whitney","Winter","Black Wolf","Niki","Quinn","Remy","Alex","Great Hawk","Wren","Sydney","Ivory Wraith"];

interface NpcStateBase0 {
    chastity: { penis: "", vagina: "", anus: "" },
    location: {},
    skills: {},
    pronouns: {},
    traits: [],
}

interface NpcStateBase1 extends NpcStateBase0 {
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

interface NpcStateBase2 extends NpcStateBase1 {
    sextoys: { [key: string]: any[] },
    outfits: string[],
    clothes: {
        lower: { name: string, integrity: number },
        upper: { name: string, integrity: number },
    },
}

interface NpcStateBase3 extends NpcStateBase2 {
    nam: string,
}

interface NpcStateBase100 extends NpcStateBase3 {
}

interface NpcSydney extends NpcStateBase100 {
    purity: number,
    corruption: number,
}

interface NpcKylar extends NpcStateBase100 {
    rage: number,
}

export class NpcRelation {
    constructor(
        public thisW: Window
    ) {
        this.init();
    }

    set(k: string, v: number) {
        set(this.thisW.SugarCube.State.active.variables, k, v);
    }

    get(k: string) {
        return get(this.thisW.SugarCube.State.active.variables, k);
    }

    get NPCNameList(): string[] {
        return this.thisW.SugarCube.State.active.variables.NPCNameList;
    }

    get NPCName(): NpcStateBase100[] {
        return this.thisW.SugarCube.State.active.variables.NPCName;
    }

    getNpcState(name: string): NpcStateBase100 {
        return this.NPCName![this.NPCNameList!.indexOf(name)]!;
    }

    table?: Map<string, NpcItem>;

    init() {
        this.table = new Map<string, NpcItem>();
        this.NPCNameList.forEach(N => {
            this.table!.set(N, new NpcItem(this, N));
        });
    }
}

import {get, isString, set, isNil, uniqBy, cloneDeep, isNumber} from 'lodash';
import {NpcBlackWolf, NpcIvoryWraith, NpcKylar, NpcStateBase100, NpcSydney} from "./NpcStateBaseType";

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
        return /* !isNil(r.purity) && !isNil(r.corruption) && */ r.nam === 'Sydney';
    }

    isKylar(r: any): r is NpcKylar {
        return r.nam === 'Kylar';
    }

    isAvery(r: any): r is NpcKylar {
        return r.nam === 'Avery';
    }

    isIvoryWraith(r: any): r is NpcIvoryWraith {
        return r.nam === 'Ivory Wraith';
    }

    isBlackWolf(r: any): r is NpcBlackWolf {
        return r.nam === 'Black Wolf';
    }

    get purity() {
        if (this.isSydney(this.npcRef)) {
            return this.npcRef.purity;
        }
        return undefined;
    }

    set purity(v: number | undefined) {
        if (this.isSydney(this.npcRef)) {
            if (isNumber(v)) {
                this.npcRef.purity = v;
            }
        }
    }

    get corruption() {
        if (this.isSydney(this.npcRef)) {
            return this.npcRef.corruption;
        }
        return undefined;
    }

    set corruption(v: number | undefined) {
        if (this.isSydney(this.npcRef)) {
            if (isNumber(v)) {
                this.npcRef.corruption = v;
            }
        }
    }

    get rage() {
        if (this.isKylar(this.npcRef) || this.isAvery(this.npcRef)) {
            return this.npcRef.rage;
        }
        return undefined;
    }

    set rage(v: number | undefined) {
        if (this.isKylar(this.npcRef) || this.isAvery(this.npcRef)) {
            if (isNumber(v)) {
                this.npcRef.rage = v;
            }
        }
    }

    get harmony() {
        if (this.isBlackWolf(this.npcRef)) {
            return this.npcRef.harmony;
        }
        return undefined;
    }

    set harmony(v: number | undefined) {
        if (this.isBlackWolf(this.npcRef)) {
            if (isNumber(v)) {
                this.npcRef.harmony = v;
            }
        }
    }

    get ferocity() {
        if (this.isBlackWolf(this.npcRef)) {
            return this.npcRef.ferocity;
        }
        return undefined;
    }

    set ferocity(v: number | undefined) {
        if (this.isBlackWolf(this.npcRef)) {
            if (isNumber(v)) {
                this.npcRef.ferocity = v;
            }
        }
    }
}

const importantNpcOrder = ["Robin", "Whitney", "Eden", "Kylar", "Sydney", "Avery", "Great Hawk", "Black Wolf", "Alex"];
const specialNPCs = ["Ivory Wraith"];

type InfoNameKey = 'love' | 'lust' | 'dom' | 'rage' | 'harmony' | 'ferocity' | 'purity' | 'corruption';

const NPCNameListKP: [string, string, string, [InfoNameKey[]]][] = [
    ["Avery", "艾弗里", "商人", [
        ['love', 'lust', 'dom', 'rage',],
    ]],
    ["Bailey", "贝利", "监护人", [
        ['love', 'lust', 'dom',],
    ]],
    ["Briar", "布莱尔", "妓院老板", [
        ['love', 'lust', 'dom',],
    ]],
    ["Charlie", "查里", "舞蹈教练", [
        ['love', 'lust', 'dom',],
    ]],
    ["Darryl", "达里尔", "俱乐部老板", [
        ['love', 'lust', 'dom',],
    ]],
    ["Doren", "多伦", "英语老师", [
        ['love', 'lust', 'dom',],
    ]],
    ["Eden", "伊甸", "猎人", [
        ['love', 'lust', 'dom',],
    ]],
    ["Gwylan", "格威岚", "商店店主", [
        ['love', 'lust', 'dom',],
    ]],
    ["Harper", "哈珀", "医生", [
        ['love', 'lust', 'dom',],
    ]],
    ["Jordan", "约旦", "虔信者", [
        ['love', 'lust', 'dom',],
    ]],
    ["Kylar", "凯拉尔", "不合群者", [
        ['love', 'lust', 'dom', 'rage',],
    ]],
    ["Landry", "兰德里", "罪犯", [
        ['love', 'lust', 'dom',],
    ]],
    ["Leighton", "礼顿", "校长", [
        ['love', 'lust', 'dom',],
    ]],
    ["Mason", "梅森", "游泳老师", [
        ['love', 'lust', 'dom',],
    ]],
    ["Morgan", "摩根", "下水道居民", [
        ['love', 'lust', 'dom',],
    ]],
    ["River", "瑞沃", "数学老师", [
        ['love', 'lust', 'dom',],
    ]],
    ["Robin", "罗宾", "孤儿", [
        ['love', 'lust', 'dom',],
    ]],
    ["Sam", "萨姆", "咖啡店主", [
        ['love', 'lust', 'dom',],
    ]],
    ["Sirris", "西里斯", "科学老师", [
        ['love', 'lust', 'dom',],
    ]],
    ["Whitney", "惠特尼", "霸凌者", [
        ['love', 'lust', 'dom',],
    ]],
    ["Winter", "温特", "历史老师", [
        ['love', 'lust', 'dom',],
    ]],
    ["Black Wolf", "黑狼", "头狼", [
        ['love', 'lust', 'dom', 'harmony', 'ferocity',],
    ]],
    ["Niki", "尼奇", "摄影师", [
        ['love', 'lust', 'dom',],
    ]],
    ["Quinn", "奎因", "市长", [
        ['love', 'lust', 'dom',],
    ]],
    ["Remy", "雷米", "农场主", [
        ['love', 'lust', 'dom',],
    ]],
    ["Alex", "艾利克斯", "农工", [
        ['love', 'lust', 'dom',],
    ]],
    ["Great Hawk", "巨鹰", "恐怖者", [
        ['love', 'lust', 'dom',],
    ]],
    ["Wren", "伦恩", "走私者", [
        ['love', 'lust', 'dom',],
    ]],
    ["Sydney", "悉尼", "信徒", [
        ['love', 'lust', 'dom', 'purity', 'corruption',],
    ]],
    ["Ivory Wraith", "象牙幽灵", "血月邪神", [
        ['love', 'lust', 'dom',],
    ]],
];

const NPCInfoNameM = new Map([
    ['love', '爱意'],
    ['lust', '性欲'],
    ['dom', '支配'],
    // Sydney
    ['purity', '纯洁'],
    ['corruption', '堕落'],
    // Avery , Kylar
    ['rage', '嫉妒'],
    // Black Wolf
    ['harmony', '善'],
    ['ferocity', '恶'],
]);

const NPCInfoNameSpecial: [string, [InfoNameKey, string][]][] = [
    // Name =>  Map[ Info => CN ]
    ['Ivory Wraith', [['lust', '痴迷'],]],
    ['Robin', [['dom', '自信'],]],
];

const NPCInfoSpecialLimit: [string, [InfoNameKey, { min?: number, max: number }][]][] = [
    // Name =>  Map[ Info => Limit ]
    ['Ivory Wraith', [
        ['lust', {max: 20,}],
    ]],
    ['Whitney', [
        ['love', {max: 30,}],
        ['dom', {max: 20,}],
    ]],
    ['Eden', [
        ['love', {max: 200,}],
        ['dom', {max: 150,}],
    ]],
    ['Black Wolf', [
        ['love', {max: 30,}],
        ['harmony', {max: 20,}],
        ['ferocity', {max: 20,}],
    ]],
    ['Sydney', [
        ['love', {max: 150,}],
        ['purity', {max: 100, min: 0,}],
        ['corruption', {max: 50, min: 0,}],
    ]],
    ['Mason', [
        ['love', {max: 50,}],
    ]],
    ['Alex', [
        ['love', {max: 100,}],
        ['lust', {max: 100,}],
        ['dom', {max: 100,}],
    ]],
    ['Darryl', [
        ['love', {max: 50,}],
    ]],
    ['River', [
        ['love', {max: 50,}],
    ]],
    ['Sam', [
        ['love', {max: 50,}],
    ]],
];

const NPCInfoNameSpecialM = new Map(
    NPCInfoNameSpecial.map(T => {
        return [T[0], new Map(T[1])];
    }),
);

export function NpcInfo2CN(npcName: string, infoName: InfoNameKey) {
    const n1 = NPCInfoNameM.get(infoName);
    const n21 = NPCInfoNameSpecialM.get(npcName);
    const n22 = n21?.get(infoName);
    return n22 || n1 || '{NpcInfo2CNError}';
}

const NPCInfoSpecialLimitM = new Map(
    NPCInfoSpecialLimit.map(T => {
        return [T[0], new Map(T[1])];
    }),
);

export function NpcInfoLimitString(npcName: string, infoName: InfoNameKey) {
    const n21 = NPCInfoSpecialLimitM.get(npcName);
    const l = n21?.get(infoName);
    if (l) {
        return `[${l.min || 0}~${l.max}]`;
    } else {
        return `[${0}~${100}]`;
    }
}

export interface NPCNameListNameInfo {
    enName: string;
    cnName: string;
    dec: string;
    infoList: InfoNameKey[];
}

const NPCNameListMP: Map<string, NPCNameListNameInfo> = new Map(NPCNameListKP.map(T => {
    return [T[0], {
        enName: T[0],
        cnName: T[1] || T[0],
        dec: T[2],
        infoList: T[3][0],
    } as NPCNameListNameInfo];
}));

export function NpcName2CN(name: string) {
    const n = NPCNameListMP.get(name);
    if (n) {
        return n;
    }
    console.error('NpcName2CN !n', name, n, NPCNameListMP);
    throw new Error('NpcName2CN !n');
}

class CustomIterableIterator<T, Parent> implements IterableIterator<T> {
    index = 0;

    constructor(
        public parent: Parent,
        public nextF: (index: number, p: Parent, ito: CustomIterableIterator<T, Parent>) => IteratorResult<T>,
    ) {
    }

    [Symbol.iterator](): IterableIterator<T> {
        return this;
    }

    next(...args: [] | [undefined]): IteratorResult<T> {
        const r = this.nextF(
            this.index,
            this.parent,
            this
        );
        ++this.index;
        return r;
    }
}

export class NpcIterable implements ReadonlyMap<string, NpcItem> {
    orderedName: string[];

    constructor(
        public baseRef: NpcRelation,
    ) {
        this.orderedName =
            uniqBy((
                [] as string[]
            ).concat(
                cloneDeep(specialNPCs)
            ).concat(
                cloneDeep(importantNpcOrder)
            ).concat(
                cloneDeep(this.baseRef.NPCNameList)
            ), T => T);
        console.log('this.orderedName', this.orderedName);
    }

    get size(): number {
        return this.orderedName.length;
    }

    [Symbol.iterator](): IterableIterator<[string, NpcItem]> {
        return this.entries();
    }

    entries(): IterableIterator<[string, NpcItem]> {
        return new CustomIterableIterator<[string, NpcItem], typeof this>(
            this,
            (index, p, ito) => {
                if (index >= this.size) {
                    return {done: true, value: undefined};
                } else {
                    const it = this.orderedName[index];
                    const itt = this.get(it);
                    console.log('entries()', index, it, itt);
                    if (!it || !itt) {
                        console.error('entries() (!it || !itt)', index, it, itt);
                        throw new Error('entries() (!it || !itt)');
                    }
                    return {done: false, value: [it, itt]};
                }
            }
        );
    }

    forEach(callback: (value: NpcItem, key: string, map: ReadonlyMap<string, NpcItem>) => void, thisArg?: any): void {
        this.orderedName.forEach((TT) => {
            const itt = this.get(TT);
            if (!TT || !itt) {
                console.log('forEach()', TT, itt);
                console.error('forEach() (!TT || !itt)', TT, itt);
                throw new Error('forEach() (!TT || !itt)');
            }
            callback.call(thisArg, itt, TT, this);
        });
    }

    get(key: string): NpcItem | undefined {
        return this.baseRef.table?.get(key);
    }

    has(key: string): boolean {
        return !!this.baseRef.table?.has(key);
    }

    keys(): IterableIterator<string> {
        return new CustomIterableIterator<string, typeof this>(
            this,
            (index, p, ito) => {
                if (index >= this.size) {
                    return {done: true, value: undefined};
                } else {
                    const it = this.orderedName[index];
                    return {done: false, value: it};
                }
            }
        );
    }

    values(): IterableIterator<NpcItem> {
        return new CustomIterableIterator<NpcItem, typeof this>(
            this,
            (index, p, ito) => {
                if (index >= this.size) {
                    return {done: true, value: undefined};
                } else {
                    const it = this.orderedName[index];
                    return {done: false, value: this.get(it)!};
                }
            }
        );
    }
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
        this.table.entries();
    }

    iterateIt() {
        return new NpcIterable(this);
    }
}

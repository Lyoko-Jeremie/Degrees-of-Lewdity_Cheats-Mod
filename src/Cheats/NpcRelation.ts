import {get, isString, set, isNil, uniqBy, cloneDeep} from 'lodash';
import {NpcKylar, NpcStateBase100, NpcSydney} from "./NpcStateBaseType";

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

const importantNpcOrder = ["Robin", "Whitney", "Eden", "Kylar", "Sydney", "Avery", "Great Hawk", "Black Wolf", "Alex"];
const specialNPCs = ["Ivory Wraith"];

const NPCNameListKP = [
    ["Avery", "艾弗里", "商人"],
    ["Bailey", "贝利", "监护人"],
    ["Briar", "布莱尔", "妓院老板"],
    ["Charlie", "查里", "舞蹈教练"],
    ["Darryl", "达里尔", "俱乐部老板"],
    ["Doren", "多伦", "英语老师"],
    ["Eden", "伊甸", "猎人"],
    ["Gwylan", "格威岚", "商店店主"],
    ["Harper", "哈珀", "医生"],
    ["Jordan", "约旦", "虔信者"],
    ["Kylar", "凯拉尔", "不合群者"],
    ["Landry", "兰德里", "罪犯"],
    ["Leighton", "礼顿", "校长"],
    ["Mason", "梅森", "游泳老师"],
    ["Morgan", "摩根", "下水道居民"],
    ["River", "瑞沃", "数学老师"],
    ["Robin", "罗宾", "孤儿"],
    ["Sam", "萨姆", "咖啡店主"],
    ["Sirris", "西里斯", "科学老师"],
    ["Whitney", "惠特尼", "霸凌者"],
    ["Winter", "温特", "历史老师"],
    ["Black Wolf", "黑狼", "头狼"],
    ["Niki", "尼奇", "摄影师"],
    ["Quinn", "奎因", "市长"],
    ["Remy", "雷米", "农场主"],
    ["Alex", "艾利克斯", "农工"],
    ["Great Hawk", "巨鹰", "恐怖者"],
    ["Wren", "伦恩", "走私者"],
    ["Sydney", "悉尼", "信徒"],
    ["Ivory Wraith", "", ""],
];

interface NPCNameListNameInfo {
    enName: string;
    cnName: string;
    dec: string;
}

const NPCNameListMP: Map<string, NPCNameListNameInfo> = new Map(NPCNameListKP.map(T => {
    return [T[0], {
        enName: T[0],
        cnName: T[1] || T[0],
        dec: T[2],
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
                cloneDeep(importantNpcOrder)
            ).concat(
                cloneDeep(specialNPCs)
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

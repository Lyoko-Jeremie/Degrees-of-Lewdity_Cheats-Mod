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

const NPCNameListKP = new Map([
    ["Avery", "艾弗里"],
    ["Bailey", "贝利"],
    ["Briar", "布莱尔"],
    ["Charlie", "查里"],
    ["Darryl", ""],
    ["Doren", "多伦"],
    ["Eden", ""],
    ["Gwylan", ""],
    ["Harper", "哈珀"],
    ["Jordan", "约旦"],
    ["Kylar", "凯拉尔"],
    ["Landry", "兰德里"],
    ["Leighton", "礼顿"],
    ["Mason", "梅森"],
    ["Morgan", "摩根"],
    ["River", "瑞沃"],
    ["Robin", "罗宾"],
    ["Sam", "萨姆"],
    ["Sirris", "西里斯"],
    ["Whitney", "惠特尼"],
    ["Winter", "温特"],
    ["Black Wolf", ""],
    ["Niki", "尼奇"],
    ["Quinn", ""],
    ["Remy", "雷米"],
    ["Alex", "艾利克斯"],
    ["Great Hawk", "格威岚"],
    ["Wren", ""],
    ["Sydney", "悉尼"],
    ["Ivory Wraith", ""],
]);

export function NpcName2CN(name: string) {
    const n = NPCNameListKP.get(name);
    if (n) {
        if (n.length !== 0) {
            return n;
        }
    }
    return name;
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

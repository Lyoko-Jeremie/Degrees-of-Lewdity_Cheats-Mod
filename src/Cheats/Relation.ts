import {get, isString, set} from 'lodash';

type TagType = 'item' | 'none';

export class RelationItem {
    tag: TagType = 'item';

    constructor(
        public key: string,
        public name: string,
        private _max: number | string,
        public min: number = 0,
        public thisW?: Window,
    ) {
    }

    get max(): number {
        if (isString(this._max)) {
            return get(this.thisW!.SugarCube.State.active.variables, this._max);
        }
        return this._max;
    }
}

export class ItemPlaceHolder extends RelationItem {
    tag: TagType = 'none';

    constructor() {
        super(ItemPlaceHolder.rId(), '', 0);
    }

    // avoid same Math.random
    static rIdP = 0;

    // get a unique string as id
    static rId() {
        return '' + (++ItemPlaceHolder.rIdP) + Math.random();
    }
}

export class Relation {
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

    table?: Map<string, RelationItem>;

    init() {
        this.table = new Map<string, RelationItem>([
            ['fame.sex', new RelationItem('fame.sex', '淫乱 声名 (less is good)', 1000)],
            ['fame.prostitution', new RelationItem('fame.prostitution', '卖淫 声名 (less is good)', 1000)],
            ['fame.rape', new RelationItem('fame.rape', '强暴 声名 (less is good)', 1000)],
            ['fame.bestiality', new RelationItem('fame.bestiality', '兽交 声名 (less is good)', 1000)],
            ['fame.exhibitionism', new RelationItem('fame.exhibitionism', '露出 声名 (less is good)', 1000)],
            ['fame.model', new RelationItem('fame.model', '走秀 声名 (less is good)', 1000)],
            ['fame.pregnancy', new RelationItem('fame.pregnancy', '妊娠 声名 (less is good)', 1000)],
            ['fame.impreg', new RelationItem('fame.impreg', '播种 声名 (less is good)', 1000)],
            ['fame.scrap', new RelationItem('fame.scrap', '战斗 声名 (more is good)', 1000)],
            ['fame.good', new RelationItem('fame.good', '善良 声名 (more is good)', 1000)],
            ['fame.business', new RelationItem('fame.business', '商业 声名 (more is good)', 1000)],
            ['fame.social', new RelationItem('fame.social', '社交 声名 (more is good)', 1000)],

            [ItemPlaceHolder.rId(), new ItemPlaceHolder()],

            ['farm.beasts.horses', new RelationItem('farm.beasts.horses', '马群', 1000)],
            ['farm.beasts.pigs', new RelationItem('farm.beasts.pigs', '猪群', 1000)],
            ['farm.beasts.cattle', new RelationItem('farm.beasts.cattle', '牛群', 1000)],
            ['farm.beasts.dogs', new RelationItem('farm.beasts.dogs', '狗群', 1000)],

            [ItemPlaceHolder.rId(), new ItemPlaceHolder()],

            ['cool', new RelationItem('cool', '同学 声名', 'coolmax', 0, this.thisW)],
            ['delinquency', new RelationItem('delinquency', '学校违规', 1000, 0, this.thisW)],
            ['detention', new RelationItem('detention', '留校', 1000, 0, this.thisW)],

            ['orphan_hope', new RelationItem('orphan_hope', '孤儿院希望 [-100~100]', 100, -100)],
            ['orphan_reb', new RelationItem('orphan_reb', '孤儿院叛逆 [-100~100]', 100, -100)],

            [ItemPlaceHolder.rId(), new ItemPlaceHolder()],

            ['upperwet', new RelationItem('upperwet', '上着湿度', 10000)],
            ['worn.upper.integrity', new RelationItem('worn.upper.integrity', '上着耐久', 10000)],
            ['lowerwet', new RelationItem('lowerwet', '下着湿度', 10000)],
            ['worn.lower.integrity', new RelationItem('worn.lower.integrity', '下着耐久', 10000)],
            ['underupperwet', new RelationItem('underupperwet', '内衣湿度', 10000)],
            ['worn.under_upper.integrity', new RelationItem('worn.under_upper.integrity', '内衣耐久', 10000)],
            ['underlowerwet', new RelationItem('underlowerwet', '内裤湿度', 10000)],
            ['worn.under_lower.integrity', new RelationItem('worn.under_lower.integrity', '内裤耐久', 10000)],

            // SugarCube.setup.clothes.genitals[clothesIndex('genitals',V.worn.genitals)].name_cap
            ['worn.genitals.integrity', new RelationItem('worn.genitals.integrity','贞操带耐久', 1000)],

            // ['upperwet', new RelationItem('upperwet', '狗群', 1000)],
            // ['upperwet', new RelationItem('upperwet', '狗群', 1000)],

        ]);
    }

}

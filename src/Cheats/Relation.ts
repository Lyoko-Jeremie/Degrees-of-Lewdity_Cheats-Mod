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
        this.table = new Map<string, RelationItem>();

        [
            new RelationItem('fame.sex', '淫乱 声名 (less is good)', 1000),
            new RelationItem('fame.prostitution', '卖淫 声名 (less is good)', 1000),
            new RelationItem('fame.rape', '强暴 声名 (less is good)', 1000),
            new RelationItem('fame.bestiality', '兽交 声名 (less is good)', 1000),
            new RelationItem('fame.exhibitionism', '露出 声名 (less is good)', 1000),
            new RelationItem('fame.model', '走秀 声名 (less is good)', 1000),
            new RelationItem('fame.pregnancy', '妊娠 声名 (less is good)', 1000),
            new RelationItem('fame.impreg', '播种 声名 (less is good)', 1000),
            new RelationItem('fame.scrap', '战斗 声名 (more is good)', 1000),
            new RelationItem('fame.good', '善良 声名 (more is good)', 1000),
            new RelationItem('fame.business', '商业 声名 (more is good)', 1000),
            new RelationItem('fame.social', '社交 声名 (more is good)', 1000),

            new ItemPlaceHolder(),

            new RelationItem('farm.beasts.horses', '马群', 1000),
            new RelationItem('farm.beasts.pigs', '猪群', 1000),
            new RelationItem('farm.beasts.cattle', '牛群', 1000),
            new RelationItem('farm.beasts.dogs', '狗群', 1000),

            new ItemPlaceHolder(),

            new RelationItem('cool', '同学 声名', 'coolmax', 0, this.thisW),
            new RelationItem('delinquency', '学校违规', 1000, 0, this.thisW),
            new RelationItem('detention', '留校', 1000, 0, this.thisW),

            new RelationItem('orphan_hope', '孤儿院希望 [-100~100]', 100, -100),
            new RelationItem('orphan_reb', '孤儿院叛逆 [-100~100]', 100, -100),

            new ItemPlaceHolder(),

            new RelationItem('upperwet', '上着湿度', 10000),
            new RelationItem('worn.upper.integrity', '上着耐久', 10000),
            new RelationItem('lowerwet', '下着湿度', 10000),
            new RelationItem('worn.lower.integrity', '下着耐久', 10000),
            new RelationItem('underupperwet', '内衣湿度', 10000),
            new RelationItem('worn.under_upper.integrity', '内衣耐久', 10000),
            new RelationItem('underlowerwet', '内裤湿度', 10000),
            new RelationItem('worn.under_lower.integrity', '内裤耐久', 10000),

            // SugarCube.setup.clothes.genitals[clothesIndex('genitals',V.worn.genitals)].name_cap
            new RelationItem('worn.genitals.integrity', '贞操带耐久', 1000),


        ].map(T => {
            this.table!.set(T.key, T);
        });
    }

}

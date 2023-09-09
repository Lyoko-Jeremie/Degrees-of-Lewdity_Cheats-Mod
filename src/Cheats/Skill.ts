import {get, isString, set} from 'lodash';

type TagType = 'item' | 'none';

export class SkillItem {
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

export class ItemPlaceHolder extends SkillItem {
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

export class Skill {
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

    table?: Map<string, SkillItem>;

    init() {
        this.table = new Map<string, SkillItem>([
            ['seductionskill', new SkillItem('seductionskill', '魅惑 技能', 1000)],
            ['oralskill', new SkillItem('oralskill', '口部 技能', 1000)],
            ['chestskill', new SkillItem('chestskill', '胸部 技能', 1000)],
            ['handskill', new SkillItem('handskill', '手部 技能', 1000)],
            ['bottomskill', new SkillItem('bottomskill', '臀部 技能', 1000)],
            ['analskill', new SkillItem('analskill', '后庭 技能', 1000)],
            ['vaginalskill', new SkillItem('vaginalskill', '小穴 技能', 1000)],
            ['feetskill', new SkillItem('feetskill', '足部 技能', 1000)],
            ['thighskill', new SkillItem('thighskill', '腿部 技能', 1000)],
            ['penileskill', new SkillItem('penileskill', '阴茎 技能', 1000)],

            [ItemPlaceHolder.rId(), new ItemPlaceHolder()],

            ['corruption_slime', new SkillItem('corruption_slime', '堕落slime [less is better]', 100)],
            ['skulduggery', new SkillItem('skulduggery', '诡术 技能', 1000)],
            ['danceskill', new SkillItem('danceskill', '舞蹈 技能', 1000)],
            ['swimmingskill', new SkillItem('swimmingskill', '游泳 技能', 1000)],
            ['athletics', new SkillItem('athletics', '田径 技能', 1000)],
            ['tending', new SkillItem('tending', '护理 技能', 1000)],
            ['housekeeping', new SkillItem('housekeeping', '家务 技能', 1000)],

            [ItemPlaceHolder.rId(), new ItemPlaceHolder()],

            ['science', new SkillItem('science', '科学 经验', 1000)],
            ['sciencetrait', new SkillItem('sciencetrait', '科学 等级', 4)],
            ['maths', new SkillItem('maths', '数学 经验', 1000)],
            ['mathstrait', new SkillItem('mathstrait', '数学 等级', 4)],
            ['english', new SkillItem('english', '英语 经验', 1000)],
            ['englishtrait', new SkillItem('englishtrait', '英语 等级', 4)],
            ['history', new SkillItem('history', '历史 经验', 1000)],
            ['historytrait', new SkillItem('historytrait', '历史 等级', 4)],

            [ItemPlaceHolder.rId(), new ItemPlaceHolder()],

            ['prof.spray', new SkillItem('prof.spray', '防狼喷雾 技能', 1000)],
            ['prof.net', new SkillItem('prof.net', '网 技能', 1000)],
        ]);
    }

}

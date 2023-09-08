import {get, set, isString} from 'lodash';

type TagType = 'item' | 'none';

export class StateItem {
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

export class ItemPlaceHolder extends StateItem {
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

// SugarCube.State.active.variables.player

export class State {
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

    table?: Map<string, StateItem>;

    init() {
        this.table = new Map<string, StateItem>([
            ['money', new StateItem('money', '金钱', 100000000)],

            [ItemPlaceHolder.rId(), new ItemPlaceHolder()],

            ['purity', new StateItem('purity', '纯洁', 1000, 0, this.thisW)],
            ['beauty', new StateItem('beauty', '容貌', 'beautymax', 0, this.thisW)],
            ['physique', new StateItem('physique', '体能', 'physiquemax', 0, this.thisW)],
            ['willpower', new StateItem('willpower', '意志', 'willpowermax', 0, this.thisW)],
            ['awareness', new StateItem('awareness', '性知识', 1000, 0, this.thisW)],
            ['promiscuity', new StateItem('promiscuity', '淫乱度', 1000, 0, this.thisW)],
            ['exhibitionism', new StateItem('exhibitionism', '露出癖', 1000, 0, this.thisW)],
            ['deviancy', new StateItem('deviancy', '异种癖', 1000, 0, this.thisW)],

            [ItemPlaceHolder.rId(), new ItemPlaceHolder()],

            ['pain', new StateItem('pain', '疼痛', 1000, 0, this.thisW)],
            ['arousal', new StateItem('arousal', '性奋', 'arousalmax', 0, this.thisW)],
            ['tiredness', new StateItem('tiredness', '疲劳', 1000, 0, this.thisW)],
            ['stress', new StateItem('stress', '压力', 'stressmax', 0, this.thisW)],
            ['trauma', new StateItem('trauma', '创伤', 'traumamax', 0, this.thisW)],
            ['control', new StateItem('control', '自控 [more is better]', 'controlmax', 0, this.thisW)],
            ['allure', new StateItem('allure', '诱惑 [dynamic calc by another info]', 10000, 0, this.thisW)],
            ['drunk', new StateItem('drunk', '醉酒', 1000, 0, this.thisW)],
            ['drugged', new StateItem('drugged', '春药', 1000, 0, this.thisW)],
            ['hallucinogen', new StateItem('hallucinogen', '幻觉', 1000, 0, this.thisW)],

            [ItemPlaceHolder.rId(), new ItemPlaceHolder()],

            ['temple_chastity_timer', new StateItem('temple_chastity_timer', '贞洁测试倒计时', 15)],
            ['community_service', new StateItem('community_service', '社区服务倒计时', 10)],
            ['grace', new StateItem('grace', '恩典', 100)],

            [ItemPlaceHolder.rId(), new ItemPlaceHolder()],

            ['scienceprojectdays', new StateItem('scienceprojectdays', '科学倒计时', 16)],
            ['mathsprojectdays', new StateItem('mathsprojectdays', '数学倒计时', 25)],
            ['adultshopprogress', new StateItem('adultshopprogress', '成人商店开门倒计时', 22)],

            [ItemPlaceHolder.rId(), new ItemPlaceHolder()],

            ['spray', new StateItem('spray', '防狼喷雾', 20)],
            ['spraymax', new StateItem('spraymax', '防狼喷雾 总数', 20)],

            [ItemPlaceHolder.rId(), new ItemPlaceHolder()],

            ['condoms', new StateItem('condoms', '避孕套', 1000)],

            [ItemPlaceHolder.rId(), new ItemPlaceHolder()],

            ['crimehistory', new StateItem('crimehistory', '犯罪历史', 10)],
            ['crime', new StateItem('crime', '逮捕实施', 10)],

            [ItemPlaceHolder.rId(), new ItemPlaceHolder()],

            ['feats.allSaves.points', new StateItem('feats.allSaves.points', 'Vrel硬币', 1000)],
        ]);
    }

}

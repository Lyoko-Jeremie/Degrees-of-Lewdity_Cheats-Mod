import {get, set, isString} from 'lodash';

type TagType = 'item' | 'none';

export class PlayerStateItem {
    tag: TagType = 'item';

    constructor(
        public key: string,
        public name: string,
        private _max: number | string,
        private _min: number | string = 0,
        public thisW?: Window,
    ) {
    }

    get max(): number {
        if (isString(this._max)) {
            return get(this.thisW!.SugarCube.State.active.variables, this._max);
        }
        return this._max;
    }

    get min(): number {
        if (isString(this._min)) {
            return get(this.thisW!.SugarCube.State.active.variables, this._min);
        }
        return this._min;
    }
}

export class ItemPlaceHolder extends PlayerStateItem {
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

class PSI extends PlayerStateItem {
}

export class PlayerState {

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

    table?: Map<string, PSI>;

    init() {
        this.table = new Map<string, PSI>([
            ['player.breastsize', new PSI('player.breastsize', '乳房 size', 'breastsizemax', 'breastsizemin', this.thisW)],
            ['breastgrowthtimer', new PSI('breastgrowthtimer', '乳房 成长 timer', 1000, 0, this.thisW)],
            ['lactating', new PSI('lactating', '哺乳期', 1, 0, this.thisW)],
            ['milk_amount', new PSI('milk_amount', '乳量', 1000, 0, this.thisW)],
            ['milk_volume', new PSI('milk_volume', '母乳容量', 1000, 0, this.thisW)],

            [ItemPlaceHolder.rId(), new ItemPlaceHolder()],
            // sexStats.pills

            ['player.penisExist', new PSI('player.penisExist', '阴茎 Exist', 1, 0, this.thisW)],
            ['player.penissize', new PSI('player.penissize', '阴茎 size', 'penissizemax', 'penissizemin', this.thisW)],
            ['penisgrowthtimer', new PSI('penisgrowthtimer', '阴茎 成长 timer', 1000, 0, this.thisW)],
            ['semen_amount', new PSI('semen_amount', '精液量', 1000, 0, this.thisW)],
            ['semen_volume', new PSI('semen_volume', '精液容量', 1000, 0, this.thisW)],

            [ItemPlaceHolder.rId(), new ItemPlaceHolder()],

            ['player.bottomsize', new PSI('player.bottomsize', '屁股 size', 'bottomsizemax', 'bottomsizemin', this.thisW)],
            ['bottomgrowthtimer', new PSI('bottomgrowthtimer', '屁股 成长 timer', 1000, 0, this.thisW)],

            [ItemPlaceHolder.rId(), new ItemPlaceHolder()],

        ]);
    }

}

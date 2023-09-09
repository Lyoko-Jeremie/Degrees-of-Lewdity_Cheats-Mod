import {get, set, isString} from 'lodash';

type TagType = 'item' | 'none';

export class BuildInInfoItem {
    tag: TagType = 'item';

    constructor(
        public key: string,
        public name: string,
        private _max: number | string,
        private _min: number | string | undefined = 0,
        public thisW?: Window,
    ) {
    }

    get max(): number {
        if (isString(this._max)) {
            return get(this.thisW!.SugarCube.State.active.variables, this._max);
        }
        return this._max;
    }

    get min(): number | undefined {
        if (isString(this._min)) {
            return get(this.thisW!.SugarCube.State.active.variables, this._min);
        }
        return this._min;
    }
}

export class ItemPlaceHolder extends BuildInInfoItem {
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

class BII extends BuildInInfoItem {
}


// rngOverride

export class BuildInInfo {

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

    table?: Map<string, BII>;

    init() {
        this.table = new Map<string, BII>();

        [
            new BII('rngOverride', 'rngOverride [undefined,0~100]', 100, undefined, this.thisW),

            new ItemPlaceHolder(),

        ].map(T => {
            this.table!.set(T.key, T);
        });
    }

}




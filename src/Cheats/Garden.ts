import {set, get, isArray} from "lodash";


export class Garden {
    constructor(
        public thisW: Window
    ) {
    }

    fullAll() {
        const g = get(this.thisW.SugarCube.State.active.variables, 'plots.garden');
        if (isArray(g)) {
            g.forEach((T: any) => {
                if (get(T, 'plant') && get(T, 'plant') !== 'none') {
                    set(T, 'stage', 5);
                }
            });
        }
    }

}

// plots

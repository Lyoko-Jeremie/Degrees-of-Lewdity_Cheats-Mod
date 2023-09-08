import {get, set} from 'lodash';

export function FindValue(n: number, thisW: Window): string[] {
    return Object.keys(thisW.SugarCube.State.active.variables).map(K =>
        thisW.SugarCube.State.active.variables[K] === n ? K : undefined
    ).filter(T => !!T) as string[];
}

export function GetValue(key: string, thisW: Window): any {
    return get(thisW.SugarCube.State.active.variables, key)
}

export function SetValue(key: string, v: string | number, thisW: Window) {
    set(thisW.SugarCube.State.active.variables, key, v)
}

export function FindValue(n: number, thisW: Window): string[] {
    return Object.keys(thisW.SugarCube.State.active.variables).map(K =>
        thisW.SugarCube.State.active.variables[K] === n ? K : undefined
    ).filter(T => !!T) as string[];
}

import {GM_config, Field, InitOptionsNoCustom, GM_configStruct, BootstrapBtnType} from '../GM_config_TS/gm_config';
// https://stackoverflow.com/questions/42631645/webpack-import-typescript-module-both-normally-and-as-raw-string
// import inlineGMCss from 'raw-loader!../inlineText/GM.css';
import inlineGMCss from '../inlineText/GM.css?inlineText';
import inlineBootstrap from 'bootstrap/dist/css/bootstrap.css?inlineText';

// avoid same Math.random
let rIdP = 0;

// get a unique string as id
function rId() {
    return '' + (++rIdP) + Math.random();
}

import {assign, parseInt, isSafeInteger, isString, isNil, isArray} from 'lodash';

import {Skill} from '../Cheats/Skill';
import {Relation} from '../Cheats/Relation';
import {State} from '../Cheats/State';
import {FindValue, GetValue} from '../Cheats/Tools';
import {NpcName2CN, NpcRelation} from "../Cheats/NpcRelation";
import {PlayerState} from "../Cheats/PlayerState";

const btnType: BootstrapBtnType = 'secondary';

class SearchHistory {
    constructor(
        public k: string = 'SearchHistory',
    ) {
    }

    protected read() {
        try {
            const j = localStorage.getItem(this.k);
            if (!j) {
                return [];
            }
            const l = JSON.parse(j);
            return isArray(l) ? l : [];
        } catch (e: any) {
            console.error(e);
            return [];
        }
    }

    add(s: string) {
        const l = this.read();
        l.push(s);
        localStorage.setItem(this.k, JSON.stringify(l));
    }

    getList(): string[] {
        return this.read();
    }
}

interface GlobalInfo {
    SearchHistory_GetValue: SearchHistory,
    skill: Skill,
    relation: Relation,
    state: State,
    npcRelation: NpcRelation,
    playerState: PlayerState,
}
;
(async () => {
    let g: GlobalInfo;
    const initG = () => {
        if (!g) {
            console.log('initG');
            g = {
                SearchHistory_GetValue: new SearchHistory('SearchHistory_GetValue'),
                skill: new Skill(unsafeWindow),
                relation: new Relation(unsafeWindow),
                state: new State(unsafeWindow),
                npcRelation: new NpcRelation(unsafeWindow),
                playerState: new PlayerState(unsafeWindow),
            };
        }
    };
    const gmcCreator = () => {
        initG();
        return new GM_config(
            {
                xgmExtendInfo: {
                    xgmExtendMode: 'bootstrap',
                    bootstrap: {
                        smallBtn: true,
                    },
                    buttonConfig: {
                        noSave: true,
                        noCancel: true,
                        noReset: true,
                    },
                },
                'id': 'MyConfig', // The id used for this instance of GM_config
                'title': 'Degrees-of-Lewdity Cheats Mod', // Panel Title
                css: inlineGMCss + '\n' + inlineBootstrap,
                'fields': // Fields object
                    {
                        'FindValue_F': {
                            label: `FindValue`,
                            type: 'text',
                            cssClassName: 'd-inline',
                        },
                        'FindValue_b': {
                            label: 'Find',
                            type: 'button',
                            click() {
                                const vv = gmc!.fields['FindValue_F'].toValue();
                                if (isNil(vv)) {
                                    console.error('FindValue_b (!vv) : ');
                                    return;
                                }
                                const r = parseInt(vv as string);
                                if (isSafeInteger(r)) {
                                    const fr = FindValue(r, unsafeWindow);
                                    gmc!.fields['FindValue_r'].value = JSON.stringify(fr, undefined, 2);
                                    gmc!.fields['FindValue_r'].reload();
                                } else {
                                    console.error('!(isSafeInteger(r)) : ', vv, r);
                                    return;
                                }
                            },
                            // cssStyleText: 'display: inline-block;',
                            cssClassName: 'd-inline',
                            xgmExtendField: {bootstrap: {btnType: btnType}},
                        },
                        'FindValue_r': {
                            type: 'textarea',
                        },
                        [rId()]: {
                            type: 'br',
                        },
                        'GetValue_K': {
                            label: `GetValueKeyName`,
                            type: 'datalist',
                            cssClassName: 'd-inline',
                            options: g.SearchHistory_GetValue.getList(),
                        },
                        'GetValue_b': {
                            label: 'Get',
                            type: 'button',
                            // keydown: (ev: KeyboardEvent) => {
                            //     console.log('onkeydown', ev);
                            //     const vvv = gmc!.fields['GetValue_K'].value;
                            //     console.log('vvv', vvv);
                            // },
                            click() {
                                const vv = gmc!.fields['GetValue_K'].toValue();
                                const vvv = gmc!.fields['GetValue_K'].value;
                                console.log('vv', vv);
                                console.log('vvv', vvv);
                                if (isNil(vv)) {
                                    console.error('GetValue_b (!vv) : ');
                                    return;
                                }
                                if (!isString(vv)) {
                                    console.error('GetValue_b (!isString(vv)) : ');
                                    return;
                                }
                                g.SearchHistory_GetValue.add(vv);
                                const fr = GetValue(vv, unsafeWindow);
                                gmc!.fields['GetValue_r'].value = JSON.stringify(fr, undefined, 2);
                                gmc!.fields['GetValue_r'].reload();
                            },
                            // cssStyleText: 'display: inline-block;',
                            cssClassName: 'd-inline',
                            xgmExtendField: {bootstrap: {btnType: btnType}},
                        },
                        'GetValue_r': {
                            type: 'textarea',
                        },
                        [rId()]: {
                            section: GM_config.create('State Section'),
                            type: 'br',
                        },
                        ...Array.from(g.state.table!.values()).reduce<InitOptionsNoCustom['fields']>((acc, s,) => {
                            const o: InitOptionsNoCustom['fields'] = {};
                            const kkk = 'State_' + s.key;
                            if (s.tag !== "none") {
                                o[kkk] = {
                                    label: s.name,
                                    type: 'number',
                                    default: g.state.get(s.key),
                                    cssClassName: 'd-inline',
                                };
                                o[kkk + '_l'] = {
                                    label: `(max:${s.max})`,
                                    type: 'label',
                                    cssClassName: 'd-inline',
                                };
                                o[kkk + '_b'] = {
                                    label: 'set',
                                    type: 'button',
                                    cssClassName: 'd-inline',
                                    click() {
                                        const vv = gmc!.fields[kkk].toValue();
                                        if (isNil(vv)) {
                                            console.error('(!vv) : ', kkk, s);
                                            return;
                                        }
                                        const r = parseInt(vv as string);
                                        if (isSafeInteger(r)) {
                                            g.state.set(s.key, r);
                                        } else {
                                            console.error('!(isSafeInteger(r)) : ', kkk, s, r);
                                            return;
                                        }
                                    },
                                    xgmExtendField: {bootstrap: {btnType: btnType}},
                                };
                                o[kkk + '_b_max'] = {
                                    label: 'max',
                                    type: 'button',
                                    cssClassName: 'd-inline',
                                    click() {
                                        g.state.set(s.key, s.max);
                                        gmc!.fields[kkk].value = s.max;
                                        gmc!.fields[kkk].reload();
                                    },
                                    xgmExtendField: {bootstrap: {btnType: btnType}},
                                };
                                o[kkk + '_b_zero'] = {
                                    label: 'zero',
                                    type: 'button',
                                    cssClassName: 'd-inline',
                                    click() {
                                        const vv = gmc!.fields[kkk].toValue();
                                        g.state.set(s.key, 0);
                                        gmc!.fields[kkk].value = 0;
                                        gmc!.fields[kkk].reload();
                                    },
                                    xgmExtendField: {bootstrap: {btnType: btnType}},
                                };
                                o[rId()] = {
                                    type: 'br',
                                };
                            } else {
                                o[kkk + '_BR'] = {
                                    label: ``,
                                    type: 'label',
                                    cssStyleText: 'margin: 1.5em 0;',
                                };
                            }
                            return assign<InitOptionsNoCustom['fields'], InitOptionsNoCustom['fields']>(acc, o);
                        }, {} as InitOptionsNoCustom['fields']),
                        [rId()]: {
                            section: GM_config.create('Skill Section'),
                            type: 'br',
                        },
                        ...Array.from(g.skill.table!.values()).reduce<InitOptionsNoCustom['fields']>((acc, s,) => {
                            const o: InitOptionsNoCustom['fields'] = {};
                            const kkk = 'Skill_' + s.key;
                            if (s.tag !== "none") {
                                o[kkk] = {
                                    label: s.name,
                                    type: 'number',
                                    default: g.skill.get(s.key),
                                    cssClassName: 'd-inline',
                                };
                                o[kkk + '_l'] = {
                                    label: `(max:${s.max})`,
                                    type: 'label',
                                    cssClassName: 'd-inline',
                                };
                                o[kkk + '_b'] = {
                                    label: 'set',
                                    type: 'button',
                                    cssClassName: 'd-inline',
                                    click() {
                                        const vv = gmc!.fields[kkk].toValue();
                                        if (isNil(vv)) {
                                            console.error('(!vv) : ', kkk, s);
                                            return;
                                        }
                                        const r = parseInt(vv as string);
                                        if (isSafeInteger(r)) {
                                            g.skill.set(s.key, r);
                                        } else {
                                            console.error('!(isSafeInteger(r)) : ', kkk, s, r);
                                            return;
                                        }
                                    },
                                    xgmExtendField: {bootstrap: {btnType: btnType}},
                                };
                                o[kkk + '_b_max'] = {
                                    label: 'max',
                                    type: 'button',
                                    cssClassName: 'd-inline',
                                    click() {
                                        g.skill.set(s.key, s.max);
                                        gmc!.fields[kkk].value = s.max;
                                        gmc!.fields[kkk].reload();
                                    },
                                    xgmExtendField: {bootstrap: {btnType: btnType}},
                                };
                                o[kkk + '_b_zero'] = {
                                    label: 'zero',
                                    type: 'button',
                                    cssClassName: 'd-inline',
                                    click() {
                                        const vv = gmc!.fields[kkk].toValue();
                                        g.skill.set(s.key, 0);
                                        gmc!.fields[kkk].value = 0;
                                        gmc!.fields[kkk].reload();
                                    },
                                    xgmExtendField: {bootstrap: {btnType: btnType}},
                                };
                                o[rId()] = {
                                    type: 'br',
                                };
                            } else {
                                o[kkk + '_BR'] = {
                                    label: ``,
                                    type: 'label',
                                    cssStyleText: 'margin: 1.5em 0;',
                                };
                            }
                            return assign<InitOptionsNoCustom['fields'], InitOptionsNoCustom['fields']>(acc, o);
                        }, {} as InitOptionsNoCustom['fields']),
                        [rId()]: {
                            section: GM_config.create('Relation Section'),
                            type: 'br',
                        },
                        ...Array.from(g.relation.table!.values()).reduce<InitOptionsNoCustom['fields']>((acc, s,) => {
                            const o: InitOptionsNoCustom['fields'] = {};
                            const kkk = 'Relation_' + s.key;
                            if (s.tag !== "none") {
                                o[kkk] = {
                                    label: s.name,
                                    type: 'number',
                                    default: g.relation.get(s.key),
                                    cssClassName: 'd-inline',
                                };
                                o[kkk + '_l'] = {
                                    label: `(max:${s.max})`,
                                    type: 'label',
                                    cssClassName: 'd-inline',
                                };
                                o[kkk + '_b'] = {
                                    label: 'set',
                                    type: 'button',
                                    cssClassName: 'd-inline',
                                    click() {
                                        const vv = gmc!.fields[kkk].toValue();
                                        if (isNil(vv)) {
                                            console.error('(!vv) : ', kkk, s);
                                            return;
                                        }
                                        const r = parseInt(vv as string);
                                        if (isSafeInteger(r)) {
                                            g.relation.set(s.key, r);
                                        } else {
                                            console.error('!(isSafeInteger(r)) : ', kkk, s, r);
                                            return;
                                        }
                                    },
                                    xgmExtendField: {bootstrap: {btnType: btnType}},
                                };
                                o[kkk + '_b_max'] = {
                                    label: 'max',
                                    type: 'button',
                                    cssClassName: 'd-inline',
                                    click() {
                                        g.relation.set(s.key, s.max);
                                        gmc!.fields[kkk].value = s.max;
                                        gmc!.fields[kkk].reload();
                                    },
                                    xgmExtendField: {bootstrap: {btnType: btnType}},
                                };
                                o[kkk + '_b_zero'] = {
                                    label: 'zero',
                                    type: 'button',
                                    cssClassName: 'd-inline',
                                    click() {
                                        const vv = gmc!.fields[kkk].toValue();
                                        g.relation.set(s.key, 0);
                                        gmc!.fields[kkk].value = 0;
                                        gmc!.fields[kkk].reload();
                                    },
                                    xgmExtendField: {bootstrap: {btnType: btnType}},
                                };
                                o[rId()] = {
                                    type: 'br',
                                };
                            } else {
                                o[kkk + '_BR'] = {
                                    label: ``,
                                    type: 'label',
                                    cssStyleText: 'margin: 1.5em 0;',
                                };
                            }
                            return assign<InitOptionsNoCustom['fields'], InitOptionsNoCustom['fields']>(acc, o);
                        }, {} as InitOptionsNoCustom['fields']),
                        [rId()]: {
                            section: GM_config.create('NPC Section'),
                            type: 'br',
                        },
                        ...Array.from(g.npcRelation.iterateIt().values()).reduce<InitOptionsNoCustom['fields']>((acc, s, ci) => {
                            const o: InitOptionsNoCustom['fields'] = {};
                            const kkk = 'NpcRelation_' + s.name;
                            o[rId()] = {
                                section: GM_config.create(`NpcRelation [${ci}] [${s.name}][${NpcName2CN(s.name)}]`),
                                type: 'br',
                            };
                            o[kkk + '_' + 'love'] = {
                                label: `${NpcName2CN(s.name)}:爱意love`,
                                type: 'number',
                                default: s.love,
                                cssClassName: 'd-inline',
                            };
                            o[kkk + '_' + 'love' + '_b'] = {
                                label: 'set',
                                type: 'button',
                                cssClassName: 'd-inline',
                                click() {
                                    const vv = gmc!.fields[kkk + '_' + 'love'].toValue();
                                    if (isNil(vv)) {
                                        console.error('(!vv) : ', kkk + '_' + 'love', s);
                                        return;
                                    }
                                    const r = parseInt(vv as string);
                                    if (isSafeInteger(r)) {
                                        console.log('set : ', kkk + '_' + 'love', s, r);
                                        s.love = r;
                                    } else {
                                        console.error('!(isSafeInteger(r)) : ', kkk + '_' + 'love', s, r);
                                        return;
                                    }
                                },
                                xgmExtendField: {bootstrap: {btnType: btnType}},
                            };
                            o[rId()] = {
                                type: 'br',
                            };
                            o[kkk + '_' + 'lust'] = {
                                label: `${NpcName2CN(s.name)}:性欲lust`,
                                type: 'number',
                                default: s.lust,
                                cssClassName: 'd-inline',
                            };
                            o[kkk + '_' + 'lust' + '_b'] = {
                                label: 'set',
                                type: 'button',
                                cssClassName: 'd-inline',
                                click() {
                                    const vv = gmc!.fields[kkk + '_' + 'lust'].toValue();
                                    if (isNil(vv)) {
                                        console.error('(!vv) : ', kkk + '_' + 'lust', s);
                                        return;
                                    }
                                    const r = parseInt(vv as string);
                                    if (isSafeInteger(r)) {
                                        console.log('set : ', kkk + '_' + 'lust', s, r);
                                        s.lust = r;
                                    } else {
                                        console.error('!(isSafeInteger(r)) : ', kkk + '_' + 'lust', s, r);
                                        return;
                                    }
                                },
                                xgmExtendField: {bootstrap: {btnType: btnType}},
                            };
                            o[rId()] = {
                                type: 'br',
                            };
                            o[kkk + '_' + 'dom'] = {
                                label: `${NpcName2CN(s.name)}:支配dom`,
                                type: 'number',
                                default: s.dom,
                                cssClassName: 'd-inline',
                            };
                            o[kkk + '_' + 'dom' + '_b'] = {
                                label: 'set',
                                type: 'button',
                                cssClassName: 'd-inline',
                                click() {
                                    const vv = gmc!.fields[kkk + '_' + 'dom'].toValue();
                                    if (isNil(vv)) {
                                        console.error('(!vv) : ', kkk + '_' + 'dom', s);
                                        return;
                                    }
                                    const r = parseInt(vv as string);
                                    if (isSafeInteger(r)) {
                                        console.log('set : ', kkk + '_' + 'dom', s, r);
                                        s.dom = r;
                                    } else {
                                        console.error('!(isSafeInteger(r)) : ', kkk + '_' + 'dom', s, r);
                                        return;
                                    }
                                },
                                xgmExtendField: {bootstrap: {btnType: btnType}},
                            };
                            o[rId()] = {
                                type: 'br',
                            };
                            o[kkk + '_' + 'rage'] = {
                                label: `${NpcName2CN(s.name)}:嫉妒rage`,
                                type: 'number',
                                default: s.rage,
                                cssClassName: 'd-inline',
                            };
                            o[kkk + '_' + 'rage' + '_b'] = {
                                label: 'set',
                                type: 'button',
                                cssClassName: 'd-inline',
                                click() {
                                    const vv = gmc!.fields[kkk + '_' + 'rage'].toValue();
                                    if (isNil(vv)) {
                                        console.error('(!vv) : ', kkk + '_' + 'rage', s);
                                        return;
                                    }
                                    const r = parseInt(vv as string);
                                    if (isSafeInteger(r)) {
                                        console.log('set : ', kkk + '_' + 'rage', s, r);
                                        s.rage = r;
                                    } else {
                                        console.error('!(isSafeInteger(r)) : ', kkk + '_' + 'rage', s, r);
                                        return;
                                    }
                                },
                                xgmExtendField: {bootstrap: {btnType: btnType}},
                            };
                            o[rId()] = {
                                type: 'br',
                            };
                            if (s.isSydney(s.npcRef)) {
                                o[kkk + '_' + 'purity'] = {
                                    label: `${NpcName2CN(s.name)}:纯洁purity`,
                                    type: 'number',
                                    default: s.purity,
                                    cssClassName: 'd-inline',
                                };
                                o[kkk + '_' + 'purity' + '_b'] = {
                                    label: 'set',
                                    type: 'button',
                                    cssClassName: 'd-inline',
                                    click() {
                                        const vv = gmc!.fields[kkk + '_' + 'purity'].toValue();
                                        if (isNil(vv)) {
                                            console.error('(!vv) : ', kkk + '_' + 'purity', s);
                                            return;
                                        }
                                        const r = parseInt(vv as string);
                                        if (isSafeInteger(r)) {
                                            console.log('set : ', kkk + '_' + 'purity', s, r);
                                            s.purity = r;
                                        } else {
                                            console.error('!(isSafeInteger(r)) : ', kkk + '_' + 'purity', s, r);
                                            return;
                                        }
                                    },
                                    xgmExtendField: {bootstrap: {btnType: btnType}},
                                };
                                o[rId()] = {
                                    type: 'br',
                                };
                                o[kkk + '_' + 'corruption'] = {
                                    label: `${NpcName2CN(s.name)}:堕落corruption`,
                                    type: 'number',
                                    default: s.corruption,
                                    cssClassName: 'd-inline',
                                };
                                o[kkk + '_' + 'corruption' + '_b'] = {
                                    label: 'set',
                                    type: 'button',
                                    cssClassName: 'd-inline',
                                    click() {
                                        const vv = gmc!.fields[kkk + '_' + 'corruption'].toValue();
                                        if (isNil(vv)) {
                                            console.error('(!vv) : ', kkk + '_' + 'corruption', s);
                                            return;
                                        }
                                        const r = parseInt(vv as string);
                                        if (isSafeInteger(r)) {
                                            console.log('set : ', kkk + '_' + 'corruption', s, r);
                                            s.corruption = r;
                                        } else {
                                            console.error('!(isSafeInteger(r)) : ', kkk + '_' + 'corruption', s, r);
                                            return;
                                        }
                                    },
                                    xgmExtendField: {bootstrap: {btnType: btnType}},
                                };
                                o[rId()] = {
                                    type: 'br',
                                };
                            }
                            return assign<InitOptionsNoCustom['fields'], InitOptionsNoCustom['fields']>(acc, o);
                        }, {} as InitOptionsNoCustom['fields']),
                        [rId()]: {
                            section: GM_config.create('PlayerState Section'),
                            type: 'br',
                        },
                        ...Array.from(g.playerState.table!.values()).reduce<InitOptionsNoCustom['fields']>((acc, s,) => {
                            const o: InitOptionsNoCustom['fields'] = {};
                            const kkk = 'PlayerState_' + s.key;
                            if (s.tag !== "none") {
                                o[kkk] = {
                                    label: s.name,
                                    type: 'number',
                                    default: g.playerState.get(s.key),
                                    cssClassName: 'd-inline',
                                };
                                o[kkk + '_l'] = {
                                    label: `(max:${s.max})`,
                                    type: 'label',
                                    cssClassName: 'd-inline',
                                };
                                o[kkk + '_b'] = {
                                    label: 'set',
                                    type: 'button',
                                    cssClassName: 'd-inline',
                                    click() {
                                        const vv = gmc!.fields[kkk].toValue();
                                        if (isNil(vv)) {
                                            console.error('(!vv) : ', kkk, s);
                                            return;
                                        }
                                        const r = parseInt(vv as string);
                                        if (isSafeInteger(r)) {
                                            g.playerState.set(s.key, r);
                                        }
                                    },
                                    xgmExtendField: {bootstrap: {btnType: btnType}},
                                };
                                o[kkk + '_b_max'] = {
                                    label: 'max',
                                    type: 'button',
                                    cssClassName: 'd-inline',
                                    click() {
                                        g.relation.set(s.key, s.max);
                                        gmc!.fields[kkk].value = s.max;
                                        gmc!.fields[kkk].reload();
                                    },
                                    xgmExtendField: {bootstrap: {btnType: btnType}},
                                };
                                o[kkk + '_b_zero'] = {
                                    label: 'zero',
                                    type: 'button',
                                    cssClassName: 'd-inline',
                                    click() {
                                        const vv = gmc!.fields[kkk].toValue();
                                        g.relation.set(s.key, 0);
                                        gmc!.fields[kkk].value = 0;
                                        gmc!.fields[kkk].reload();
                                    },
                                    xgmExtendField: {bootstrap: {btnType: btnType}},
                                };
                                o[rId()] = {
                                    type: 'br',
                                };
                            } else {
                                o[kkk + '_BR'] = {
                                    label: ``,
                                    type: 'label',
                                    cssStyleText: 'margin: 1.5em 0;',
                                };
                            }
                            return assign<InitOptionsNoCustom['fields'], InitOptionsNoCustom['fields']>(acc, o);
                        }, {} as InitOptionsNoCustom['fields']),
                        [rId()]: {
                            type: 'br',
                        },
                        'Get_sexStats_Value_b': {
                            label: 'Get_sexStats',
                            type: 'button',
                            click() {
                                const fr = GetValue('sexStats', unsafeWindow);
                                gmc!.fields['Get_sexStats_Value_r'].value = JSON.stringify(fr, undefined, 2);
                                gmc!.fields['Get_sexStats_Value_r'].reload();
                            },
                            cssClassName: 'd-inline',
                            xgmExtendField: {bootstrap: {btnType: btnType}},
                        },
                        'Get_sexStats_Value_r': {
                            type: 'textarea',
                        },
                        [rId()]: {
                            type: 'br',
                        },
                        // name: {
                        //     label: 'Name',
                        //     type: 'text',
                        //     default: 'Joe Simmons',
                        // },
                        // age: {
                        //     label: 'Age',
                        //     type: 'unsigned int',
                        //     default: 19,
                        // },
                        // gender: {
                        //     options: ['Male', 'Female'],
                        //     label: 'Gender',
                        //     type: 'radio',
                        //     default: 'Male',
                        // },
                        // income: {
                        //     labelPos: 'right',
                        //     label: 'Income',
                        //     type: 'float',
                        //     default: 50000.0,
                        // },
                        // status: {
                        //     label: 'Married',
                        //     labelPos: 'above',
                        //     type: 'checkbox',
                        //     default: false,
                        // },
                        // work: {
                        //     label: 'Job',
                        //     type: 'select',
                        //     labelPos: 'below',
                        //     options: ['Carpenter', 'Truck Driver'],
                        //     default: 'Truck Driver',
                        // },
                        // bunchOtext: {
                        //     label: 'Bunch of Text',
                        //     type: 'textarea',
                        //     default: "I actually did't realize we had this field until recently...",
                        // },
                        // magic: {
                        //     label: 'Magic Button',
                        //     type: 'button',
                        //     click() {
                        //         alert('Magic works!');
                        //     },
                        // },
                        // upperLeft: {
                        //     section: 'Check some boxes',
                        //     type: 'checkbox',
                        //     default: false,
                        // },
                        // upperLeftMiddle: {
                        //     type: 'checkbox',
                        //     default: false,
                        // },
                        // upperRightMiddle: {
                        //     type: 'checkbox',
                        //     default: false,
                        // },
                        // upperRight: {
                        //     type: 'checkbox',
                        //     default: false,
                        // },
                        // middleLeft: {
                        //     section: [],
                        //     type: 'checkbox',
                        //     default: false,
                        // },
                        // middleLeftMiddle: {
                        //     type: 'checkbox',
                        //     default: false,
                        // },
                        // middleRightMiddle: {
                        //     type: 'checkbox',
                        //     default: false,
                        // },
                        // middleRight: {
                        //     type: 'checkbox',
                        //     default: false,
                        // },
                        // bottomLeft: {
                        //     section: [],
                        //     type: 'checkbox',
                        //     default: false,
                        // },
                        // bottomLeftMiddle: {
                        //     type: 'checkbox',
                        //     default: false,
                        // },
                        // bottomRightMiddle: {
                        //     type: 'checkbox',
                        //     default: false,
                        // },
                        // bottomRight: {
                        //     type: 'checkbox',
                        //     default: false,
                        // },
                        // labelLess: {
                        //     section: GM_config.create('New Section'),
                        //     type: 'text',
                        //     default: 'This value is not saved.',
                        //     save: false,
                        // },
                        // alertTextField: {
                        //     label: 'Alert Text',
                        //     type: 'button',
                        //     click() {
                        //         alert(gmc.fields['labelLess'].toValue());
                        //         gmc.fields['labelLess'].value = 'Value changed.';
                        //         gmc.fields['labelLess'].reload();
                        //     },
                        // },
                        // customCSS: {
                        //     label: 'Enter CSS',
                        //     type: 'text',
                        //     save: false,
                        //     default: '',
                        // },
                        // validCSS: {
                        //     type: 'hidden',
                        //     default: '',
                        // },
                    },
                events: {
                    save(values) {
                        // All the values that aren't saved are passed to this function
                        // for (i in values) alert(values[i]);
                    },
                    open(doc) {
                        doc.addEventListener('keydown', (event) => {
                            // console.log('keydown', event);
                            if (event.altKey && (event.key === 'Q' || event.key === 'q')) {
                                if (gmc!.isOpen) {
                                    gmc!.close();
                                } else {
                                    // gmc!.reCreateFields();
                                    gmc = gmcCreator();
                                    gmc!.open();
                                }
                            }
                        });
                    },
                },
            });
    };
    let gmc: undefined | GM_configStruct = undefined;
    window.addEventListener('keydown', (event) => {
        // console.log('keydown', event);
        if (event.altKey && (event.key === 'Q' || event.key === 'q')) {
            if (gmc && gmc.isOpen) {
                gmc.close();
            } else {
                // if (!gmc) {
                //     gmc = gmcCreator();
                // } else {
                //     gmc.reCreateFields();
                // }
                gmc = gmcCreator();
                gmc.open();
            }
        }
    });
    if (true) {
        const startBanner = document.createElement('div');
        startBanner.id = 'startBanner';
        startBanner.innerText = 'Degrees-of-Lewdity Cheats Mod';
        startBanner.style.cssText = 'position: fixed;right: 1px;bottom: 1px;' +
            'font-size: 1em;z-index: 1001;user-select: none;' +
            'border: gray dashed 2px;color: gray;padding: .25em;';
        startBanner.addEventListener('click', () => {
            if (gmc && gmc.isOpen) {
                gmc.close();
            } else {
                gmc = gmcCreator();
                gmc.open();
            }
        });
        document.body.appendChild(startBanner);
    }
})().catch(E => {
    console.error(E);
});

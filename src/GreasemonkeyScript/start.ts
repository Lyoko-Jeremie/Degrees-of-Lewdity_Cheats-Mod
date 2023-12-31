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
import {NpcInfo2CN, NpcInfoLimitString, NpcName2CN, NpcRelation} from "../Cheats/NpcRelation";
import {PlayerState} from "../Cheats/PlayerState";
import {FastCheat} from "../Cheats/FastCheat";
import {Garden} from "../Cheats/Garden";
import {PassageTracer} from "../Cheats/PassageTracer";

const btnType: BootstrapBtnType = 'secondary';

class History {
    constructor(
        public k: string = 'History',
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
        return this.read().reverse();
    }
}

interface GlobalInfo {
    History_GetValue: History,
    History_Play: History,
    skill: Skill,
    relation: Relation,
    state: State,
    npcRelation: NpcRelation,
    playerState: PlayerState,
    fastCheat: FastCheat,
    garden: Garden,
    passageTracer: PassageTracer,
}

const divModCss = `
#MyConfig_wrapper {
    padding: 1em;
}
`;

export class ModStart {
    constructor(
        public thisWindow: Window,
    ) {
        setTimeout(this.waitKDLoadingFinished.bind(this), 100);
        this.isHttpMode = location.protocol.startsWith('http');
    }

    isHttpMode = true;

    rootNode?: HTMLDivElement;

    private waitInitCounter = 0;
    private g?: GlobalInfo;
    private gmc: undefined | GM_configStruct = undefined;

    private initG = () => {
        if (!this.rootNode) {
            this.rootNode = document.createElement('div');
            // this.rootNode.id = 'rootNodeModLoaderGui';
            this.rootNode.style.cssText = 'z-index: 1002;';
            document.body.appendChild(this.rootNode);
        }
        if (!this.g) {
            console.log('initG');
            this.g = {
                History_GetValue: new History('SearchHistory'),
                History_Play: new History('PlayHistory'),
                skill: new Skill(this.thisWindow),
                relation: new Relation(this.thisWindow),
                state: new State(this.thisWindow),
                npcRelation: new NpcRelation(this.thisWindow),
                playerState: new PlayerState(this.thisWindow),
                garden: new Garden(this.thisWindow),
                fastCheat: undefined as any,    // later init
                passageTracer: new PassageTracer(this.thisWindow),
            };
            this.g.fastCheat = new FastCheat(this.g.skill, this.g.relation, this.g.state, this.g.npcRelation, this.g.playerState);
        }
    };
    private gmcCreator = () => {
        this.initG();
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
                css: inlineGMCss + '\n' + (this.isHttpMode ? inlineBootstrap : divModCss),
                'frame': (this.isHttpMode ? undefined : this.rootNode),
                'fields': // Fields object
                    {
                        ['Close_b']: {
                            label: 'Close',
                            type: 'button',
                            click: () => {
                                this.gmc!.close();
                            },
                            // cssStyleText: 'display: inline-block;',
                            cssClassName: 'd-inline',
                            xgmExtendField: {bootstrap: {btnType: btnType}},
                        },
                        [rId()]: {
                            section: GM_config.create('FastCheat Section'),
                            type: 'br',
                        },
                        ['FastCheat_' + 'fullState' + '_b']: {
                            label: 'FastCheat ' + 'fullState',
                            type: 'button',
                            click: () => {
                                this.g!.fastCheat.fullState();
                            },
                            // cssStyleText: 'display: inline-block;',
                            cssClassName: 'd-inline',
                            xgmExtendField: {bootstrap: {btnType: btnType}},
                        },
                        ['FastCheat_' + 'playerStateFull' + '_b']: {
                            label: 'FastCheat ' + 'playerStateFull',
                            type: 'button',
                            click: () => {
                                this.g!.fastCheat.playerStateFull();
                            },
                            // cssStyleText: 'display: inline-block;',
                            cssClassName: 'd-inline',
                            xgmExtendField: {bootstrap: {btnType: btnType}},
                        },
                        ['FastCheat_' + 'resetState' + '_b']: {
                            label: 'FastCheat ' + 'resetState',
                            type: 'button',
                            click: () => {
                                this.g!.fastCheat.resetState();
                            },
                            // cssStyleText: 'display: inline-block;',
                            cssClassName: 'd-inline',
                            xgmExtendField: {bootstrap: {btnType: btnType}},
                        },
                        ['FastCheat_' + 'noCrime' + '_b']: {
                            label: 'FastCheat ' + 'noCrime',
                            type: 'button',
                            click: () => {
                                this.g!.fastCheat.noCrime();
                            },
                            // cssStyleText: 'display: inline-block;',
                            cssClassName: 'd-inline',
                            xgmExtendField: {bootstrap: {btnType: btnType}},
                        },
                        ['FastCheat_' + 'fullSpray' + '_b']: {
                            label: 'FastCheat ' + 'fullSpray',
                            type: 'button',
                            click: () => {
                                this.g!.fastCheat.fullSpray();
                            },
                            // cssStyleText: 'display: inline-block;',
                            cssClassName: 'd-inline',
                            xgmExtendField: {bootstrap: {btnType: btnType}},
                        },
                        ['garden' + '_' + 'fullGarden' + '_b']: {
                            label: 'FastCheat ' + 'fullGarden',
                            type: 'button',
                            click: () => {
                                this.g!.garden.fullAll();
                            },
                            // cssStyleText: 'display: inline-block;',
                            cssClassName: 'd-inline',
                            xgmExtendField: {bootstrap: {btnType: btnType}},
                        },
                        [rId()]: {
                            section: GM_config.create('Play Section (Dangerous)'),
                            type: 'br',
                        },
                        // 'Play_F': {
                        //     label: `Play`,
                        //     type: 'text',
                        //     cssClassName: 'd-inline',
                        // },
                        'Play_F': {
                            label: `Play`,
                            type: 'datalist',
                            cssClassName: 'd-inline',
                            options: this.g!.History_Play.getList(),
                        },
                        'Play_b': {
                            label: 'Play',
                            type: 'button',
                            click: () => {
                                const vv = this.gmc!.fields['Play_F'].toValue();
                                const vvv = this.gmc!.fields['Play_F'].value;
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
                                this.g!.History_Play.add(vv);
                                if (SugarCube.Story.has(vv)) {
                                    SugarCube.Engine.play(vv)
                                }
                            },
                            // cssStyleText: 'display: inline-block;',
                            cssClassName: 'd-inline',
                            xgmExtendField: {bootstrap: {btnType: btnType}},
                        },
                        [rId()]: {
                            section: GM_config.create('Value Find Section'),
                            type: 'br',
                        },
                        'FindValue_F': {
                            label: `FindValue`,
                            type: 'text',
                            cssClassName: 'd-inline',
                        },
                        'FindValue_b': {
                            label: 'Find',
                            type: 'button',
                            click: () => {
                                const vv = this.gmc!.fields['FindValue_F'].toValue();
                                if (isNil(vv)) {
                                    console.error('FindValue_b (!vv) : ');
                                    return;
                                }
                                const r = parseInt(vv as string);
                                if (isSafeInteger(r)) {
                                    const fr = FindValue(r, this.thisWindow);
                                    this.gmc!.fields['FindValue_r'].value = JSON.stringify(fr, undefined, 2);
                                    this.gmc!.fields['FindValue_r'].reload();
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
                            options: this.g!.History_GetValue.getList(),
                        },
                        'GetValue_b': {
                            label: 'Get',
                            type: 'button',
                            // keydown: (ev: KeyboardEvent) => {
                            //     console.log('onkeydown', ev);
                            //     const vvv = gmc!.fields['GetValue_K'].value;
                            //     console.log('vvv', vvv);
                            // },
                            click: () => {
                                const vv = this.gmc!.fields['GetValue_K'].toValue();
                                const vvv = this.gmc!.fields['GetValue_K'].value;
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
                                this.g!.History_GetValue.add(vv);
                                const fr = GetValue(vv, this.thisWindow);
                                this.gmc!.fields['GetValue_r'].value = JSON.stringify(fr, undefined, 2);
                                this.gmc!.fields['GetValue_r'].reload();
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
                        ...Array.from(this.g!.state.table!.values()).reduce<InitOptionsNoCustom['fields']>((acc, s,) => {
                            const o: InitOptionsNoCustom['fields'] = {};
                            const kkk = 'State_' + s.key;
                            if (s.tag !== "none") {
                                o[kkk] = {
                                    label: s.name,
                                    type: 'number',
                                    default: this.g!.state.get(s.key),
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
                                    click: () => {
                                        const vv = this.gmc!.fields[kkk].toValue();
                                        if (isNil(vv)) {
                                            console.error('(!vv) : ', kkk, s);
                                            return;
                                        }
                                        const r = parseInt(vv as string);
                                        if (isSafeInteger(r)) {
                                            this.g!.state.set(s.key, r);
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
                                    click: () => {
                                        this.g!.state.set(s.key, s.max);
                                        this.gmc!.fields[kkk].value = s.max;
                                        this.gmc!.fields[kkk].reload();
                                    },
                                    xgmExtendField: {bootstrap: {btnType: btnType}},
                                };
                                o[kkk + '_b_zero'] = {
                                    label: 'zero',
                                    type: 'button',
                                    cssClassName: 'd-inline',
                                    click: () => {
                                        const vv = this.gmc!.fields[kkk].toValue();
                                        this.g!.state.set(s.key, 0);
                                        this.gmc!.fields[kkk].value = 0;
                                        this.gmc!.fields[kkk].reload();
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
                        ...Array.from(this.g!.skill.table!.values()).reduce<InitOptionsNoCustom['fields']>((acc, s,) => {
                            const o: InitOptionsNoCustom['fields'] = {};
                            const kkk = 'Skill_' + s.key;
                            if (s.tag !== "none") {
                                o[kkk] = {
                                    label: s.name,
                                    type: 'number',
                                    default: this.g!.skill.get(s.key),
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
                                    click: () => {
                                        const vv = this.gmc!.fields[kkk].toValue();
                                        if (isNil(vv)) {
                                            console.error('(!vv) : ', kkk, s);
                                            return;
                                        }
                                        const r = parseInt(vv as string);
                                        if (isSafeInteger(r)) {
                                            this.g!.skill.set(s.key, r);
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
                                    click: () => {
                                        this.g!.skill.set(s.key, s.max);
                                        this.gmc!.fields[kkk].value = s.max;
                                        this.gmc!.fields[kkk].reload();
                                    },
                                    xgmExtendField: {bootstrap: {btnType: btnType}},
                                };
                                o[kkk + '_b_zero'] = {
                                    label: 'zero',
                                    type: 'button',
                                    cssClassName: 'd-inline',
                                    click: () => {
                                        const vv = this.gmc!.fields[kkk].toValue();
                                        this.g!.skill.set(s.key, 0);
                                        this.gmc!.fields[kkk].value = 0;
                                        this.gmc!.fields[kkk].reload();
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
                        ...Array.from(this.g!.relation.table!.values()).reduce<InitOptionsNoCustom['fields']>((acc, s,) => {
                            const o: InitOptionsNoCustom['fields'] = {};
                            const kkk = 'Relation_' + s.key;
                            if (s.tag !== "none") {
                                o[kkk] = {
                                    label: s.name,
                                    type: 'number',
                                    default: this.g!.relation.get(s.key),
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
                                    click: () => {
                                        const vv = this.gmc!.fields[kkk].toValue();
                                        if (isNil(vv)) {
                                            console.error('(!vv) : ', kkk, s);
                                            return;
                                        }
                                        const r = parseInt(vv as string);
                                        if (isSafeInteger(r)) {
                                            this.g!.relation.set(s.key, r);
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
                                    click: () => {
                                        this.g!.relation.set(s.key, s.max);
                                        this.gmc!.fields[kkk].value = s.max;
                                        this.gmc!.fields[kkk].reload();
                                    },
                                    xgmExtendField: {bootstrap: {btnType: btnType}},
                                };
                                o[kkk + '_b_zero'] = {
                                    label: 'zero',
                                    type: 'button',
                                    cssClassName: 'd-inline',
                                    click: () => {
                                        const vv = this.gmc!.fields[kkk].toValue();
                                        this.g!.relation.set(s.key, 0);
                                        this.gmc!.fields[kkk].value = 0;
                                        this.gmc!.fields[kkk].reload();
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
                        ...Array.from(this.g!.npcRelation.iterateIt().values()).reduce<InitOptionsNoCustom['fields']>((acc, s, ci) => {
                            const o: InitOptionsNoCustom['fields'] = {};
                            const kkk = 'NpcRelation_' + s.name;
                            const npc = NpcName2CN(s.name);
                            o[rId()] = {
                                section: GM_config.create(
                                    `NpcRelation [${ci}] [${s.name}][${npc.cnName}]--${npc.dec}`
                                ),
                                type: 'br',
                            };
                            npc.infoList.forEach(infoName => {
                                o[kkk + '_' + infoName] = {
                                    label: `${npc.cnName}:${NpcInfo2CN(s.name, infoName)}:${infoName}:${NpcInfoLimitString(s.name, infoName)}`,
                                    type: 'number',
                                    default: s[infoName],
                                    cssClassName: 'd-inline',
                                };
                                o[kkk + '_' + infoName + '_b'] = {
                                    label: 'set',
                                    type: 'button',
                                    cssClassName: 'd-inline',
                                    click: () => {
                                        const vv = this.gmc!.fields[kkk + '_' + infoName].toValue();
                                        if (isNil(vv)) {
                                            console.error('(!vv) : ', kkk + '_' + infoName, s);
                                            return;
                                        }
                                        const r = parseInt(vv as string);
                                        if (isSafeInteger(r)) {
                                            console.log('set : ', kkk + '_' + infoName, s, r);
                                            s[infoName] = r;
                                        } else {
                                            console.error('!(isSafeInteger(r)) : ', kkk + '_' + infoName, s, r);
                                            return;
                                        }
                                    },
                                    xgmExtendField: {bootstrap: {btnType: btnType}},
                                };
                                o[rId()] = {
                                    type: 'br',
                                };
                            });
                            return assign<InitOptionsNoCustom['fields'], InitOptionsNoCustom['fields']>(acc, o);
                        }, {} as InitOptionsNoCustom['fields']),
                        [rId()]: {
                            section: GM_config.create('PlayerState Section'),
                            type: 'br',
                        },
                        ...Array.from(this.g!.playerState.table!.values()).reduce<InitOptionsNoCustom['fields']>((acc, s,) => {
                            const o: InitOptionsNoCustom['fields'] = {};
                            const kkk = 'PlayerState_' + s.key;
                            if (s.tag !== "none") {
                                o[kkk] = {
                                    label: s.name,
                                    type: 'number',
                                    default: this.g!.playerState.get(s.key),
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
                                    click: () => {
                                        const vv = this.gmc!.fields[kkk].toValue();
                                        if (isNil(vv)) {
                                            console.error('(!vv) : ', kkk, s);
                                            return;
                                        }
                                        const r = parseInt(vv as string);
                                        if (isSafeInteger(r)) {
                                            this.g!.playerState.set(s.key, r);
                                        }
                                    },
                                    xgmExtendField: {bootstrap: {btnType: btnType}},
                                };
                                o[kkk + '_b_max'] = {
                                    label: 'max',
                                    type: 'button',
                                    cssClassName: 'd-inline',
                                    click: () => {
                                        this.g!.relation.set(s.key, s.max);
                                        this.gmc!.fields[kkk].value = s.max;
                                        this.gmc!.fields[kkk].reload();
                                    },
                                    xgmExtendField: {bootstrap: {btnType: btnType}},
                                };
                                o[kkk + '_b_zero'] = {
                                    label: 'zero',
                                    type: 'button',
                                    cssClassName: 'd-inline',
                                    click: () => {
                                        const vv = this.gmc!.fields[kkk].toValue();
                                        this.g!.relation.set(s.key, 0);
                                        this.gmc!.fields[kkk].value = 0;
                                        this.gmc!.fields[kkk].reload();
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
                            click: () => {
                                const fr = GetValue('sexStats', this.thisWindow);
                                this.gmc!.fields['Get_sexStats_Value_r'].value = JSON.stringify(fr, undefined, 2);
                                this.gmc!.fields['Get_sexStats_Value_r'].reload();
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
                    open: (doc) => {
                        if (this.isHttpMode) {
                            doc.addEventListener('keydown', (event) => {
                                console.log('open keydown', event);
                                if (event.altKey && (event.key === 'Q' || event.key === 'q')) {
                                    if (event.shiftKey) {
                                        if (this.gmc && this.gmc.isOpen) {
                                            this.gmc.close();
                                        }
                                        return event.preventDefault();
                                    }
                                    if (this.gmc && this.gmc.isOpen) {
                                        this.gmc!.close();
                                    } else {
                                        // gmc!.reCreateFields();
                                        this.gmc = this.gmcCreator();
                                        this.gmc!.open();
                                    }
                                    return event.preventDefault();
                                }
                            });
                        }
                    },
                },
            });
    };


    isInit = false;
    initMod = () => {
        if (this.isInit) {
            console.warn('[Degrees-of-Lewdity Cheats Mod] isInit duplicate init');
            return;
        }
        this.isInit = true;

        window.addEventListener('keydown', (event) => {
            console.log('initMod keydown', event);
            if (event.altKey && (event.key === 'Q' || event.key === 'q')) {
                if (event.shiftKey) {
                    if (this.gmc && this.gmc.isOpen) {
                        this.gmc.close();
                    }
                    return event.preventDefault();
                }
                if (this.gmc && this.gmc.isOpen) {
                    this.gmc.close();
                } else {
                    // if (!gmc) {
                    //     gmc = gmcCreator();
                    // } else {
                    //     gmc.reCreateFields();
                    // }
                    this.gmc = this.gmcCreator();
                    this.gmc.open();
                }
                return event.preventDefault();
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
                if (this.gmc && this.gmc.isOpen) {
                    this.gmc.close();
                } else {
                    this.gmc = this.gmcCreator();
                    this.gmc.open();
                }
            });
            document.body.appendChild(startBanner);
        }
    };
    private waitKDLoadingFinished = () => {
        if (this.waitInitCounter > 100) {
            // don't wait it
            console.log('[Degrees-of-Lewdity Cheats Mod] (waitInitCounter > 100) dont wait it');
            return;
        }
        if (!this.thisWindow.SugarCube) {
            ++this.waitInitCounter;
            setTimeout(this.waitKDLoadingFinished, 500);
            return;
        }
        this.initMod();
        console.log('waitKDLoadingFinished ok');
    };

}


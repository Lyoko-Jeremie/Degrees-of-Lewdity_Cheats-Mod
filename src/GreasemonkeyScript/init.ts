import {GM_config, Field, InitOptionsNoCustom, GM_configStruct} from '../GM_config_TS/gm_config';
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

import {assign, parseInt, isSafeInteger} from 'lodash';

import {Skill} from '../Cheats/Skill';
import {Relation} from '../Cheats/Relation';
import {State} from '../Cheats/State';
import {FindValue} from '../Cheats/Tools';

;

(async () => {
    const skill = new Skill(unsafeWindow);
    const relation = new Relation(unsafeWindow);
    const state = new State(unsafeWindow);
    const gmcCreator = () => {
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
                                if (!vv) {
                                    console.error('FindValue_b (!vv) : ');
                                    return;
                                }
                                const r = parseInt(vv as string);
                                if (isSafeInteger(r)) {
                                    const fr = FindValue(r, unsafeWindow);
                                    gmc!.fields['FindValue_r'].value = JSON.stringify(fr);
                                    gmc!.fields['FindValue_r'].reload();
                                }
                            },
                            // cssStyleText: 'display: inline-block;',
                            cssClassName: 'd-inline btn-sm',
                        },
                        'FindValue_r': {
                            type: 'textarea',
                        },
                        [rId()]: {
                            section: GM_config.create('State Section'),
                            type: 'br',
                        },
                        ...Array.from(state.table!.values()).reduce<InitOptionsNoCustom['fields']>((acc, s,) => {
                            const o: InitOptionsNoCustom['fields'] = {};
                            const kkk = 'State_' + s.key;
                            if (s.tag !== "none") {
                                o[kkk] = {
                                    label: s.name,
                                    type: 'number',
                                    default: state.get(s.key),
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
                                        if (!vv) {
                                            console.error('(!vv) : ', kkk, s);
                                            return;
                                        }
                                        const r = parseInt(vv as string);
                                        if (isSafeInteger(r)) {
                                            state.set(s.key, r);
                                        }
                                    },
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
                        ...Array.from(skill.table!.values()).reduce<InitOptionsNoCustom['fields']>((acc, s,) => {
                            const o: InitOptionsNoCustom['fields'] = {};
                            const kkk = 'Skill_' + s.key;
                            if (s.tag !== "none") {
                                o[kkk] = {
                                    label: s.name,
                                    type: 'number',
                                    default: skill.get(s.key),
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
                                        if (!vv) {
                                            console.error('(!vv) : ', kkk, s);
                                            return;
                                        }
                                        const r = parseInt(vv as string);
                                        if (isSafeInteger(r)) {
                                            skill.set(s.key, r);
                                        }
                                    },
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
                        ...Array.from(relation.table!.values()).reduce<InitOptionsNoCustom['fields']>((acc, s,) => {
                            const o: InitOptionsNoCustom['fields'] = {};
                            const kkk = 'Relation_' + s.key;
                            if (s.tag !== "none") {
                                o[kkk] = {
                                    label: s.name,
                                    type: 'number',
                                    default: relation.get(s.key),
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
                                        if (!vv) {
                                            console.error('(!vv) : ', kkk, s);
                                            return;
                                        }
                                        const r = parseInt(vv as string);
                                        if (isSafeInteger(r)) {
                                            relation.set(s.key, r);
                                        }
                                    },
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

import {GM_config} from '../GM_config_TS/gm_config';
// https://stackoverflow.com/questions/42631645/webpack-import-typescript-module-both-normally-and-as-raw-string
// import inlineGMCss from 'raw-loader!../inlineText/GM.css';
import inlineGMCss from '../inlineText/GM.css?inlineText';

(async () => {
    // font-family: "Consolas",monospace;
    let gmc = new GM_config(
        {
            'id': 'MyConfig', // The id used for this instance of GM_config
            'title': 'Script Settings', // Panel Title
            css: inlineGMCss,
            'fields': // Fields object
                {
                    'install_EnchantedRestraintsPatch': {
                        label: 'install EnchantedRestraintsPatch',
                        type: 'button',
                        click() {
                            // // @ts-ignore
                            // unsafeWindow.KDOptOut = true;
                            // EnchantedRestraintsPatch();
                            // unsafeWindow.KinkyDungeonMod_EnchantedRestraints.Cheats.setupHook(unsafeWindow);
                        },
                        cssStyleText: 'display: inline-block;',
                        cssClassName: 'flex',
                    },
                    'br1': {
                        type: 'br',
                    },
                },
            events: {
                save(values) {
                    // All the values that aren't saved are passed to this function
                    // for (i in values) alert(values[i]);
                },
                open(doc) {
                    doc.addEventListener('keydown', (event) => {
                        console.log('keydown', event);
                        if (event.altKey && (event.key === 'Q' || event.key === 'q')) {
                            if (gmc.isOpen) {
                                gmc.close();
                            } else {
                                gmc.open();
                            }
                        }
                    });
                },
            },
        });
    window.addEventListener('keydown', (event) => {
        console.log('keydown', event);
        if (event.altKey && (event.key === 'Q' || event.key === 'q')) {
            if (gmc.isOpen) {
                gmc.close();
            } else {
                gmc.open();
            }
        }
    });
})().catch(E => {
    console.error(E);
});

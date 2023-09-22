export {};


declare global {
    interface Window {
        SugarCube: {
            State: {
                active: {
                    variables: {
                        [key: string]: any,
                        NPCNameList: string[],
                        NPCName: any[],
                    },
                },
                variables: {
                    [key: string]: any,
                    NPCNameList: string[],
                    NPCName: any[],
                },
                temporary: {
                    [key: string]: any,
                },
            },
        };
        V: {
            [key: string]: any,
            NPCNameList: string[],
            NPCName: any[],
        };
        T: {
            [key: string]: any,
        };

        jQuery: any;
    }

    var SugarCube: SugarCube;
}

interface SugarCube {
    Browser,
    Config,
    Dialog,
    Engine,
    Fullscreen,
    Has,
    L10n,
    Macro,
    Passage,
    Save,
    Scripting,
    Setting,
    SimpleAudio,
    State,
    Story,
    UI,
    UIBar,
    DebugBar,
    Util,
    Visibility,
    Wikifier,
    session,
    settings,
    setup,
    storage,
    version
}

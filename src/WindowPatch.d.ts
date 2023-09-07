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
        },
    }
}

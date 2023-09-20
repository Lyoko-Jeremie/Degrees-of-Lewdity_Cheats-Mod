import {ModStart} from './start';

;

(async () => {
    const ms = new ModStart(unsafeWindow);
    ms.initMod();
})().catch(E => {
    console.error(E);
});

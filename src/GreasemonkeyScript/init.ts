import {ModStart} from './start';

;

(async () => {
    const ms = new ModStart();
    ms.initMod();
})().catch(E => {
    console.error(E);
});

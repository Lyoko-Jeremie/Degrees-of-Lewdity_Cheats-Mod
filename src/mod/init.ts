import {ModStart} from '../GreasemonkeyScript/start';

(async () => {
    window.jQuery(document).on(":passageend", () => {
        const ms = new ModStart(window);
        // ms.initMod();
    });
})();

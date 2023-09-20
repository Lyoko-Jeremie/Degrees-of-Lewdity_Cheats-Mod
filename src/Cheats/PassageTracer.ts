type whenPassageCome = (passageName: string) => void;

export class PassageTracer {
    constructor(
        public thisW: Window,
    ) {
        console.log('PassageTracer() this.thisW.jQuery', this.thisW.jQuery);
        console.log('PassageTracer() this.thisW.jQuery(document)', this.thisW.jQuery(document));
        this.thisW.jQuery(document).on(":passageend", () => {
            this.newPassageCome();
        });
    }

    private whenPassageComeCallback: whenPassageCome[] = [];

    addCallback(cb: whenPassageCome) {
        this.whenPassageComeCallback.push(cb);
    }

    newPassageCome() {
        const pe = Array.from(document.getElementsByClassName('passage'));
        if (pe.length !== 1) {
            console.log('newPassageCome() (pe.length !== 0)', pe);
            return;
        }
        const p: HTMLDivElement = pe[0] as HTMLDivElement;
        const dpName = p.getAttribute('data-passage');
        if (!dpName) {
            console.log('newPassageCome() (!dpName)', p);
            return;
        }
        console.log('newPassageCome() dpName', dpName);
        // switch (dpName) {
        //     case 'Stall Sell':
        //         // the sell event
        //         console.log('newPassageCome() Stall Sell');
        //         break;
        //     case 'Stall Attention':
        //         break;
        //     default:
        //         break;
        // }
        for (let i = 0; i < this.whenPassageComeCallback.length; i++) {
            const cb = this.whenPassageComeCallback[i];
            cb(dpName);
        }
    }

    // document.getElementsByClassName('passage')

    // :passageinit
    // stall_cost
    // enemytrust

}

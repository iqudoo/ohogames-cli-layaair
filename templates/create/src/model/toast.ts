module ToastManager {

    class CommonToastView extends OHOGame.ToastView {

        ui = new ui.commons.common_toast_viewUI;

        constructor() {
            super();
        }

        onShow() {
            if (this.params.view) {
                this.ui.addChild(this.params.view);
            }
        }

    }

    class CommonToastText extends OHOGame.ToastView {

        ui = new ui.commons.common_toast_textUI;

        constructor() {
            super();
            this.duration = 600;
            this.displayDuration = 0;
            this.fromProps = { y: 100, alpha: 0.5 };
            this.toProps = { y: 0, alpha: 1 };
            this.exitProps = { y: -100, alpha: 0.5 };
        }

        onShow() {
            this.ui.text.text = this.params.text || "TOAST";
        }

    }

    export function show(text) {
        OHOGame.toast.showToast(CommonToastText, { text })
    }

    export function showAsView(view) {
        OHOGame.toast.showToast(CommonToastView, { view })
    }

}

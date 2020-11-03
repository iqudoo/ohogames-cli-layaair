class MainActivity extends OHOGame.Activity {

    res = [];
    ui = new ui.pages.mainUI;

    onCreate() {
        this.ui.btnPopup.on(Laya.Event.CLICK, this, () => {
            TestPopup.show();
        });
        this.ui.btnToast.on(Laya.Event.CLICK, this, () => {
            ToastManager.show("TOAST提示")
        });
    }

}

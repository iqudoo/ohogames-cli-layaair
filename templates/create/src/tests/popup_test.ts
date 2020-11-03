class TestPopup extends OHOGame.PopupView {

    ui = new ui.tests.test_popupUI;

    constructor() {
        super();
        this.ui.btnClose.on(Laya.Event.CLICK, this, () => {
            this.hide();
        });
    }

    onShow() {
        console.log("popup show");
    }

    onHide() {
        console.log("popup hide");
    }

}

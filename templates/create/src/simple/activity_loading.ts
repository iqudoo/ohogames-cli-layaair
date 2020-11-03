class LoadingActivity extends OHOGame.Activity {

    ui = new ui.pages.loadingUI

    onCreate() {
        // do something
        setTimeout(() => {
            this.redirectTo(MainActivity);
        }, 1000);
    }

}

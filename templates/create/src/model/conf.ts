class Conf {

    private static _config = {
        dev: {
            debug: true
        },
        prod: {
            debug: false
        }
    }

    public static getConfig(key) {
        let env = OHOGame.env.getEnv();
        let conf = {};
        if (this._config && this._config[env]) {
            conf = this._config[env];
        }
        if (conf && conf[key]) {
            return conf[key];
        }
    }

}

// 游戏入口
class GameMain {
    constructor() {
        // 调试模式，开启后会输出OHOGame日志
        OHOGame.env.setDebug(Conf.getConfig("debug"));
        // 初始化场景
        OHOGame.init(750, 1334, Laya.WebGL);
        // 设置纯色背景
        OHOGame.bg.setBgColor('#18a28b');
        // 开始加载游戏
        OHOGame.start({
            mainPage: LoadingActivity,
            commonRes: [
                { url: 'res/atlas/comp.atlas', type: Laya.Loader.ATLAS }
            ]
        });
    }
}

new GameMain();

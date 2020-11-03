module Utils {

    const _timerObj = new Object();
    let colorfulRectCreateTime: number = 300;
    let colorfulRectParent: Laya.Sprite = null;
    let colorfulRectColor = ['#f66760', '#ffc24d', '#b3a2e5', '#78bff6', '#f55', '#95d130'];
    let colorfulRectOnFrame = function () {
        if (colorfulRectCreateTime >= 100 + Math.random() * 200) {
            var sprite: Laya.Sprite = Laya.Pool.getItemByClass("colorfulRect", Laya.Sprite);
            sprite.graphics.drawRect(0, 0, 25 + Math.random() * 10, 15 + Math.random() * 5, getArrayRandom(colorfulRectColor));
            sprite.x = Math.random() * Laya.stage.width;
            sprite.y = Math.random() * -100;
            sprite.scaleX = sprite.scaleY = 1;
            colorfulRectParent.addChild(sprite);
            colorfulRectCreateTime = 0;
        } else {
            colorfulRectCreateTime++;
        }
        for (var j: number = 0; j < colorfulRectParent.numChildren; j++) {
            var sprite1: Laya.Sprite = colorfulRectParent.getChildAt(j) as Laya.Sprite;
            sprite1.y++;
            sprite1.rotation++;
            if (sprite1.y > Laya.stage.height) {
                sprite1.graphics.clear();
                colorfulRectParent.removeChild(sprite1);
                Laya.Pool.recover("colorfulRect", sprite1);
            }
        }
    }

    export function getArrayRandom(source: Array<any>): Object {
        return source[Math.floor(Math.random() * source.length)];
    }

    export function formatDate(date, format = "yyyy-MM-dd") {
        if (date instanceof Date) {
            var fmap = {
                'M+': date.getMonth() + 1,
                'd+': date.getDate(),
                'h+': date.getHours(),
                'm+': date.getMinutes(),
                's+': date.getSeconds(),
                'q+': Math.floor((date.getMonth() + 3) / 3),
                'S+': date.getMilliseconds()
            }
            if (/(y+)/i.test(format)) {
                format = format.replace(RegExp.$1, (date.getFullYear() + '').substr(4 - RegExp.$1.length))
            }
            for (var k in fmap) {
                if (new RegExp('(' + k + ')').test(format)) {
                    format = format.replace(RegExp.$1, RegExp.$1.length === 1
                        ? fmap[k] : ('00' + fmap[k]).substr(('' + fmap[k]).length))
                }
            }
            return format
        }
        return '';
    }

    export function hideColorfulRects() {
        if (colorfulRectParent) {
            colorfulRectParent.destroy();
            colorfulRectParent = null;
        }
        Laya.timer.clearAll(_timerObj);
    }

    export function showColorfulRects(): void {
        hideColorfulRects();
        colorfulRectParent = new Laya.Sprite;
        Laya.stage.addChild(colorfulRectParent);
        Laya.timer.frameLoop(1, _timerObj, () => {
            colorfulRectOnFrame();
        });
    }

}

import View=laya.ui.View;
import Dialog=laya.ui.Dialog;
module ui.commons {
    export class common_bgUI extends View {

        public static  uiView:any ={"type":"View","props":{"width":750,"height":1334},"child":[{"type":"Sprite","props":{},"child":[{"type":"Rect","props":{"width":750,"lineWidth":1,"height":1334,"fillColor":"#18a28b"}}]}]};
        constructor(){ super()}
        createChildren():void {
        
            super.createChildren();
            this.createView(ui.commons.common_bgUI.uiView);

        }

    }
}

module ui.commons {
    export class common_toast_textUI extends View {
		public text:Laya.Label;

        public static  uiView:any ={"type":"View","props":{"width":750,"height":1334},"child":[{"type":"Label","props":{"y":1000,"x":225,"wordWrap":true,"width":300,"var":"text","valign":"middle","text":"已通关","padding":"20,20,20,20","fontSize":30,"color":"#ffffff","bgColor":"#333333","align":"center"}}]};
        constructor(){ super()}
        createChildren():void {
        
            super.createChildren();
            this.createView(ui.commons.common_toast_textUI.uiView);

        }

    }
}

module ui.commons {
    export class common_toast_viewUI extends View {

        public static  uiView:any ={"type":"View","props":{"width":750,"height":1334}};
        constructor(){ super()}
        createChildren():void {
        
            super.createChildren();
            this.createView(ui.commons.common_toast_viewUI.uiView);

        }

    }
}

module ui.pages {
    export class loadingUI extends View {

        public static  uiView:any ={"type":"View","props":{"y":0,"width":750,"height":1334},"child":[{"type":"common_bg","props":{"runtime":"ui.commons.common_bgUI"}},{"type":"Label","props":{"y":667,"x":374,"text":"LOADING","fontSize":30,"color":"#ffffff","anchorY":0.5,"anchorX":0.5}}]};
        constructor(){ super()}
        createChildren():void {
        			View.regComponent("ui.commons.common_bgUI",ui.commons.common_bgUI);

            super.createChildren();
            this.createView(ui.pages.loadingUI.uiView);

        }

    }
}

module ui.pages {
    export class mainUI extends View {
		public btnToast:Laya.Button;
		public btnPopup:Laya.Button;

        public static  uiView:any ={"type":"View","props":{"width":750,"height":1334},"child":[{"type":"common_bg","props":{"y":0,"x":0,"runtime":"ui.commons.common_bgUI"}},{"type":"Sprite","props":{"y":653,"x":275},"child":[{"type":"Button","props":{"y":0,"width":200,"var":"btnToast","skin":"comp/button.png","sizeGrid":"5,5,5,5","labelSize":30,"label":"showToast","height":80}},{"type":"Button","props":{"y":100,"width":200,"var":"btnPopup","skin":"comp/button.png","sizeGrid":"5,5,5,5","labelSize":30,"label":"showPopup","height":80}}]}]};
        constructor(){ super()}
        createChildren():void {
        			View.regComponent("ui.commons.common_bgUI",ui.commons.common_bgUI);

            super.createChildren();
            this.createView(ui.pages.mainUI.uiView);

        }

    }
}

module ui.tests {
    export class test_popupUI extends View {
		public btnClose:Laya.Button;

        public static  uiView:any ={"type":"View","props":{"width":750,"height":1334},"child":[{"type":"Image","props":{"y":570,"x":190,"width":370,"skin":"comp/bg.png","sizeGrid":"30,10,10,10","height":263}},{"type":"Label","props":{"y":639,"x":261,"text":"POP示例","fontSize":55,"color":"#333333","bold":true}},{"type":"Button","props":{"y":740,"x":285,"width":179,"var":"btnClose","skin":"comp/button.png","label":"CLOSE","height":42}}]};
        constructor(){ super()}
        createChildren():void {
        
            super.createChildren();
            this.createView(ui.tests.test_popupUI.uiView);

        }

    }
}

"use strict";
let moduleExports = {};

["./UIScreen", "./UIView"].forEach(moduleName => {
    let module = require(moduleName);
    Object.assign(global, module);
    Object.assign(moduleExports, module);
});

class UIWindow extends UIView {
    constructor(){
        super();
        let self = this;

        self.screen = UIScreen.mainScreen();
        self._rootViewController = null;
    }
    static init(){
        return new UIWindow();
    }
    description(){
        return "UIWindow";
    }
    set rootViewController(value){
        self._removeSubviews();
        self._rootViewController = value;
    }
    get rootViewController(){
        return self._rootViewController;
    }
}

moduleExports.UIWindow = UIWindow;
module.exports = moduleExports;

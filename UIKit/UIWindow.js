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
    }
    static init(){
        return new UIWindow();
    }
    description(){
        return "UIWindow";
    }
}

moduleExports.UIWindow = UIWindow;
module.exports = moduleExports;

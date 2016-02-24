"use strict";
let moduleExports = {};

["./primitives", "./nsobject"].forEach(moduleName => {
    let module = require(moduleName);
    for(let key in module){
        Object.assign(global, module);
        Object.assign(moduleExports, module);
    }
});

let mainScreen = null;
class UIScreen extends NSObject {
    constructor(){
        super();
        let self = this;

        self.bounds = CGRectZero;
    }
    static init(){
        return new UIScreen();
    }
    static _initWithTerminal(terminal){
        let screen = UIScreen.init();
        screen.bounds = CGRectMake(0, 0, terminal.width, terminal.height);
        mainScreen = screen;
        return screen;
    }
    static mainScreen(){
        return mainScreen;
    }
    description(){
        return "UIScreen";
    }
}

moduleExports.UIScreen = UIScreen;
module.exports = moduleExports;

"use strict";
let moduleExports = {};

const term = require("terminal-kit").terminal;

["../Foundation/Foundation", "./UIScreen"].forEach(moduleName => {
    let module = require(moduleName);
    Object.assign(global, module);
    Object.assign(moduleExports, module);
});

class UIColor extends NSObject {
    constructor(){
        super();
        let self = this;

        self.red = 0;
        self.green = 0;
        self.blue = 0;
        self.clear = true;
    }
    static init(){
        return new UIColor();
    }
    static initWithWhite(white){
        return UIColor.initWithRedGreenBlue(white, white, white);
    }
    static initWithRedGreenBlue(red, green, blue){
        let color = UIColor.init();
        color.red = 255 * red;
        color.green = 255 * green;
        color.blue = 255 * blue;
        color.clear = false;
        return color;
    }
    _to16Color(){
        let self = this;

        // TODO(spywhere): Change this workaround to a proper call (if possible)
        return term.registerForRgb(self.red, self.green, self.blue, 0, 15);
    }
    static blackColor(){
        return UIColor.initWithRedGreenBlue(0, 0, 0);
    }
    static darkGrayColor(){
        return UIColor.initWithRedGreenBlue(0.33, 0.33, 0.33);
    }
    static lightGrayColor(){
        return UIColor.initWithRedGreenBlue(0.66, 0.66, 0.66);
    }
    static whiteColor(){
        return UIColor.initWithRedGreenBlue(1, 1, 1);
    }
    static redColor(){
        return UIColor.initWithRedGreenBlue(1, 0, 0);
    }
    static greenColor(){
        return UIColor.initWithRedGreenBlue(0, 1, 0);
    }
    static blueColor(){
        return UIColor.initWithRedGreenBlue(0, 0, 1);
    }
    static cyanColor(){
        return UIColor.initWithRedGreenBlue(0, 1, 1);
    }
    static yellowColor(){
        return UIColor.initWithRedGreenBlue(1, 1, 0);
    }
    static magentaColor(){
        return UIColor.initWithRedGreenBlue(1, 0, 1);
    }
    static orangeColor(){
        return UIColor.initWithRedGreenBlue(1, 0.5, 0);
    }
    static purpleColor(){
        return UIColor.initWithRedGreenBlue(0.5, 0, 0.5);
    }
    static brownColor(){
        return UIColor.initWithRedGreenBlue(0.6, 0.4, 0.2);
    }
    static clearColor(){
        return UIColor.init();
    }
}


moduleExports.UIColor = UIColor;
module.exports = moduleExports;

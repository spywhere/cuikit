"use strict";
let moduleExports = {};

["./UIView"].forEach(moduleName => {
    let module = require(moduleName);
    Object.assign(global, module);
    Object.assign(moduleExports, module);
});

class UILabel extends UIView {
    constructor(){
        super();
    }
    static init(){
        return new UILabel();
    }
    description(){
        return "UILabel";
    }
}

moduleExports.UILabel = UILabel;
module.exports = moduleExports;

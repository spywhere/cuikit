/* global UIView */
"use strict";
let moduleExports = {};

["./uiview"].forEach(moduleName => {
    let module = require(moduleName);
    for(let key in module){
        Object.assign(global, module);
        Object.assign(moduleExports, module);
    }
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

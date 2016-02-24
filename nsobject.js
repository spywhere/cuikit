"use strict";
let moduleExports = {};

class NSObject {
    constructor(){
    }
    description(){
        return "NSObject";
    }
    respondsToSelector(selector){
        let self = this;

        return typeof(self[selector]) === "function";
    }
    performSelector(selector){
        let self = this;

        self[selector].apply(self, Array.prototype.slice.call(arguments, 1));
    }
}

moduleExports.NSObject = NSObject;
module.exports = moduleExports;

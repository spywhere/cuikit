"use strict";
let moduleExports = {};

let objHash = require("object-hash");

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

        return self[selector].apply(
            self, Array.prototype.slice.call(arguments, 1)
        );
    }

    performSelectorWithObject(selector, obj){
        let self = this;

        return self.performSelector(selector, obj);
    }

    performSelectorWithObjectWithObject(selector, obj1, obj2){
        let self = this;

        return self.performSelector(selector, obj1, obj2);
    }

    performSelectorWithObjectAfterDelay(selector, object, delay){
        let self = this;

        setTimeout(
            () => {
                self.performSelector(selector, object);
            },
            delay * 1000
        );
    }

    isMemberOfClass(clazz){
        let self = this;

        return self.constructor.name === clazz.prototype.constructor.name;
    }

    isKindOfClass(clazz){
        let self = this;

        return self instanceof clazz;
    }

    isSubclassOfClass(clazz){
        let self = this;

        return !self.isMemberOfClass(clazz) && self.isKindOfClass(clazz);
    }

    isEqual(obj){
        let self = this;

        return self.hash() === obj.hash();
    }

    hash(){
        let self = this;

        return objHash(self);
    }
}

moduleExports.NSObject = NSObject;
module.exports = moduleExports;

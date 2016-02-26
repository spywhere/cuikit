"use strict";
let moduleExports = {};

[
    "./CGPoint", "./CGSize"
].forEach(moduleName => {
    let module = require(moduleName);
    Object.assign(global, module);
    Object.assign(moduleExports, module);
});

class CGRect {
    constructor(origin, size){
        let self = this;

        self.origin = origin;
        self.size = size;
    }
}

function CGRectMake(x, y, width, height){
    return new CGRect(
        CGPointMake(x, y),
        CGSizeMake(width, height)
    );
}

moduleExports.CGRectMake = CGRectMake;
moduleExports.CGRectZero = CGRectMake(0, 0, 0, 0);

module.exports = moduleExports;

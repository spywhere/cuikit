"use strict";
let moduleExports = {};

class CGPoint {
    constructor(x, y){
        let self = this;

        self.x = x;
        self.y = y;
    }
}

function CGPointMake(x, y){
    return new CGPoint(x, y);
}

moduleExports.CGPointMake = CGPointMake;
moduleExports.CGPointZero = CGPointMake(0, 0);

module.exports = moduleExports;

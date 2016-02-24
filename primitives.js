"use strict";
let moduleExports = {};

function CGPointMake(x, y){
    return {
        x, y
    };
}

function CGSizeMake(width, height){
    return {
        width, height
    };
}

function CGRectMake(x, y, width, height){
    return {
        origin: CGPointMake(x, y),
        size: CGSizeMake(width, height)
    };
}

class _Constant {
    constructor(){
        let self = this;

        self.fps = 15;
    }
    static secondPerFrame(){
        let self = this;

        return 1 / self.fps;
    }
}

moduleExports._Constant = _Constant;
moduleExports.CGPointMake = CGPointMake;
moduleExports.CGPointZero = CGPointMake(0, 0);
moduleExports.CGSizeMake = CGSizeMake;
moduleExports.CGSizeZero = CGSizeMake(0, 0);
moduleExports.CGRectMake = CGRectMake;
moduleExports.CGRectZero = CGRectMake(0, 0, 0, 0);

module.exports = moduleExports;

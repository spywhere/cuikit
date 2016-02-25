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

class CGSize {
    constructor(width, height){
        let self = this;

        self.width = width;
        self.height = height;
    }
}

function CGSizeMake(width, height){
    return new CGSize(width, height);
}

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

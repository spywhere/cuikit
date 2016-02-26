"use strict";
let moduleExports = {};

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

moduleExports.CGSizeMake = CGSizeMake;
moduleExports.CGSizeZero = CGSizeMake(0, 0);

module.exports = moduleExports;

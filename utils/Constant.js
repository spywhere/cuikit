"use strict";
let moduleExports = {};

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

module.exports = moduleExports;

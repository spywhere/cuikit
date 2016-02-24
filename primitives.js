var moduleExports = {};

function CGPointMake(x, y){
    return {
        x: x,
        y: y
    };
}

function CGSizeMake(width, height){
    return {
        width: width,
        height: height
    };
}

function CGRectMake(x, y, width, height){
    return {
        origin: CGPointMake(x, y),
        size: CGSizeMake(width, height)
    };
}

function _Constant(){
    var self = this;

    self.fps = 15;
}

_Constant.prototype = Object.create(Object.prototype);
_Constant.prototype.constructor = _Constant;

_Constant.secondPerFrame = function(){
    var self = this;
    return 1 / self.fps;
};

moduleExports._Constant = _Constant;
moduleExports.CGPointMake = CGPointMake;
moduleExports.CGPointZero = CGPointMake(0, 0);
moduleExports.CGSizeMake = CGSizeMake;
moduleExports.CGSizeZero = CGSizeMake(0, 0);
moduleExports.CGRectMake = CGRectMake;
moduleExports.CGRectZero = CGRectMake(0, 0, 0, 0);

module.exports = moduleExports;

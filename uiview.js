/* global _Constant, CGSizeMake, CGPointMake, CGRectMake, CGRectZero, UIColor */
const moment = require("moment");
var moduleExports = {};

["./primitives", "./colors"].forEach(function(moduleName){
    var module = require(moduleName);
    for(var key in module){
        global[key] = module[key];
        moduleExports[key] = module[key];
    }
});

function UIView(){
    var self = this;

    self._term = null;
    self._didLayout = true;

    self.foregroundColor = UIColor.blackColor();
    self.backgroundColor = UIColor.clearColor();
    self.superview = null;
    self.subviews = [];
    self._frame = null;
}

UIView.prototype = Object.create(Object.prototype);
UIView.prototype.constructor = UIView;

UIView.init = function(){
    return new this();
}

UIView.initWithFrame = function(frame){
    var view = UIView.init();
    view.frame = frame;
    return view;
}

UIView.prototype.addSubview = function(view){
    var self = this;

    view.superview = self;
    self.subviews.push(view);
};

UIView.prototype.description = function(){
    return "UIView";
};

UIView.prototype.layoutSubviews = function(){
    var self = this;

    if(self.frame === null){
        if(self.superview === null && self._term !== null){
            // If superview is null, this must be a root view
            //   then initialize the frame as terminal size
            self.frame = CGRectMake(
                0, 0, self._term.width, self._term.height
            );
        }else{
            self.frame = CGRectZero;
        }
    }

    self.subviews.forEach(function(view) {
        view.layoutSubviews();
    }, this);
    self._didLayout = true;
};

UIView.prototype.layoutIfNeeded = function(){
    var self = this;

    if(self._didLayout){
        self.subviews.forEach(function(view) {
            view.layoutIfNeeded();
        }, this);
        return;
    }
    self.layoutSubviews();
};

Object.defineProperty(UIView.prototype, "frame", {
    get: function(){
        return this._frame;
    },
    set: function(value){
        var self = this;
        self.setFrame(value);
    }
});

UIView.prototype.setFrame = function(frame){
    var self = this;

    self._frame = frame;
    self._didLayout = false;
};

UIView.prototype.render = function(terminal){
    var self = this;
    self._term = terminal;

    self.layoutIfNeeded();

    var lastX = self.frame.origin.x + self.frame.size.width;
    var lastY = self.frame.origin.y + self.frame.size.height;

    if(!self.backgroundColor.clear){
        // Should change to screen buffer
        for(var row = self.frame.origin.y; row < lastY; row++){
            for(var col = self.frame.origin.x; col < lastX; col++){
                    self._term.moveTo(col + 1, row + 1);
                    self._term.bgColorRgb(
                        self.backgroundColor.red,
                        self.backgroundColor.green,
                        self.backgroundColor.blue
                    )
                self._term(" ");
            }
        }
    }

    self.subviews.forEach(function(view){
        view.render(terminal);
    });
};

UIView.animateWithDurationAnimations = function(duration, animations){
    var self = this;

    self.animateWithDurationAnimationsCompletion(
        duration, animations, function(){}
    );
};

UIView.animateWithDurationAnimationsCompletion = function(
    duration, animations, completion
){
    var endTime = moment() + duration * 1000;
    function animate(){
        var percentage = 1 - ((endTime - moment()) / (duration * 1000));
        if(percentage > 1){
            animations(1);
            return completion();
        }

        animations(percentage);

        setTimeout(animate, _Constant.secondPerFrame());
    }
    animate();
};

moduleExports.UIView = UIView;
module.exports = moduleExports;

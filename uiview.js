/* global _Constant, CGSizeMake, CGPointMake, CGRectMake, CGRectZero, UIColor */
"use strict";
const moment = require("moment");
let moduleExports = {};

["./primitives", "./colors"].forEach(moduleName => {
    let module = require(moduleName);
    for(let key in module){
        Object.assign(global, module);
        Object.assign(moduleExports, module);
    }
});

class UIView {
    constructor(){
        let self = this;

        self._term = null;
        self._didLayout = true;

        self.foregroundColor = UIColor.whiteColor();
        self.backgroundColor = UIColor.clearColor();
        self.superview = null;
        self.subviews = [];
        self._frame = null;
    }
    static init(){
        return new this();
    }

    static initWithFrame(frame){
        let view = UIView.init();
        view.frame = frame;
        return view;
    }

    static animateWithDurationAnimations(duration, animations){
        let self = this;

        self.animateWithDurationAnimationsCompletion(
            duration, animations, function(){}
        );
    }

    static animateWithDurationAnimationsCompletion(
        duration, animations, completion
    ){
        let endTime = moment() + duration * 1000;
        function animate(){
            let percentage = 1 - ((endTime - moment()) / (duration * 1000));
            if(percentage > 1){
                animations(1);
                return completion();
            }

            animations(percentage);

            setTimeout(animate, _Constant.secondPerFrame());
        }
        animate();
    }
    description(){
        return "UIView";
    }
    addSubview(view){
        let self = this;

        view.superview = self;
        self.subviews.push(view);
    }
    layoutSubviews(){
        let self = this;

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

        for(let view of self.subviews){
            view.layoutSubviews();
        }

        self._didLayout = true;
    }
    layoutIfNeeded(){
        let self = this;

        if(self._didLayout){
            for(let view of self.subviews){
                view.layoutIfNeeded();
            }
            return;
        }
        self.layoutSubviews();
    }
    get frame(){
        return this._frame;
    }
    set frame(value){
        let self = this;
        self.setFrame(value);
    }
    setFrame(frame){
        let self = this;

        self._frame = frame;
        self._didLayout = false;
    }
    render(terminal){
        let self = this;
        self._term = terminal;

        self.layoutIfNeeded();

        let lastX = self.frame.origin.x + self.frame.size.width;
        let lastY = self.frame.origin.y + self.frame.size.height;

        if(!self.backgroundColor.clear){
            // Should change to screen buffer
            for(let row = self.frame.origin.y; row < lastY; row++){
                for(let col = self.frame.origin.x; col < lastX; col++){
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

        for(let view of self.subviews){
            view.render(terminal);
        }
    }
}

moduleExports.UIView = UIView;
module.exports = moduleExports;

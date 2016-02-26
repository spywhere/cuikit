/* global _Constant */
"use strict";

const ScreenBuffer = require("terminal-kit").ScreenBuffer;
const moment = require("moment");
let moduleExports = {};

[
    "../NSUtils/Constant",
    "../CGGeometry/CGGeometry",
    "../Foundation/Foundation",
    "./UIColor",
    "./UIScreen"
].forEach(moduleName => {
    let module = require(moduleName);
    Object.assign(global, module);
    Object.assign(moduleExports, module);
});

class UIView extends NSObject {
    constructor(){
        super();
        let self = this;

        self._didLayout = true;
        self._frame = null;
        self._viewport = null;

        self.foregroundColor = UIColor.whiteColor();
        self.backgroundColor = UIColor.clearColor();
        self.superview = null;
        self.subviews = [];
    }
    static init(){
        return new UIView();
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
        let endTime = moment().add(duration, "seconds");
        function animate(){
            let percentage = 1 - ((endTime.diff(moment())) / (duration * 1000));
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
            if(self.superview === null){
                // If superview is null, this must be a root view
                //   then initialize the frame as terminal size
                self.frame = UIScreen.mainScreen().bounds;
            }else{
                self.frame = CGRectZero;
            }
        }

        self._viewport = ScreenBuffer.create({
            width: self.frame.size.width,
            height: self.frame.size.height
        });

        self._paint();

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
    _paint(){
        let self = this;

        for(let row = 0; row < self.frame.size.height; row++){
            for(let col = 0; col < self.frame.size.width; col++){
                self._viewport.put({
                    x: col,
                    y: row,
                    attr: {
                       bgColor: self.backgroundColor._to16Color()
                    }
                }, " ");
            }
        }
    }
    _render(terminal){
        let self = this;

        self.layoutIfNeeded();

        self._viewport.x = self.frame.origin.x;
        self._viewport.y = self.frame.origin.y;
        if(self.superview === null){
            self._viewport.draw({
                dst: terminal,
                delta: true
            });
            self._paint();
        }else{
            self._viewport.draw({
                dst: self.superview._viewport,
                delta: true
            });
        }

        for(let view of self.subviews){
            view._render(terminal);
        }
    }
}

moduleExports.UIView = UIView;
module.exports = moduleExports;

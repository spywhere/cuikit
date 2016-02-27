/* global _Constant */
"use strict";

const ScreenBuffer = require("terminal-kit").ScreenBuffer;
const moment = require("moment");
let moduleExports = {};

[
    "../utils/Constant",
    "../CoreGraphics/CoreGraphics",
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
        self._viewController = null;

        self.foregroundColor = UIColor.whiteColor();
        self.backgroundColor = UIColor.clearColor();
        self.superview = null;
        self.subviews = [];
        self.clipsToBounds = false;
    }

    static init(){
        // Returns the instance of this class
        //   this will returns its subclass's instance
        //   when called from the subclass
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

    bringSubviewToFront(view){
        let self = this;

        let index = self.subviews.indexOf(view);
        if(index < 0){
            return;
        }

        self.subviews.push(self.subviews.splice(index, 1)[0]);
    }

    sendSubviewToBack(view){
        let self = this;

        let index = self.subviews.indexOf(view);
        if(index < 0){
            return;
        }

        self.subviews.unshift(self.subviews.splice(index, 1)[0]);
    }

    insertSubviewAtIndex(view, index){
        let self = this;

        if(index < 0 || index >= self.subviews.length){
            return;
        }

        view.superview = self;
        self.subviews.splice(index, 0, view);
    }

    insertSubviewAboveSubview(view, siblingView){
        let self = this;

        let index = self.subviews.indexOf(siblingView);
        if(index < 0){
            return;
        }

        self.insertSubviewAtIndex(view, index + 1);
    }

    insertSubviewBelowSubview(view, siblingView){
        let self = this;

        let index = self.subviews.indexOf(siblingView);
        if(index < 0){
            return;
        }

        self.insertSubviewAtIndex(view, index);
    }

    exchangeSubviewAtIndexWithSubviewAtIndex(viewIndex, siblingViewIndex){
        let self = this;
        if(viewIndex < 0 || viewIndex >= self.subviews.length){
            return;
        }
        if(siblingViewIndex < 0 || siblingViewIndex >= self.subviews.length){
            return;
        }

        // TODO[language](spywhere): Change this to destructure syntax
        //   when supports
        let tempView = self.subviews[viewIndex];
        self.subviews[viewIndex] = self.subviews[siblingViewIndex];
        self.subviews[siblingViewIndex] = tempView;
    }

    removeFromSuperview(){
        let self = this;

        if(self.superview === null){
            return;
        }
        let index = self.superview.subviews.indexOf(self);
        if(index >= 0){
            self.superview.subviews.splice(index, 1);
        }
        self.superview = null;
    }

    _removeSubviews(){
        let self = this;

        for(let view of self.subviews){
            view.superview = null;
        }
        self.subviews = [];
    }

    isDescendantOfView(view){
        let self = this;

        let superview = self.superview;
        while(superview !== view && superview !== null){
            superview = superview.superview;
        }
        return superview !== null;
    }

    layoutSubviews(){
        let self = this;

        if(self._viewController !== null){
            self._viewController.viewWillLayoutSubviews();
        }
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
            width: self.frame.size.width + 1,
            height: self.frame.size.height + 1
        });

        self._paint();

        for(let view of self.subviews){
            view.layoutSubviews();
        }
        if(self._viewController !== null){
            self._viewController.viewDidLayoutSubviews();
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

    get bounds(){
        let self = this;

        return CGRectMake(
            0, 0,
            self.frame.size.width,
            self.frame.size.height
        );
    }

    set bounds(value){
        let self = this;

        self.frame = CGRectMake(
            self.frame.origin.x + value.origin.x,
            self.frame.origin.y + value.origin.y,
            value.size.width,
            value.size.height
        );
    }

    get center(){
        let self = this;

        return CGPointMake(
            self.frame.origin.x + self.frame.size.width / 2,
            self.frame.origin.y + self.frame.size.height / 2
        );
    }

    set center(value){
        let self = this;

        let frame = self.frame;
        frame.origin.x = value.x - frame.size.width / 2;
        frame.origin.y = value.y - frame.size.height / 2;
        self.frame = frame;
    }

    _paint(){
        let self = this;

        for(let row = 0; row < self._viewport.height; row++){
            for(let col = 0; col < self._viewport.width; col++){
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

        let unclippedViews = [];
        for(let view of self.subviews){
            if(self.clipsToBounds){
                view._render(terminal);
            }else{
                unclippedViews.push(view);
            }
        }
        if(self.superview === null || !self.superview.clipsToBounds){
            if(self.superview !== null){
                self._viewport.x += self.superview.frame.origin.x;
                self._viewport.y += self.superview.frame.origin.y;
            }
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
        for(let view of unclippedViews){
            view._render(terminal);
        }
    }
}

moduleExports.UIView = UIView;
module.exports = moduleExports;

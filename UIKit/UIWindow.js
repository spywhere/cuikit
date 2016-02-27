"use strict";
let moduleExports = {};

["./UIScreen", "./UIView"].forEach(moduleName => {
    let module = require(moduleName);
    Object.assign(global, module);
    Object.assign(moduleExports, module);
});

class UIWindow extends UIView {
    constructor(){
        super();
        let self = this;

        self.screen = UIScreen.mainScreen();
        self._rootViewController = null;
    }

    description(){
        return "UIWindow";
    }

    set rootViewController(value){
        let self = this;

        let oldViewController = self._rootViewController;
        if(oldViewController !== null){
            oldViewController.viewWillDisappear();
        }
        self._removeSubviews();
        self._rootViewController = value;
        if(oldViewController !== null){
            oldViewController.viewDidDisappear();
        }
        self._rootViewController.viewWillAppear();
        self.addSubview(self._rootViewController.view);
        self._rootViewController.viewDidAppear();
    }

    get rootViewController(){
        let self = this;

        return self._rootViewController;
    }
}

moduleExports.UIWindow = UIWindow;
module.exports = moduleExports;

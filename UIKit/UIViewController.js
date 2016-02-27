"use strict";
let moduleExports = {};

["./UIView"].forEach(moduleName => {
    let module = require(moduleName);
    Object.assign(global, module);
    Object.assign(moduleExports, module);
});

class UIViewController extends NSObject {
    constructor(){
        super();
        let self = this;

        self._view = null;
        self.isViewLoaded = false;
    }

    static init(){
        // Returns the instance of this class
        //   this will returns its subclass's instance
        //   when called from the subclass
        return new this();
    }

    description(){
        return "UIViewController";
    }

    get view(){
        let self = this;

        self.loadViewIfNeeded();
        return self._view;
    }

    get viewIfLoaded(){
        if(self.isViewLoaded){
            return self._view;
        }else{
            return null;
        }
    }

    loadView(){
        let self = this;

        self._view = UIView.init();
        self.isViewLoaded = true;
        self.viewDidLoad();
    }

    loadViewIfNeeded(){
        let self = this;

        if(self.isViewLoaded){
            return;
        }
        self.loadView();
    }

    viewDidLoad(){}
    viewWillAppear(){}
    viewDidAppear(){}
    viewWillDisappear(){}
    viewDidDisappear(){}
}

moduleExports.UIViewController = UIViewController;
module.exports = moduleExports;

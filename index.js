"use strict";

const cuikit = require("./cuikit");
Object.assign(global, cuikit);

class AppDelegate extends NSObject {
    constructor(){
        super();
        let self = this;

        self.view = UIView.initWithFrame(CGRectMake(10, 10, 10, 10));
        self.view.backgroundColor = UIColor.greenColor();
    }
    applicationDidFinishLaunchingWithOptions(app, options){
        let self = this;

        console.log("App did launch");
        app.window.addSubview(self.view);

        UIView.animateWithDurationAnimations(2, percentage => {
            self.view.frame = CGRectMake(
                10, 10, 10 + 10 * percentage, 10 * percentage
            );
            self.view.layoutIfNeeded();
        });
    }
    applicationWillTerminate(app){
        console.log("App will terminate");
    }
}

UIApplication.initWithDelegate(new AppDelegate());

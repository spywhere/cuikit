/* global UIApplication */
"use strict";

const cuikit = require("./cuikit");
Object.assign(global, cuikit);

class AppDelegate {
    applicationDidFinishLaunchingWithOptions(app, options){
        console.log("App did launch");
    }
    applicationWillTerminate(app){
        console.log("App will terminate");
    }
}

UIApplication.initWithDelegate(new AppDelegate());

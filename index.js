/* global AppDelegate */
"use strict";

const cuikit = require("./cuikit");
Object.assign(global, cuikit);

AppDelegate.initWithDelegate({
    applicationDidFinishLaunchingWithOptions: (app, options)=>{
        console.log("App did launch");
    },
    applicationWillTerminate: app => {
        console.log("App will terminate");
    }
});

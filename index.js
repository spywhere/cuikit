/* global AppDelegate */
const cuikit = require("./cuikit");
for(var key in cuikit){
    global[key] = cuikit[key];
}

AppDelegate.initWithDelegate({
    applicationDidFinishLaunchingWithOptions: function(app, options){
        console.log("App did launch");
    },
    applicationWillTerminate: function(app){
        console.log("App will terminate");
    }
});

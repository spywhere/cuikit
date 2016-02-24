/* global UIScreen, UIView */
var moduleExports = {};

["./uiscreen", "./uiview"].forEach(function(moduleName){
    var module = require(moduleName);
    for(var key in module){
        global[key] = module[key];
        moduleExports[key] = module[key];
    }
});

function UIWindow(){
    UIView.call(this);
    var self = this;

    self.screen = UIScreen.mainScreen();
}

UIWindow.prototype = Object.create(UIView.prototype);
UIWindow.prototype.constructor = UIWindow;

UIWindow.init = function(){
    return new this();
};

UIWindow.prototype.description = function(){
    return "UIWindow";
};

moduleExports.UIWindow = UIWindow;
module.exports = moduleExports;

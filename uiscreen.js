/* global CGRectMake, CGRectZero */
var moduleExports = {};

["./primitives"].forEach(function(moduleName){
    var module = require(moduleName);
    for(var key in module){
        global[key] = module[key];
        moduleExports[key] = module[key];
    }
});

function UIScreen(){
    var self = this;

    self.bounds = CGRectZero;
}

UIScreen.prototype = Object.create(Object.prototype);
UIScreen.prototype.constructor = UIScreen;

UIScreen.init = function(){
    return new this();
};

var mainScreen = UIScreen.init();

UIScreen._initWithTerminal = function(terminal){
    var screen = UIScreen.init();
    screen.bounds = CGRectMake(0, 0, terminal.width, terminal.height);
    mainScreen = screen;
    return screen;
};

UIScreen.mainScreen = function(){
    return mainScreen;
};

UIScreen.prototype.description = function(){
    return "UIScreen";
};

moduleExports.UIScreen = UIScreen;
module.exports = moduleExports;

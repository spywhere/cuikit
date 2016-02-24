/* global _Constant */
const termkit = require("terminal-kit")
const ScreenBuffer = termkit.ScreenBuffer;

var moduleExports = {};

["./primitives", "./colors", "./uiview", "./uilabel"].forEach(function(moduleName){
    var module = require(moduleName);
    for(var key in module){
        global[key] = module[key];
        moduleExports[key] = module[key];
    }
});

function AppDelegate(){
    var self = this;

    self._launch = false;
    self._term = termkit.terminal;
    self._renderPause = false;
    self.delegate = null;
}

AppDelegate.prototype = Object.create(Object.prototype);
AppDelegate.prototype.constructor = AppDelegate;

AppDelegate.init = function(){
    return new this();
};

AppDelegate.initWithDelegate = function(delegate){
    var app = AppDelegate.init();
    app.delegate = delegate;
    return app.launch();
};

AppDelegate.prototype.setDelegate = function(delegate){
    var self = this;

    self.delegate = delegate;
};

AppDelegate.prototype._render = function(){
    var self = this;

    if(self._renderPause){
        return;
    }

    // console.log("Render: " + self._renderPause);

    setTimeout(function(){
        self._render();
    }, _Constant.secondPerFrame() * 1000);
};

AppDelegate.prototype.launch = function(){
    var self = this;

    if(self._launch){
        return;
    }
    self._launch = true;
    self._term.fullscreen(true);
    self._term.grabInput(true);
    self._term.hideCursor(true);

    self._term.on("resize", function(width, height){

    });

    self._term.on("key", function(name, matches, data){
        if(name === "CTRL_C"){
            if(
                self.delegate !== null &&
                typeof(self.delegate.applicationWillTerminate) === "function"
            ){
                self.delegate.applicationWillTerminate(self);
            }

            self._term.reset();
            self._term.clear();
            self._term.hideCursor(false);
            self._term.grabInput(false);
            self._term.processExit(0);
        }
    });

    self._term.on("terminal", function(name, data){
        if(name === "FOCUS_IN"){
            self._renderPause = false;
            self._render();
            if(
                self.delegate !== null &&
                typeof(self.delegate.applicationDidBecomeActive) === "function"
            ){
                self.delegate.applicationDidBecomeActive(self);
            }
        }else if(name === "FOCUS_OUT"){
            self._renderPause = true;
            if(
                self.delegate !== null &&
                typeof(self.delegate.applicationWillResignActive) === "function"
            ){
                self.delegate.applicationWillResignActive(self);
            }
        }
    });

    if(
        self.delegate !== null &&
        typeof(
            self.delegate.applicationDidFinishLaunchingWithOptions
        ) === "function"
    ){
        self.delegate.applicationDidFinishLaunchingWithOptions(
            self, process.argv
        );
    }

    self._render();
};

moduleExports.AppDelegate = AppDelegate;

module.exports = moduleExports;

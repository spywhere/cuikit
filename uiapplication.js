/* global _Constant, UIScreen, UIWindow */
"use strict";
let moduleExports = {};

const termkit = require("terminal-kit")
const ScreenBuffer = termkit.ScreenBuffer;
["./primitives", "./uiscreen", "./uiwindow"].forEach(moduleName => {
    let module = require(moduleName);
    for(let key in module){
        Object.assign(global, module);
        Object.assign(moduleExports, module);
    }
});

class UIApplication {
    constructor(){
        let self = this;

        self._launch = false;
        self._term = termkit.terminal;
        UIScreen._initWithTerminal(self._term);
        self._renderPause = false;

        self.delegate = null;
        self.window = UIWindow.init();
        self.window.frame = self.window.screen.bounds;
    }
    static init(){
        return new UIApplication();
    }
    static initWithDelegate(delegate){
        let app = UIApplication.init();
        app.delegate = delegate;
        return app.launch();
    }
    setDelegate(delegate){
        let self = this;

        self.delegate = delegate;
        return self;
    }
    _render(){
        let self = this;

        if(self._renderPause){
            return;
        }

        // console.log("Render: " + self._renderPause);

        setTimeout(() => {
            self._render();
        }, _Constant.secondPerFrame() * 1000);
    }
    launch(){
        let self = this;

        if(self._launch){
            return;
        }
        self._launch = true;
        self._term.fullscreen(true);
        self._term.grabInput(true);
        self._term.hideCursor(true);

        self._term.on("resize", (width, height)=>{

        });

        self._term.on("key", (name, matches, data)=>{
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

        self._term.on("terminal", (name, data)=>{
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
        return self;
    }
}

moduleExports.UIApplication = UIApplication;
module.exports = moduleExports;

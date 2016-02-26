/* global _Constant */
"use strict";
let moduleExports = {};

const termkit = require("terminal-kit");
[
    "../utils/Constant",
    "../Foundation/Foundation",
    "./UIScreen",
    "./UIWindow"
].forEach(moduleName => {
    let module = require(moduleName);
    Object.assign(global, module);
    Object.assign(moduleExports, module);
});

let sharedApplication = null;
class UIApplication extends NSObject {
    constructor(){
        super();
        let self = this;

        self._launch = false;
        self._term = termkit.terminal;
        UIScreen._initWithTerminal(self._term);
        self._renderPause = false;

        self.delegate = null;
        self.window = UIWindow.init();
        self._resetWindow();
    }
    _resetWindow(){
        let self = this;

        self.window.screen = UIScreen.mainScreen();
        self.window.frame = self.window.screen.bounds;
    }
    static init(){
        sharedApplication = new UIApplication();
        return sharedApplication;
    }
    static initWithDelegate(delegate){
        let app = UIApplication.init();
        app.delegate = delegate;
        return app.launch();
    }
    static sharedApplication(){
        return sharedApplication;
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

        self.window._render(self._term);

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

        self._term.on("resize", (width, height) => {
            UIScreen._initWithTerminal(self._term);
            self._resetWindow();
        });

        self._term.on("key", (name, matches, data) => {
            if(name === "CTRL_C"){
                if(
                    self.delegate !== null &&
                    self.delegate.respondsToSelector(
                        "applicationWillTerminate"
                    )
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

        self._term.on("terminal", (name, data) => {
            if(name === "FOCUS_IN"){
                self._renderPause = false;
                self._render();
                if(
                    self.delegate !== null &&
                    self.delegate.respondsToSelector(
                        "applicationDidBecomeActive"
                    )
                ){
                    self.delegate.applicationDidBecomeActive(self);
                }
            }else if(name === "FOCUS_OUT"){
                self._renderPause = true;
                if(
                    self.delegate !== null &&
                    self.delegate.respondsToSelector(
                        "applicationWillResignActive"
                    )
                ){
                    self.delegate.applicationWillResignActive(self);
                }
            }
        });

        if(
            self.delegate !== null &&
            self.delegate.respondsToSelector(
                "applicationDidFinishLaunchingWithOptions"
            )
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

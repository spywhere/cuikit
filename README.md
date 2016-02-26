## CUIKit
A CLI-based ui kit inspired by Apple UIKit

[![npm](https://img.shields.io/npm/v/cuikit.svg?style=flat-square)](https://www.npmjs.com/package/cuikit)
[![npm](https://img.shields.io/npm/dt/cuikit.svg?style=flat-square)](https://www.npmjs.com/package/cuikit)
[![npm](https://img.shields.io/npm/l/cuikit.svg?style=flat-square)](https://www.npmjs.com/package/cuikit)

Development Status: Alpha  
Development Roadmap: Check out `dev/DevNote.md`

### A Quick Look
```javascript
// Enable ES6 features
//   https://nodejs.org/en/docs/es6/
"use strict";

// Import the framework
const cuikit = require("cuikit");
// Assign the classes to global scope
//   so we don't have to use `cuikit.NSObject` and so on...
Object.assign(global, cuikit);

// Create the application delegate
//   must extends from `NSObject`
class AppDelegate extends NSObject {
    constructor(){
        super();
        // Enable Objective-C coding style (Woo hoo!)
        let self = this;

        // Create a custom view
        self.view = UIView.initWithFrame(CGRectMake(10, 10, 10, 10));
        // with green background color
        self.view.backgroundColor = UIColor.greenColor();
    }
    applicationDidFinishLaunchingWithOptions(app, options){
        let self = this;

        // Add our custom view to the application
        app.window.addSubview(self.view);

        // Do some animations
        UIView.animateWithDurationAnimations(2, percentage => {
            self.view.frame = CGRectMake(
                10, 10, 10 + 10 * percentage, 10 * percentage
            );
            self.view.layoutIfNeeded();
        });
    }
}

// Launch application with our own delegate
UIApplication.initWithDelegate(new AppDelegate());
```

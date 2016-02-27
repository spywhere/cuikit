// Enable ES6 features
//   https://nodejs.org/en/docs/es6/
"use strict";

// Import the framework
const cuikit = require("cuikit");
// Assign the classes to global scope
//   so we don't have to use `cuikit.NSObject` and so on...
Object.assign(global, cuikit);

// Create the main view controller
//   to control the views
class MainViewController extends UIViewController {
    // When the view is loaded
    viewDidLoad(){
        // Let do what it should do first
        super.viewDidLoad();
        // Enable Objective-C coding style (Woo hoo!)
        let self = this;

        // Create a custom view
        self.aView = UIView.initWithFrame(CGRectMake(10, 5, 10, 0));
        // with green background color
        self.aView.backgroundColor = UIColor.greenColor();
        // and also clip the subviews
        self.aView.clipsToBounds = true;

        // Create another custom view
        let bView = UIView.initWithFrame(CGRectMake(5, 5, 10, 5));
        // fill it with red color
        bView.backgroundColor = UIColor.redColor();

        // Add the bView to the aView
        self.aView.addSubview(bView);
        // then add the aView to the view
        self.view.addSubview(self.aView);
    }
    // When the view is ready
    viewDidAppear(){
        let self = this;

        // Do some animations
        UIView.animateWithDurationAnimations(2, percentage => {
            // Change the aView frame
            self.aView.frame = CGRectMake(
                10, 5, 10 + 10 * percentage, 10 * percentage
            );
            // Layout the view again if needed (which it should!)
            self.aView.layoutIfNeeded();
        });
    }
}

// Create the application delegate
//   must extends from `NSObject`
class AppDelegate extends NSObject {
    // When application is launched
    applicationDidFinishLaunchingWithOptions(app, options){
        // Create a new MainViewController instance
        let mainViewController = MainViewController.init();
        // and set it as a root view controller
        app.window.rootViewController = mainViewController;
    }
}

// Launch application with our own delegate
UIApplication.initWithDelegate(new AppDelegate());

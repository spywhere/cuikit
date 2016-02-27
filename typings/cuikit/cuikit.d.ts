// Type definitions for CUIKit v0.0.1
// Project: https://github.com/spywhere/cuikit
// Definitions by: Sirisak Lueangsaksri <https://github.com/spywhere/>
// Definitions: https://github.com/DefinitelyTyped/DefinitelyTyped

///////////////////
// Core Graphics //
///////////////////
declare class CGPoint {
    x: number;
    y: number;
}

declare function CGPointMake(
    x: number, y: number
): CGPoint;

declare var CGPointZero: CGPoint;

declare class CGRect {
    origin: CGPoint;
    size: CGSize;
}

declare function CGRectMake(
    x: number, y: number, width: number, height: number
): CGRect;

declare var CGRectZero: CGRect;

declare class CGSize {
    width: number;
    height: number;
}

declare function CGSizeMake(
    width: number, height: number
): CGSize;

declare var CGSizeZero: CGSize;

////////////////
// Foundation //
////////////////

declare class NSObject {
    description(): string;
    respondsToSelector(selector: string): boolean;
    performSelector(selector: string, args: any[]): any;
    performSelectorWithObject(selector: string, object: any): any;
    performSelectorWithObjectWithObject(selector: string, object: any, object2: any): any;
    performSelectorWithObjectAfterDelay(selector: string, object: any, delay: number): any;
    isMemberOfClass(clazz: typeof Object): boolean;
    isKindOfClass(clazz: typeof Object): boolean;
    isSubclassOfClass(clazz: typeof Object): boolean;
    isEqual(object: any): boolean;
    hash(): string;
}

////////////
// UI Kit //
////////////

declare class UIApplication extends NSObject {
    delegate: NSObject;
    window: UIWindow;

    static init(): UIApplication;
    static initWithDelegate(delegate: NSObject): UIApplication;
    static sharedApplication(): UIApplication;

    setDelegate(delegate: NSObject): UIApplication;
    launch(): UIApplication;
}

declare class UIColor extends NSObject {
    red: number;
    green: number;
    blue: number;
    clear: boolean;

    static init(): UIColor;
    static initWithWhite(white: number): UIColor;
    static initWithRedGreenBlue(red: number, green: number, blue: number): UIColor;
    static blackColor(): UIColor;
    static darkGrayColor(): UIColor;
    static lightGrayColor(): UIColor;
    static whiteColor(): UIColor;
    static redColor(): UIColor;
    static greenColor(): UIColor;
    static blueColor(): UIColor;
    static cyanColor(): UIColor;
    static yellowColor(): UIColor;
    static magentaColor(): UIColor;
    static orangeColor(): UIColor;
    static purpleColor(): UIColor;
    static brownColor(): UIColor;
    static clearColor(): UIColor;
}

declare class UILabel extends UIView {
    static init(): UILabel;
}

declare class UIScreen extends NSObject {
    bounds: CGRect;

    static init(): UIScreen;
    static mainScreen(): UIScreen;
}

declare class UIView extends NSObject {
    foregroundColor: UIColor;
    backgroundColor: UIColor;
    superview: UIView;
    subviews: UIView[];
    frame: CGRect;
    bounds: CGRect;
    center: CGPoint;
    clipsToBounds: boolean;

    static init(): UIView;
    static initWithFrame(frame: CGRect): UIView;
    static animateWithDurationAnimations(
        duration: number,
        animations: (percentage: number) => void
    ): void;
    static animateWithDurationAnimationsCompletion(
        duration: number,
        animations: (percentage: number) => void,
        completion: () => void
    ): void;

    addSubview(view: UIView): void;
    bringSubviewToFront(view: UIView): void;
    sendSubviewToBack(view: UIView): void;
    insertSubviewAtIndex(view: UIView, index: number): void;
    insertSubviewAboveSubview(view: UIView, siblingView: UIView): void;
    insertSubviewBelowSubview(view: UIView, siblingView: UIView): void;
    exchangeSubviewAtIndexWithSubviewAtIndex(viewIndex: number, siblingViewIndex: number): void;
    removeFromSuperview(): void;
    isDescendantOfView(): boolean;
    layoutSubviews(): void;
    layoutIfNeeded(): void;
    setFrame(frame: CGRect):void;
}

declare class UIViewController extends NSObject {
    view: UIView;
    viewIfLoaded: UIView;
    isViewLoaded: boolean;

    static init(): UIViewController;
    loadView(): void;
    loadViewIfNeeded(): void;
    viewDidLoad(): void;
    viewWillAppear(): void;
    viewDidAppear(): void;
    viewWillDisappear(): void;
    viewDidDisappear(): void;
}

declare class UIWindow extends UIView {
    screen: UIScreen;
    rootViewController: UIViewController;
}

// Type definitions for CUIKit v0.0.1
// Project: https://github.com/spywhere/cuikit
// Definitions by: Sirisak Lueangsaksri <https://github.com/spywhere/>
// Definitions: https://github.com/DefinitelyTyped/DefinitelyTyped

declare class CGPoint {
    x: number;
    y: number;
}

declare class CGSize {
    width: number;
    height: number;
}

declare class CGRect {
    origin: CGPoint;
    size: CGSize;
}

declare function CGPointMake(
    x: number, y: number
): CGPoint;
declare function CGSizeMake(
    width: number, height: number
): CGSize;
declare function CGRectMake(
    x: number, y: number, width: number, height: number
): CGRect;
declare var CGPointZero: CGPoint;
declare var CGSizeZero: CGSize;
declare var CGRectZero: CGRect;

declare class NSObject {
    description(): string;
    respondsToSelector(selector: string): boolean;
    performSelector(selector: string, args: any[]): any;
}

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
    layoutSubviews(): void;
    layoutIfNeeded(): void;
    setFrame(frame: CGRect):void;
}

declare class UIWindow extends UIView {
    screen: UIScreen;
}

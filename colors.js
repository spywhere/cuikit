var moduleExports = {};

function UIColor(){
    var self = this;
    self.red = 0;
    self.green = 0;
    self.blue = 0;
    self.clear = true;
}

UIColor.prototype = Object.create(Object.prototype);
UIColor.prototype.constructor = UIColor;

UIColor.init = function(){
    return new this();
};

UIColor.initWithWhite = function(white){
    return UIColor.initWithRedGreenBlue(white, white, white);
};

UIColor.initWithRedGreenBlue = function(red, green, blue){
    var color = UIColor.init();
    color.red = 255 * red;
    color.green = 255 * green;
    color.blue = 255 * blue;
    color.clear = false;
    return color;
};

UIColor.blackColor = function(){
    return UIColor.initWithRedGreenBlue(0, 0, 0);
};
UIColor.darkGrayColor = function(){
    return UIColor.initWithRedGreenBlue(0.33, 0.33, 0.33);
};
UIColor.lightGrayColor = function(){
    return UIColor.initWithRedGreenBlue(0.66, 0.66, 0.66);
};
UIColor.whiteColor = function(){
    return UIColor.initWithRedGreenBlue(1, 1, 1);
};
UIColor.redColor = function(){
    return UIColor.initWithRedGreenBlue(1, 0, 0);
};
UIColor.greenColor = function(){
    return UIColor.initWithRedGreenBlue(0, 1, 0);
};
UIColor.blueColor = function(){
    return UIColor.initWithRedGreenBlue(0, 0, 1);
};
UIColor.cyanColor = function(){
    return UIColor.initWithRedGreenBlue(0, 1, 1);
};
UIColor.yellowColor = function(){
    return UIColor.initWithRedGreenBlue(1, 1, 0);
};
UIColor.magentaColor = function(){
    return UIColor.initWithRedGreenBlue(1, 0, 1);
};
UIColor.orangeColor = function(){
    return UIColor.initWithRedGreenBlue(1, 0.5, 0);
};
UIColor.purpleColor = function(){
    return UIColor.initWithRedGreenBlue(0.5, 0, 0.5);
};
UIColor.brownColor = function(){
    return UIColor.initWithRedGreenBlue(0.6, 0.4, 0.2);
};
UIColor.clearColor = function(){
    return UIColor.init();
};

moduleExports.UIColor = UIColor;
module.exports = moduleExports;

/* global UIView */
var moduleExports = {};

["./uiview"].forEach(function(moduleName){
    var module = require(moduleName);
    for(var key in module){
        global[key] = module[key];
        moduleExports[key] = module[key];
    }
});

function UILabel(){
    UIView.call(this);
}

UILabel.prototype = Object.create(UIView.prototype);
UILabel.prototype.constructor = UILabel;

UILabel.init = function(){
    return new this();
};

UILabel.prototype.description = function(){
    return "UILabel";
};

moduleExports.UILabel = UILabel;
module.exports = moduleExports;

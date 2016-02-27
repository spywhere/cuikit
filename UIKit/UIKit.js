"use strict";

let moduleExports = {};

[
    "./UIApplication",
    "./UIColor",
    "./UILabel",
    "./UIScreen",
    "./UIView",
    "./UIViewController",
    "./UIWindow"
].forEach(moduleName => {
    let module = require(moduleName);
    Object.assign(moduleExports, module);
});

module.exports = moduleExports;

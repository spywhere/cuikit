"use strict";

let moduleExports = {};

[
    "./lib/NSObject",
    "./lib/Primitives",
    "./lib/UIApplication",
    "./lib/UIColor",
    "./lib/UILabel",
    "./lib/UIScreen",
    "./lib/UIView",
    "./lib/UIWindow"
].forEach(moduleName => {
    let module = require(moduleName);
    Object.assign(moduleExports, module);
});

module.exports = moduleExports;

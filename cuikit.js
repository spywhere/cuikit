/* global _Constant */
"use strict";

let moduleExports = {};

[
    "./nsobject",
    "./primitives",
    "./uiapplication",
    "./uicolor",
    "./uilabel",
    "./uiscreen",
    "./uiview",
    "./uiwindow"
].forEach(moduleName => {
    let module = require(moduleName);
    Object.assign(moduleExports, module);
});

module.exports = moduleExports;

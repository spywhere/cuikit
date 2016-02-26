"use strict";

let moduleExports = {};

[
    "./CGPoint",
    "./CGRect",
    "./CGSize"
].forEach(moduleName => {
    let module = require(moduleName);
    Object.assign(moduleExports, module);
});

module.exports = moduleExports;

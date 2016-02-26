"use strict";

let moduleExports = {};

[
    "./CGGeometry"
].forEach(moduleName => {
    let module = require(moduleName);
    Object.assign(moduleExports, module);
});

module.exports = moduleExports;

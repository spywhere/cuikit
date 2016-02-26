"use strict";

let moduleExports = {};

[
    "./NSObject"
].forEach(moduleName => {
    let module = require(moduleName);
    Object.assign(moduleExports, module);
});

module.exports = moduleExports;

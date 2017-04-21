"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const assert = require("assert");
const extract_script_exports_names_1 = require("../extract-script-exports-names");
let sample = `
export let test;
export const something;
let x = 123;
export default otherstuff;
`;
assert(extract_script_exports_names_1.extractScriptExportsName(sample).toString() === ['test', 'something', 'otherstuff'].toString());

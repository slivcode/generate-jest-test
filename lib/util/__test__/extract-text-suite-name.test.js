"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const assert = require("assert");
const extract_text_suite_name_test_1 = require("../extract-text-suite-name.test");
let x = extract_text_suite_name_test_1.extractTextSuiteName(`
test('[FunctionOne]', () => {})

test('[FunctionTwo]', () => {})
`);
assert(x.toString() === ['FunctionOne', 'FunctionTwo'].toString());

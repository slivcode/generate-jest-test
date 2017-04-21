"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const path_1 = require("path");
const generate_jest_test_1 = require("../generate-jest-test");
const assert = require("assert");
const fs_extra_promise_1 = require("fs-extra-promise");
const fs_extra_1 = require("fs-extra");
let R = f => f();
R(() => __awaiter(this, void 0, void 0, function* () {
    yield generate_jest_test_1.generateJestTest({ target: path_1.resolve(__dirname, 'case', 'case-file.ts') });
    let ctn = yield fs_extra_promise_1.readFileAsync(path_1.resolve(__dirname, 'case', '__test__', 'case-file.test.ts'), 'utf-8');
    assert(ctn.length !== -1);
    yield fs_extra_1.emptyDirSync(path_1.resolve(__dirname, 'case', '__test__'));
}));

#!/usr/bin/env node
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
const yargs = require("yargs");
const fs_extra_promise_1 = require("fs-extra-promise");
const generate_jest_test_1 = require("../generate-jest-test");
const path_1 = require("path");
let { argv } = yargs;
const createTestInRootFolder = () => __awaiter(this, void 0, void 0, function* () {
    let cwd = process.cwd();
    let dir = yield fs_extra_promise_1.readdirAsync(cwd);
    let exts = ['.js', '.ts'];
    let items = dir.filter((d) => exts.some(e => d.endsWith(e)));
    yield Promise.all(items.map(i => generate_jest_test_1.generateJestTest({ target: path_1.resolve(cwd, i) })));
});
let run = () => __awaiter(this, void 0, void 0, function* () {
    if (argv._.length === 0) {
        yield createTestInRootFolder();
    }
    else {
        yield generate_jest_test_1.generateJestTest({ target: path_1.resolve(process.cwd(), ...argv._) });
    }
});
run().catch(console.error);

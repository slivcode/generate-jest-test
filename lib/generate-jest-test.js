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
const RC = require("rc");
const fs_extra_promise_1 = require("fs-extra-promise");
const path_1 = require("path");
const from_promise_1 = require("err-result-pair/from-promise");
const extract_script_exports_names_1 = require("./util/extract-script-exports-names");
const extract_text_suite_name_test_1 = require("./util/extract-text-suite-name.test");
let conf = RC('generate-jest-test', {
    folderName: '__test__',
    testExt: 'test',
});
let readFileAsyncUtf8 = i => from_promise_1.fromPromise(fs_extra_promise_1.readFileAsync(i, 'utf-8'));
exports.generateJestTest = (a) => __awaiter(this, void 0, void 0, function* () {
    let { target } = a;
    let { folderName, testExt } = conf;
    let [noSrcFileErr, srcContent] = yield readFileAsyncUtf8(target);
    if (noSrcFileErr)
        throw new Error(`${target} does not exist.`);
    let srcExportNames = extract_script_exports_names_1.extractScriptExportsName(srcContent);
    let testPath = path_1.resolve(path_1.dirname(target), folderName);
    yield fs_extra_promise_1.mkdirpAsync(testPath);
    let testFileName = path_1.basename(target).split('.').slice(0, -1).join('.') + `.${testExt}.ts`;
    let testFilePath = path_1.resolve(testPath, testFileName);
    let [isTestFileNotExist, testFileContent] = yield readFileAsyncUtf8(testFilePath);
    let suiteText = a => a.map(n => `test('[${n}] suite', () => {\n});`).join('\n\n');
    if (isTestFileNotExist) {
        yield fs_extra_promise_1.writeFileAsync(testFilePath, suiteText(srcExportNames));
    }
    else {
        let existTestSuiteName = extract_text_suite_name_test_1.extractTextSuiteName(testFileContent);
        let toAddSuiteNames = srcExportNames.filter(i => existTestSuiteName.indexOf(i) === -1);
        if (toAddSuiteNames.length > 0) {
            yield fs_extra_promise_1.appendFileAsync(testFilePath, '\n\n' + suiteText(toAddSuiteNames));
        }
    }
    return null;
});

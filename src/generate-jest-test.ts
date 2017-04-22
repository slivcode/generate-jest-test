import * as RC from 'rc';
import { appendFileAsync, mkdirpAsync, readFileAsync, writeFileAsync } from 'fs-extra-promise';
import { dirname, basename, resolve, extname } from 'path';
import { fromPromise } from 'err-result-pair/from-promise';
import * as warning from 'warning';
import { extractScriptExportsName } from './util/extract-script-exports-names';
import { extractTextSuiteName } from './util/extract-text-suite-name.test';

let conf = RC('generate-jest-test', {
	folderName: '__test__',
	testExt: 'test',
});
let readFileAsyncUtf8: (i: string) => Promise<[any, string]> = i => fromPromise(readFileAsync(i, 'utf-8') as any);
export type T_generateJestTest = (a: { target: string }) => Promise<string>;
export const generateJestTest: T_generateJestTest = async (a) => {
	let { target } = a;
	let { folderName, testExt } = conf;
	let [noSrcFileErr, srcContent] = await readFileAsyncUtf8(target);
	let targetExt = extname(target);
	if (noSrcFileErr) throw new Error(`${target} does not exist.`);
	let srcExportNames = extractScriptExportsName(srcContent);
	let testPath = resolve(dirname(target), folderName);
	await mkdirpAsync(testPath);
	let testFileName = basename(target).split('.').slice(0, -1).join('.') + `.${testExt}${targetExt}`;
	let testFilePath = resolve(testPath, testFileName);
	let [isTestFileNotExist, testFileContent] = await readFileAsyncUtf8(testFilePath);
	let suiteText = a => a.map(n => `describe('[${n}] suite', () => {\n});`).join('\n\n');
	if (isTestFileNotExist) {
		await writeFileAsync(testFilePath, suiteText(srcExportNames));
	} else {
		let existTestSuiteName = extractTextSuiteName(testFileContent);
		let toAddSuiteNames = srcExportNames.filter(i => existTestSuiteName.indexOf(i) === -1);
		if (toAddSuiteNames.length > 0) {
			await appendFileAsync(testFilePath, '\n\n' + suiteText(toAddSuiteNames));
		}
	}
	return testFilePath;
};


import { resolve } from 'path';
import { generateJestTest } from '../generate-jest-test';
import * as assert from 'assert';
import { readFileAsync, rmdirAsync, emptyDir } from 'fs-extra-promise';
import { emptyDirSync } from 'fs-extra';
let R = f => f();
R(async () => {
	await generateJestTest({ target: resolve(__dirname, 'case', 'case-file.ts') });
	let ctn = await readFileAsync(resolve(__dirname, 'case', '__test__', 'case-file.test.ts'), 'utf-8');
	assert(ctn.length !== -1);
	await emptyDirSync(resolve(__dirname, 'case', '__test__'));
});

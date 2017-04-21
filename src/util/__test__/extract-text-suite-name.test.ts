import * as assert from 'assert';
import { extractTextSuiteName } from '../extract-text-suite-name.test';
let x = extractTextSuiteName(`
test('[FunctionOne]', () => {})

test('[FunctionTwo]', () => {})
`);

assert(
	x.toString() === ['FunctionOne', 'FunctionTwo'].toString(),
);
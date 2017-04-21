import * as assert from 'assert';
import { extractScriptExportsName } from '../extract-script-exports-names';

let sample = `
export let test;
export const something;
let x = 123;
export default otherstuff;
`;

assert(
	extractScriptExportsName(sample).toString() === ['test', 'something', 'otherstuff'].toString(),
);


#!/usr/bin/env node
import * as yargs from 'yargs';
import { readdirAsync } from 'fs-extra-promise';
import { generateJestTest } from '../generate-jest-test';
import { resolve } from 'path';

let { argv } = yargs;


const createTestInRootFolder = async () => {
	let cwd = process.cwd();
	let dir = await readdirAsync(cwd);
	let exts = ['.js', '.ts'];
	let items = dir.filter((d) => exts.some(e => d.endsWith(e)));
	await Promise.all(items.map(i => generateJestTest({ target: resolve(cwd, i) })));
};

let run = async () => {
	if (argv._.length === 0) {
		await createTestInRootFolder();
	} else {
		await generateJestTest({ target: resolve(process.cwd(), ...argv._) });
	}
};

run().catch(console.error);
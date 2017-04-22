#!/usr/bin/env node
import * as yargs from 'yargs';
import { readdirAsync } from 'fs-extra-promise';
import { generateJestTest } from '../generate-jest-test';
import { resolve } from 'path';
import { execSync, spawn } from 'child_process';

let { argv } = yargs
	.option('aftercmd', {
		type: 'string',
	})
	.help();

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
		let p = await generateJestTest({ target: resolve(process.cwd(), ...argv._) });
		if (argv.aftercmd) {
			spawn(argv.aftercmd, [p], { stdio: 'inherit' });
		}
	}
};

run().catch(console.error);
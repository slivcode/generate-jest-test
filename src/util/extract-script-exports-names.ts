let exportRegex = /export\s(?:let|const|var|default|function|class)\s((\w|\d)+)/;
let globalRegex = new RegExp(exportRegex, 'g');
export type T_extractScriptExportsName = (content: string) => string[];
export const extractScriptExportsName: T_extractScriptExportsName = (content) => {
	let items = content.match(globalRegex) || [];
	return items.map(i => i.match(exportRegex)[1]);
};
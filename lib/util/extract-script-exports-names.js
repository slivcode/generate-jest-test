"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
let exportRegex = /export\s(?:let|const|var|default)\s((\w|\d)+)/;
let globalRegex = new RegExp(exportRegex, 'g');
exports.extractScriptExportsName = (content) => {
    let items = content.match(globalRegex) || [];
    return items.map(i => i.match(exportRegex)[1]);
};

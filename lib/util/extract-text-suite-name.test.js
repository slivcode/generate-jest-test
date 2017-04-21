"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.extractTextSuiteName = c => {
    return (c.match(/test\('\[(.+?)\]/g) || []).map(i => i.match(/test\('\[(.+?)\]/)[1]);
};

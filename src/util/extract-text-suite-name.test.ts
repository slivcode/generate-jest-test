export type T_extractTextSuiteName = (content: string) => string[];
export const extractTextSuiteName: T_extractTextSuiteName = c => {
	return (c.match(/test\('\[(.+?)\]/g) || []).map(i => i.match(/test\('\[(.+?)\]/)[1]);
};
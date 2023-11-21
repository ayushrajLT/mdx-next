import remarkGfm from "remark-gfm";
// import rehypeHighlight from "rehype-highlight";
import { evaluateSync } from "@mdx-js/mdx";
import * as runtime from "react/jsx-runtime";

export function generate(body: string) {
	const mdx = evaluateSync(body, {
		...(runtime as any),
		development: false,
		// baseUrl: import.meta.url,

		useDynamicImport: true,
		remarkPlugins: [remarkGfm],
		// rehypePlugins: [rehypeHighlight],
	});

	return mdx;
}

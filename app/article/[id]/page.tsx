// import Article from "@/components/Article";
import Audio from "@/components/Audio";
import HTMLAnchor from "@/components/HTMLAnchor";
import MDXComponent from "@/components/MDXComponent";
import { generate } from "@/utils";
import { MDXComponents } from "mdx/types";

type Props = { params: { id: string } };
const components: MDXComponents = {
	Audio,
	a: HTMLAnchor,
	h1: (...params) => <MDXComponent Component="h1" {...params} />,
	h2: (...params) => <MDXComponent Component="h2" {...params} />,
	h3: (...params) => <MDXComponent Component="h3" {...params} />,
	h4: (...params) => <MDXComponent Component="h4" {...params} />,
	h5: (...params) => <MDXComponent Component="h5" {...params} />,
	h6: (...params) => <MDXComponent Component="h6" {...params} />,
	strong: (...params) => <MDXComponent Component="strong" {...params} />,
	table: (...params) => <MDXComponent Component="table" {...params} />,
};

async function getData({ id }: Pick<Props["params"], "id">) {
	const res = await fetch(`http://localhost:7777/article/${id}`, {
		cache: "no-store",
	});
	if (!res.ok) {
		throw new Error("Failed to fetch article");
	}
	return res.json();
}

export default async function Page({ params }: Props) {
	const { data } = await getData({ id: params.id });
	const { default: MDXContent } = generate(data);

	return <MDXContent components={components} />;
}

export async function generateStaticParams() {
	const { data } = await fetch(`http://localhost:7777/articles`, {
		cache: "no-cache",
	}).then((res) => res.json());
	return data;
}

// import { MDXRemote } from "next-mdx-remote/rsc";
// import { serialize } from "next-mdx-remote/serialize";
// import React from "react";
// import Audio from "@/components/Audio";

// const components = { Audio };
// export default function TestPage({ source }: { source: any }) {
// 	console.log(source);
// 	return (
// 		<div className="wrapper">
// 			<MDXRemote {...source} components={components} />
// 		</div>
// 	);
// }

// export async function getStaticProps() {
// 	// MDX text - can be from a local file, database, anywhere
// 	const source = "Some **mdx** text, with a component <Test />";
// 	const mdxSource = await serialize(source);
// 	return { props: { source: mdxSource } };
// }

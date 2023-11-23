"use client";
import "@mdxeditor/editor/style.css";
import { MDXComponents } from "mdx/types";
import Audio from "@/components/Audio";
import AudioDialog from "@/components/AudioDialog";
import HTMLAnchor from "@/components/HTMLAnchor";
import useLocalStorage from "@/hooks/useLocalStorage";
import { generate } from "@/utils";
import {
	BlockTypeSelect,
	BoldItalicUnderlineToggles,
	Button,
	CreateLink,
	InsertImage,
	InsertTable,
	ListsToggle,
	MDXEditor,
	UndoRedo,
	headingsPlugin,
	imagePlugin,
	jsxPlugin,
	jsxPluginHooks,
	linkDialogPlugin,
	linkPlugin,
	listsPlugin,
	markdownShortcutPlugin,
	quotePlugin,
	tablePlugin,
	toolbarPlugin,
} from "@mdxeditor/editor";
import { useState } from "react";
import MDXComponent from "@/components/MDXComponent";
import "./editor.css";
const jsxComponentDescriptors = [
	{
		name: "Audio",
		kind: "block",
		hasChildren: true,
		Editor: (s: any) => (
			<Audio
				src={s.mdastNode.attributes[0].value}
				text={s.mdastNode.attributes[1].value}
			/>
		),
	},
];

const components: MDXComponents = {
	Audio,
	a: HTMLAnchor,
	p: (params) => <MDXComponent Component="p" {...params} />,
	h1: (params) => <MDXComponent Component="h1" {...params} />,
	h2: (params) => <MDXComponent Component="h2" {...params} />,
	h3: (params) => <MDXComponent Component="h3" {...params} />,
	h4: (params) => <MDXComponent Component="h4" {...params} />,
	h5: (params) => <MDXComponent Component="h5" {...params} />,
	h6: (params) => <MDXComponent Component="h6" {...params} />,
	strong: (params) => <MDXComponent Component="strong" {...params} />,
	blockquote: (params) => <MDXComponent Component="blockquote" {...params} />,
	// table
	table: (params) => <MDXComponent Component="table" {...params} />,
	th: (params) => <MDXComponent Component="th" {...params} />,
	td: (params) => <MDXComponent Component="td" {...params} />,
	tr: (params) => <MDXComponent Component="tr" {...params} />,
	// list
	ul: (params) => <MDXComponent Component="ul" {...params} />,
	li: (params) => <MDXComponent Component="li" {...params} />,
	ol: (params) => <MDXComponent Component="ol" {...params} />,
};

const InsertAudio = () => {
	const insertJsx = jsxPluginHooks.usePublisher("insertJsx");
	const [show, setShow] = useState(false);

	return (
		<>
			<AudioDialog
				open={show}
				setOpen={setShow}
				onSave={(data) =>
					insertJsx({
						name: "Audio",
						kind: "text",
						props: data,
					})
				}
			/>
		</>
	);
};

function Page() {
	const [value, setValue] = useLocalStorage(
		"mdx",
		`
	# This is heading 1
	## This is heading 2
	`
	);
	const { default: MDXContent } = generate(value);

	const getHTML = () => {
		console.log(document.getElementById("preview")?.innerHTML);
	};
	const [uploadingLoading, setUploadingLoading] = useState(false);

	const uploadFile = async (file: File) => {
		const formData = new FormData();
		formData.append("file", file);
		setUploadingLoading(true);
		return fetch("http://localhost:7777/upload", {
			method: "POST",
			body: formData,
		})
			.then((response) => response.json())
			.then((data) => {
				// Handle the response data here
				console.log("Uploaded URL:", data.url);
				return data.url;
			})
			.catch((error) => {
				console.error("Error uploading:", error);
			})
			.finally(() => setUploadingLoading(false));
	};

	return (
		<div className="grid min-h-screen gap-2 divide-y-4 md:divide-x-2 md:grid-cols-2">
			<MDXEditor
				markdown={value}
				contentEditableClassName="editor"
				onChange={(e) => setValue(e)}
				autoFocus
				placeholder="Write here"
				plugins={[
					// @ts-expect-error fix this later
					jsxPlugin({ jsxComponentDescriptors }),
					headingsPlugin(),
					listsPlugin(),
					linkPlugin(),
					quotePlugin(),
					markdownShortcutPlugin(),
					tablePlugin(),
					imagePlugin({
						imageUploadHandler: uploadFile,
					}),
					linkPlugin(),
					linkDialogPlugin(),
					toolbarPlugin({
						toolbarContents: () => {
							return (
								<>
									<BlockTypeSelect />
									<BoldItalicUnderlineToggles />
									<ListsToggle />
									<InsertAudio />
									<InsertImage />
									<InsertTable />
									<CreateLink />
									<UndoRedo />
									<Button onClick={() => getHTML()}>Save</Button>
								</>
							);
						},
					}),
				]}
			/>
			<div>
				<h2 className="mt-1 mb-4 text-center text-blue-500">Preview</h2>
				<div className="w-full pl-4 markdown" id="preview">
					{/* <html> */}
					{/* <body> */}
					<MDXContent components={components} />
					{/* </body> */}
					{/* </html> */}
				</div>
			</div>
		</div>
	);
}

export default Page;

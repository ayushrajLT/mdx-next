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
import "@/styles/editor.css";

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

	return (
		<AudioDialog
			onSave={(data) =>
				insertJsx({
					name: "Audio",
					kind: "text",
					props: data,
				})
			}
		/>
	);
};

function Page() {
	const { value, debouncedSetValue: setValue } = useLocalStorage(
		"mdx",
		`# Craft your article here
## Use the toolbar above for formatting`
	);
	const { default: MDXContent } = generate(value);

	const getHTML = () => {
		const article = document.getElementById("preview")?.innerHTML;
		navigator.clipboard.writeText(article || "");
		setTimeout(() => {
			window.alert("Article has been to your clipboard!");
		}, 100);
		console.log(article);
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
		<div className="container">
			<MDXEditor
				markdown={value}
				contentEditableClassName="editor"
				onChange={(e) => setValue(e)}
				autoFocus
				placeholder="Craft your article here"
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
						imageUploadHandler: async () => {
							window.alert(
								"Uploading images is not supported right now. Please upload them somewhere and paste the link below"
							);
							return "";
						},
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
				<h2 className="previewHeading">Preview</h2>
				<div className="markdown" id="preview">
					{/* <html> */}
					{/* <body> */}
					{/* @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap'); */}
					<style
						dangerouslySetInnerHTML={{
							__html: `
							a:hover {
								text-decoration: underline;
							}
							button {
  							font-family: inherit; /* 1 */
  							font-feature-settings: inherit; /* 1 */
  							font-variation-settings: inherit; /* 1 */
  							font-size: 100%; /* 1 */
  							font-weight: inherit; /* 1 */
  							line-height: inherit; /* 1 */
  							color: inherit; /* 1 */
  							margin: 0; /* 2 */
  							padding: 0; /* 3 */
							}
							`,
						}}
					/>
					<MDXContent components={components} />
					{/* </body> */}
					{/* </html> */}
				</div>
			</div>
		</div>
	);
}

export default Page;

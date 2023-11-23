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
import Typography from "@/components/MDXComponent";

const jsxComponentDescriptors = [
	{
		name: "Audio",
		kind: "block",
		props: [{ src: "audio.mp3", type: "string" }],
		hasChildren: true,
		Editor: (s: any) => <Audio src={s.mdastNode.attributes[0].value} />,
	},
];

const components: MDXComponents = {
	Audio,
	a: HTMLAnchor,
	p: (params) => <Typography Component="p" {...params} />,
	h1: (params) => <Typography Component="h1" {...params} />,
	h2: (params) => <Typography Component="h2" {...params} />,
	h3: (params) => <Typography Component="h3" {...params} />,
	h4: (params) => <Typography Component="h4" {...params} />,
	h5: (params) => <Typography Component="h5" {...params} />,
	h6: (params) => <Typography Component="h6" {...params} />,
	strong: (params) => <Typography Component="strong" {...params} />,
	table: (params) => <Typography Component="table" {...params} />,
	th: (params) => <Typography Component="th" {...params} />,
	td: (params) => <Typography Component="td" {...params} />,
	tr: (params) => <Typography Component="tr" {...params} />,
};

const InsertAudio = () => {
	const insertJsx = jsxPluginHooks.usePublisher("insertJsx");
	const [show, setShow] = useState(false);
	const [value, setValue] = useState<File | null>(null);
	const [uploadingLoading, setUploadingLoading] = useState(false);

	const uploadFile = (file: File) => {
		setUploadingLoading(true);
		const formData = new FormData();
		formData.append("file", file);

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
		<>
			<AudioDialog
				open={show}
				setOpen={setShow}
				value={value}
				setValue={setValue}
				loading={uploadingLoading}
				onSave={(url) => {
					if (url) {
						insertJsx({
							name: "Audio",
							kind: "text",
							props: { src: url },
						});
						return setShow(false);
					}
					if (value) {
						uploadFile(value).then((src) => {
							if (src) {
								insertJsx({
									name: "Audio",
									kind: "text",
									props: { src },
								});
							}
							return setShow(false);
						});
					}
				}}
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
				contentEditableClassName="prose editor"
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
					<MDXContent components={components} />
				</div>
			</div>
		</div>
	);
}

export default Page;

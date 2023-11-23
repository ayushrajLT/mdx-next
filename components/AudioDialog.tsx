import React, { useState } from "react";
import * as Dialog from "@radix-ui/react-dialog";
import { Cross2Icon } from "@radix-ui/react-icons";
import { ButtonWithTooltip } from "@mdxeditor/editor";
import Spinner from "./Spinner";
import { useForm } from "react-hook-form";

type Form = {
	url?: string;
	text: string;
};

const AudioDialog = ({
	open,
	setOpen,
	onSave,
}: {
	open: boolean;
	setOpen: React.Dispatch<React.SetStateAction<boolean>>;
	onSave: (data: Record<string, string>) => void;
}) => {
	const { handleSubmit, register, reset } = useForm<Form>({
		defaultValues: {},
	});

	const [loading, setLoading] = useState(false);

	const uploadFile = async (file: File) => {
		setLoading(true);
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
			.finally(() => setLoading(false));
	};

	const [value, setValue] = useState<File | null>(null);

	const onSubmit = handleSubmit(async (data) => {
		if (data.url) {
			onSave(data);
			reset({});
		}
		if (value) {
			await uploadFile(value)
				.then((url) => onSave({ ...data, url }))
				.then(() => setValue(null))
				.then(() => reset({}));
		}
	});

	return (
		<Dialog.Root open={open} onOpenChange={setOpen}>
			<Dialog.Trigger asChild>
				<ButtonWithTooltip title="Insert Audio">
					<span style={{ width: 20, height: 20 }}>
						<svg
							xmlns="http://www.w3.org/2000/svg"
							fill="none"
							viewBox="0 0 24 24"
							strokeWidth={2.1}
							stroke="currentColor"
							style={{ width: 20, height: 20 }}
						>
							<path
								strokeLinecap="round"
								strokeLinejoin="round"
								d="M12 18.75a6 6 0 006-6v-1.5m-6 7.5a6 6 0 01-6-6v-1.5m6 7.5v3.75m-3.75 0h7.5M12 15.75a3 3 0 01-3-3V4.5a3 3 0 116 0v8.25a3 3 0 01-3 3z"
							/>
						</svg>
					</span>
				</ButtonWithTooltip>
			</Dialog.Trigger>
			<Dialog.Portal>
				<Dialog.Overlay className="bg-blackA6 data-[state=open]:animate-overlayShow fixed inset-0" />
				<Dialog.Content className="data-[state=open]:animate-contentShow fixed top-[50%] left-[50%] max-h-[85vh] w-[90vw] max-w-[450px] translate-x-[-50%] translate-y-[-50%] rounded-2xl bg-white p-[25px] shadow-[hsl(206_22%_7%_/_35%)_0px_10px_38px_-10px,_hsl(206_22%_7%_/20%)_0px_10px_20px_-15px] focus:outline-none">
					<form onSubmit={onSubmit}>
						<fieldset className="mb-[15px] flex flex-col gap-5">
							<label className="" htmlFor="audioFile">
								Upload an audio from your device:
							</label>
							<input
								disabled={loading}
								type="file"
								accept=".mp3"
								onChange={(e) =>
									setValue(e.target.files ? e.target.files[0] : null)
								}
							/>
						</fieldset>
						<fieldset className="mb-[15px] flex flex-col gap-5">
							<label className="" htmlFor="audioFile">
								Or add an audio from an URL:
							</label>
							<input
								className="border border-black p-2 rounded-lg"
								disabled={loading}
								{...register("url")}
							/>
						</fieldset>
						<fieldset className="mb-[15px] flex flex-col gap-5">
							<label className="" htmlFor="audioFile">
								Text
							</label>
							<input
								required
								className="border border-black p-2 rounded-lg"
								disabled={loading}
								{...register("text")}
							/>
						</fieldset>
						<div className="mt-[25px] flex justify-end">
							<div className="flex gap-4">
								<button
									type="submit"
									title="Save"
									aria-label="Save"
									// onClick={() => {
									// 	onSave(url || value);
									// 	setUrl("");
									// }}
									disabled={loading}
									className="px-3 py-1.5 text-white bg-blue-500 rounded-lg"
									// className={classNames(styles.primaryButton)}
								>
									{loading ? <Spinner /> : "Save"}
								</button>
								<Dialog.Close asChild>
									<button
										disabled={loading}
										type="reset"
										title="Cancel"
										className="px-3 py-1.5 text-white bg-gray-500 rounded-lg"
										aria-label="Cancel"
										// className={classNames(styles.secondaryButton)}
									>
										{loading ? <Spinner /> : "Cancel"}
									</button>
								</Dialog.Close>
							</div>
						</div>
						<Dialog.Close asChild>
							<button
								className="text-violet11 hover:bg-violet4 focus:shadow-violet7 absolute top-4 right-4 inline-flex h-6 w-6 appearance-none items-center justify-center rounded-full focus:shadow-[0_0_0_2px] focus:outline-none"
								aria-label="Close"
								disabled={loading}
							>
								<Cross2Icon height="100%" width="100%" />
							</button>
						</Dialog.Close>
					</form>
				</Dialog.Content>
			</Dialog.Portal>
		</Dialog.Root>
	);
};

export default AudioDialog;

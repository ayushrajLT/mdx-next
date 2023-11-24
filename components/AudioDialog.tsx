import isURL from "validator/es/lib/isURL";
import React, { useEffect, useState } from "react";
import * as Dialog from "@radix-ui/react-dialog";
import { Cross2Icon } from "@radix-ui/react-icons";
import { ButtonWithTooltip } from "@mdxeditor/editor";
import Spinner from "./Spinner";
import { useForm } from "react-hook-form";
import styles from "../styles/ui.module.css";
type Form = {
	url?: string;
	text: string;
};

const AudioDialog = ({
	onSave,
}: {
	onSave: (data: Record<string, string>) => void;
}) => {
	const {
		handleSubmit,
		register,
		reset,
		formState: { errors },
	} = useForm<Form>();

	console.log("hello audio");
	const [open, setOpen] = useState(false);
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
			setOpen(false);
		}
		if (value) {
			await uploadFile(value)
				.then((url) => onSave({ ...data, url }))
				.then(() => {
					setValue(null);
					setOpen(false);
				});
		}
	});

	useEffect(() => {
		return () => {
			reset();
		};
	}, [reset]);

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
				<Dialog.Overlay className={styles.dialogOverlay} />
				<Dialog.Content className={styles.dialogContent}>
					<form onSubmit={onSubmit} className={styles.multiFieldForm}>
						{/* <div className={styles.formField}>
							<label  htmlFor="audioFile">
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
						</div> */}
						<div className={styles.formField}>
							<label htmlFor="url">Audio URL</label>
							<input
								className={styles.textInput}
								required
								disabled={loading}
								{...register("url", {
									required: true,
									validate: (value) =>
										isURL(value || "", {
											protocols: ["https", "http"],
										}) || "Invalid URL",
								})}
							/>
							<span className="text-red-500 text-xs">
								{errors?.url?.message}
							</span>
						</div>
						<div className={styles.formField}>
							<label htmlFor="text">Audio Text</label>
							<input
								className={styles.textInput}
								required
								disabled={loading}
								{...register("text", { required: true })}
							/>
							<span className="text-red-500 text-xs">
								{errors?.text?.message}
							</span>
						</div>

						<div
							style={{
								display: "flex",
								justifyContent: "flex-end",
								gap: 16,
							}}
						>
							<button
								type="submit"
								disabled={loading}
								title="Save"
								aria-label="Save"
								className={styles.primaryButton}
							>
								{loading ? <Spinner /> : "Save"}
							</button>
							<Dialog.Close asChild>
								<button
									type="reset"
									title="Cancel"
									aria-label="Cancel"
									className={styles.secondaryButton}
								>
									{loading ? <Spinner /> : "Cancel"}
								</button>
							</Dialog.Close>
						</div>

						{/* <Dialog.Close asChild>
							<button
								className="text-violet11 hover:bg-violet4 focus:shadow-violet7 absolute top-4 right-4 inline-flex h-6 w-6 appearance-none items-center justify-center rounded-full focus:shadow-[0_0_0_2px] focus:outline-none"
								aria-label="Close"
								disabled={loading}
							>
								<Cross2Icon height="100%" width="100%" />
							</button>
						</Dialog.Close> */}
					</form>
				</Dialog.Content>
			</Dialog.Portal>
		</Dialog.Root>
	);
};

export default AudioDialog;

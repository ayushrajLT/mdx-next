import React from "react";
import * as Dialog from "@radix-ui/react-dialog";
import { Cross2Icon } from "@radix-ui/react-icons";
import { ButtonWithTooltip } from "@mdxeditor/editor";
import Spinner from "./Spinner";

const AudioDialog = ({
	open,
	setOpen,
	value,
	setValue,
	loading,
	onSave,
}: {
	open: boolean;
	setOpen: React.Dispatch<React.SetStateAction<boolean>>;
	value: File | null;
	setValue: React.Dispatch<React.SetStateAction<File | null>>;
	loading: boolean;
	onSave: () => void;
}) => (
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
				{loading ? (
					<Spinner />
				) : (
					<>
						<fieldset className="mb-[15px] flex flex-col gap-5">
							<label className="" htmlFor="audioFile">
								Upload an audio from your device:
							</label>
							<input
								type="file"
								accept=".mp3"
								onChange={(e) =>
									setValue(e.target.files ? e.target.files[0] : null)
								}
							/>
						</fieldset>
						<div className="mt-[25px] flex justify-end">
							<div className="flex gap-4">
								<button
									type="submit"
									title="Save"
									aria-label="Save"
									onClick={onSave}
									className="px-3 py-1.5 text-white bg-blue-500 rounded-lg"
									// className={classNames(styles.primaryButton)}
								>
									Save
								</button>
								<Dialog.Close asChild>
									<button
										type="reset"
										title="Cancel"
										className="px-3 py-1.5 text-white bg-gray-500 rounded-lg"
										aria-label="Cancel"
										// className={classNames(styles.secondaryButton)}
									>
										Cancel
									</button>
								</Dialog.Close>
							</div>
						</div>
						<Dialog.Close asChild>
							<button
								className="text-violet11 hover:bg-violet4 focus:shadow-violet7 absolute top-4 right-4 inline-flex h-6 w-6 appearance-none items-center justify-center rounded-full focus:shadow-[0_0_0_2px] focus:outline-none"
								aria-label="Close"
							>
								<Cross2Icon height="100%" width="100%" />
							</button>
						</Dialog.Close>
					</>
				)}
			</Dialog.Content>
		</Dialog.Portal>
	</Dialog.Root>
);

export default AudioDialog;

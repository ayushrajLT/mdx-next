import React, { AnchorHTMLAttributes } from "react";

const HTMLAnchor = (props: AnchorHTMLAttributes<HTMLAnchorElement>) => (
	<a {...props} target="_blank" />
);

export default HTMLAnchor;

import React from "react";

type Props = {
	Component:
		| "h1"
		| "h2"
		| "h3"
		| "h4"
		| "h5"
		| "h6"
		| "strong"
		| "table"
		| "tbody"
		| "th"
		| "tr"
		| "td"
		| "p";
};

const color = {
	headings: "#111827",
};

function getStyle(element: Props["Component"]): React.CSSProperties {
	switch (element) {
		case "h1":
			return {
				color: color["headings"],
				fontWeight: 800,
				fontSize: "2.25em",
				// marginTop: 0,
				marginBottom: "0.8888889em",
				lineHeight: 1.1111111,
			};
		case "h2":
			return {
				color: color["headings"],
				fontWeight: 700,
				fontSize: "1.5em",
				// marginTop: "2em",
				marginBottom: "1em",
				lineHeight: 1.3333333,
			};

		case "h3": {
			return {
				fontWeight: 600,
				fontSize: "1.25em",
				// marginTop: "1.6em",
				marginBottom: "0.6em",
				lineHeight: 1.6,
			};
		}
		case "h4":
			return {
				color: color["headings"],
				fontWeight: 600,
				// marginTop: "1.5em",
				marginBottom: "0.5em",
				lineHeight: 1.5,
			};
		case "h5":
		case "h6":
			return {
				fontSize: "inherit",
				fontWeight: "inherit",
			};
		case "p": {
			return {
				marginTop: "1.25em",
				marginBottom: "1.25em",
			};
		}
		case "strong": {
			return {
				fontWeight: 700,
				color: "inherit",
			};
		}
		case "table": {
			return {
				width: "100%",
				color: "#1a202c",
				marginBottom: "1rem",
				padding: 0,
				borderCollapse: "collapse",
			};
		}
		case "tr": {
			return {
				borderColor: "black",
				borderTopWidth: 1,
				backgroundColor: "#fff",
				margin: 0,
				padding: 0,
			};
		}
		case "td": {
			return {
				borderColor: "black",
				borderWidth: 1,
				textAlign: "left",
				margin: 0,
				padding: "6px 13px",
			};
		}
		case "th": {
			return {
				fontWeight: 700,
				borderColor: "black",
				borderWidth: 1,
				textAlign: "left",
				margin: 0,
				padding: "6px 13px",
			};
		}
		default:
			return {
				fontSize: "inherit",
				fontWeight: "inherit",
			};
	}
}

function MDXComponent<T>({ Component, ...props }: Props & T) {
	return <Component {...props} style={getStyle(Component)} />;
}

export default MDXComponent;

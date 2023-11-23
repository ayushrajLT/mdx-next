import React from "react";

enum HTMLTags {
  H1 = "h1",
  H2 = "h2",
  H3 = "h3",
  H4 = "h4",
  H5 = "h5",
  H6 = "h6",
  STRONG = "strong",
  BLOCKQUOTE = "blockquote",
  TABLE = "table",
  TBODY = "tbody",
  TH = "th",
  TR = "tr",
  TD = "td",
  P = "p",
  UL = "ul",
  OL = "ol",
  LI = "li",
}

type Props = {
  style?: React.CSSProperties;
  Component:
    | "h1"
    | "h2"
    | "h3"
    | "h4"
    | "h5"
    | "h6"
    | "strong"
    | "blockquote"
    | "table"
    | "tbody"
    | "th"
    | "tr"
    | "td"
    | "p"
    | "ul"
    | "ol"
    | "li"
    | "img"
    | "thead";
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
    case "blockquote": {
      return {
        fontWeight: 500,
        fontStyle: "italic",
        color: "var(--tw-prose-quotes)",
        borderLeftWidth: "0.25rem",
        borderLeftColor: "var(--tw-prose-quote-borders)",
        quotes: `"x81C""x81D""x818""x819"`,
        marginTop: "1.6em",
        marginBottom: "1.6em",
        paddingLeft: "1em",
      };
    }
    case "table": {
      return {
        width: "100%",
        color: "#1a202c",
        marginBottom: "1rem",
        padding: 0,
        borderCollapse: "collapse",
        overflowX: "auto",
        whiteSpace: "nowrap",
      };
    }
    // case "tbody":
    // case "thead": {
    // 	return {
    // 		width: "100%",
    // 	};
    // }
    case "tr": {
      return {
				border: "1px solid #bbb",
        backgroundColor: "#fff",
        margin: 0,
        padding: 0,
      };
    }
    case "td": {
      return {
				border: "1px solid #bbb",
        textAlign: "left",
        margin: 0,
        padding: "6px 13px",
      };
    }
    case "th": {
      return {
				border: "1px solid #bbb",
        fontWeight: 700,
        textAlign: "left",
        margin: 0,
        padding: "6px 13px",
      };
    }
    case "ul": {
      return {
        listStyleType: "disc",
        marginBottom: "1.25em",
        paddingLeft: "1.625em",
      };
    }
    case "ol": {
      return {
        listStyleType: "number",
        marginBottom: "1.25em",
        paddingLeft: "1.625em",
      };
    }
    case "li": {
      return {
        margin: "0.5rem 0",
      };
    }
    case "img": {
      return {
        width: "100%",
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
  return (
    <Component {...props} style={{ ...getStyle(Component), ...props.style }} />
  );
}

export default MDXComponent;

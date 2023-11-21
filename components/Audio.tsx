import React from "react";

const Audio = (props: any) => {
	return (
		<audio controls>
			<source src={props.src} />
		</audio>
	);
};

export default Audio;

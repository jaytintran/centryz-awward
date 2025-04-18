import React from "react";

const Button = ({ title, id, rightIcon, leftIcon, containerClass }) => {
	return (
		<button
			id={id}
			className={`rounded-full relative z-10 w-fit cursor-pointer overflow-hidden bg-violet-50 px-6 py-3 text-black-default ${containerClass}`}
		>
			{leftIcon && leftIcon}
			<span className="inline-flex font-general text-xs uppercase relative">
				{title}
				{rightIcon && rightIcon}
			</span>
		</button>
	);
};

export default Button;

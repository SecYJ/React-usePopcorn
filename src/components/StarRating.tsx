import { useState } from "react";

interface Props {
	maxRating?: number;
	color?: string;
	size?: number;
	className?: string;
	messages?: string[];
	defaultRating?: number;
	onSetRating: () => void;
}

const containerStyle = {
	display: "flex",
	alignItems: "center",
	gap: "1rem",
};

const starContainerStyle = {
	display: "flex",
};

const textStyle = {
	lineHeight: "1",
	margin: "0",
};

const StarRating = ({
	maxRating = 5,
	color = "#fcc419",
	size = 48,
	className = "",
	messages = [],
	defaultRating = 0,
	onSetRating,
}: Props) => {
	const [rating, setRating] = useState<number>(defaultRating);
	const [tempRating, setTempRating] = useState<number>(0);

	const onStarChange = (val: number) => {
		setRating(val);
	};

	const onTempStarChange = (val: number) => setTempRating(val);

	const onTempStarOut = () => {
		// setTempRating(0);
		setTempRating(rating ? rating : 0);
	};

	return (
		<div style={containerStyle} className={className}>
			<div style={starContainerStyle}>
				{Array.from({ length: maxRating }, (_, i) => (
					<Star
						tempRating={tempRating}
						value={i + 1}
						onHoverEnter={onTempStarChange}
						rating={rating}
						key={i}
						onStarChange={onStarChange}
						full={tempRating ? tempRating >= i + 1 : rating >= i + 1}
						onHoverOut={onTempStarOut}
					/>
				))}
			</div>
			<p style={textStyle}>{tempRating || ""}</p>
		</div>
	);
};

const spanStyle = {
	width: "48px",
	height: "48px",
};

interface StarProps {
	value: number;
	full: boolean;
	rating: number;
	tempRating: number;
	onStarChange: (value: number) => void;
	onHoverEnter: (value: number) => void;
	onHoverOut: () => void;
}

const Star = ({ value, onStarChange, full, onHoverEnter, onHoverOut }: StarProps) => {
	return (
		<span
			role="button"
			style={spanStyle}
			onClick={() => onStarChange(value)}
			onMouseOver={() => onHoverEnter(value)}
			onMouseOut={() => onHoverOut()}
		>
			{full ? (
				<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="#000" stroke="#000">
					<path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
				</svg>
			) : (
				<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="#000">
					<path
						strokeLinecap="round"
						strokeLinejoin="round"
						strokeWidth="{2}"
						d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z"
					/>
				</svg>
			)}
		</span>
	);
};

export default StarRating;

/*
FULL STAR

<svg
  xmlns="http://www.w3.org/2000/svg"
  viewBox="0 0 20 20"
  fill="#000"
  stroke="#000"
>
  <path
    d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"
  />
</svg>


EMPTY STAR

<svg
  xmlns="http://www.w3.org/2000/svg"
  fill="none"
  viewBox="0 0 24 24"
  stroke="#000"
>
  <path
    strokeLinecap="round"
    strokeLinejoin="round"
    strokeWidth="{2}"
    d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z"
  />
</svg>

*/

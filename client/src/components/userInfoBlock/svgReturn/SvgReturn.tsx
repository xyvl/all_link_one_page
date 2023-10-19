import styles from "./svgReturn.module.scss";

interface IProps{
	text: "login" | "email" | "name" | "surname",
	func: (type: "login" | "email" | "name" | "surname") => void
}

export const SvgReturn = ({text, func}: IProps) => {

	return (
		<svg
			className={styles.svg}
			onClick={() => func(text)}
			viewBox="0 0 48 48"
			xmlns="http://www.w3.org/2000/svg">
			<path
				d="M10,22v2c0,7.72,6.28,14,14,14s14-6.28,14-14s-6.28-14-14-14h-4V4l-8,8l8,8v-6h4c5.514,0,10,4.486,10,10s-4.486,10-10,10
		s-10-4.486-10-10v-2H10z"
			/>
		</svg>
	);
};

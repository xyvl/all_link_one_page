import React from "react";

export const PushMenuChangePassword = () => {
	return (
		<div>
			<form>
				<input hidden type="text" name="email" autoComplete="username" />
				<input type="password" autoComplete="current-password" />
				<input type="password" autoComplete="current-password" />
				<input type="password" autoComplete="new-password" />
				<input type="submit"/>
			</form>
		</div>
	);
};

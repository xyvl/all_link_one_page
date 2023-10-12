import { createSlice, PayloadAction } from "@reduxjs/toolkit"
import { IInitialState } from "./TypeAccount"

const initialState: IInitialState = {
	login: '',
	name: '',
	surname: '',
	email: '',
	password: ''
}

export const accountSlice = createSlice({
	name: 'accountSlice',
	initialState,
	reducers: {
		writeData(state, action: PayloadAction<IInitialState>){
			state.login = action.payload.login
			state.name = action.payload.name
			state.surname = action.payload.surname
			state.email = action.payload.email
			state.password = action.payload.password
		}
	}
})

export const accountRoot = accountSlice.reducer;
export const {writeData} = accountSlice.actions;
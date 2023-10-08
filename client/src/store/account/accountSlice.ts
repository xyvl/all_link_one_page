import { createSlice, PayloadAction } from "@reduxjs/toolkit"
import { IInitialState } from "./TypeAccount"

const initialState: IInitialState = {
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
			state = action.payload
		}
	}
})

export const accountRoot = accountSlice.reducer;
export const {writeData} = accountSlice.actions;
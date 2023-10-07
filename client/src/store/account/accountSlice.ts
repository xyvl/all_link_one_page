import { createSlice } from "@reduxjs/toolkit"
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
	reducers: {}
})

export const accountRoot = accountSlice.reducer;
import { combineReducers, configureStore } from "@reduxjs/toolkit"
import { accountRoot } from "./account/accountSlice"

const rootReducer = combineReducers({accountRoot})

export const store = configureStore({
	reducer: rootReducer
})
import { useSelector, useDispatch, TypedUseSelectorHook } from "react-redux";
import { rootDispatch, rootSelector } from "@/store/store";

export const useCustomDispatch = () => useDispatch<rootDispatch>()
export const useCustomSelector: TypedUseSelectorHook<rootSelector> =  useSelector
"use client";
import { store } from "@/store/store";
import { Provider } from "react-redux";
import { ConnectorData } from "../connectorData/ConnectorData";

export const Connector = ({ children }: { children: React.ReactNode }) => {
  return (
    <Provider store={store}>
      <ConnectorData>{children}</ConnectorData>
    </Provider>
  );
};

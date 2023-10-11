"use client";
import { store } from "@/store/store";
import { Provider } from "react-redux";
import { ConnectorData } from "../connectorData/ConnectorData";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'

const queryClient = new QueryClient()

export const Connector = ({ children }: { children: React.ReactNode }) => {
  return (
    <Provider store={store}>
      <QueryClientProvider client={queryClient}>
        <ConnectorData>{children}</ConnectorData>
        <ReactQueryDevtools initialIsOpen={false}/>
      </QueryClientProvider>
    </Provider>
  );
};

'use client'

import { environmentManager, QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactNode } from "react";

function makeQueryClient() {
    return new QueryClient({
        defaultOptions: {
            queries: {
                staleTime: 5 * 600 * 1000, // 5 minutes,
                retry: false
            }
        }
    })
}

let browserQueryClient: QueryClient | undefined = undefined

function getQueryClient() {
    if (environmentManager.isServer()) {
        return makeQueryClient()
    } else {
        if (!browserQueryClient) {
            browserQueryClient = makeQueryClient()
        }
        return browserQueryClient
    }
}

export const Providers = ({ children }: { children: ReactNode }) => {
    const queryClient = getQueryClient()

    return (
        <QueryClientProvider client={queryClient}>
            {children}
        </QueryClientProvider>
    )
}
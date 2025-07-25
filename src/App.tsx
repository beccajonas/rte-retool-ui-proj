import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { RichTextEditor } from "./RichTextEditor";
import { ChakraProvider } from '@chakra-ui/react'

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnMount: false,
      refetchOnWindowFocus: false,
      refetchOnReconnect: false,
      retry: 0,
    },
  },
});

export default function App() {
  return (
    <ChakraProvider>
    <QueryClientProvider client={queryClient}>
      <RichTextEditor />
    </QueryClientProvider>
    </ChakraProvider>
  );
}
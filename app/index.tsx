import { PexelsWallpapers } from "@/components/PexelsWallpapers";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const queryClient = new QueryClient();

export default function App() {
    return <QueryClientProvider client={queryClient}>
        <PexelsWallpapers />
    </QueryClientProvider>
}
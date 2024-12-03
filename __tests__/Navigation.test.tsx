import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { renderHook, waitFor, render, screen } from '@testing-library/react';
import { useCategories } from '@/app/data/getCategories';
import { getCategories } from '@/app/server/actions/getCategories';
import Navigation from '@/app/components/navigation/Navigation';

jest.mock('../app/server/actions/getCategories');

const queryClient = new QueryClient();

const wrapper = ({ children }: { children: React.ReactNode }) => (
  <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
);

const mockCatDetails = ["electronics", "jewelery", "men's clothing", "women's clothing"];

describe('useCatEventDetails', () => {

    beforeEach(() => {
        jest.clearAllMocks();
        queryClient.clear();
    });

    it('Should display loading before data is fetched', async () => {

        render(<QueryClientProvider client={queryClient}><Navigation/></QueryClientProvider>)

        expect(screen.getByText(/loading.../i));

    });

    it('Should fetch categories data successfully', async () => {

        (getCategories as jest.Mock).mockResolvedValue(mockCatDetails);

        render(<QueryClientProvider client={queryClient}><Navigation/></QueryClientProvider>)

        const { result } = renderHook(() => useCategories(), {
            wrapper,
        });

        await waitFor(() => expect(result.current.isLoading).toBe(false));
        await waitFor(() => expect(screen.getByRole('list')).toBeInTheDocument());
        expect(result.current.isError).toBe(false);
        expect(result.current.data).toEqual(mockCatDetails);

    });

    it('Should handle errors correctly', async () => {

        (getCategories as jest.Mock).mockRejectedValueOnce(
            new Error('Fetching error')
        );

        const { result } = renderHook(() => useCategories(), {
            wrapper,
        });

        expect(result.current.data).toBe(undefined);
        
    });
});
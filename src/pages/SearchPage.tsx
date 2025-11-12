import { useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { animeApi } from '@/services/animeApi';
import { SearchInput } from '@/components/SearchInput';
import { AnimeCard } from '@/components/AnimeCard';
import { PaginationControls } from '@/components/PaginationControls';
import { LoadingSpinner } from '@/components/LoadingSpinner';
import { ErrorMessage } from '@/components/ErrorMessage';

const SearchPage = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  const query = searchParams.get('query') || '';
  const currentPage = Number(searchParams.get('page')) || 1;

  const { data, isLoading, isError, error, isFetching } = useQuery({
    queryKey: ['anime-search', query, currentPage],
    queryFn: async () => {
      if (!query.trim()) return null;
      return animeApi.searchAnime(query, currentPage);
    },
    enabled: !!query.trim(),
    staleTime: 1000 * 60 * 5,
    keepPreviousData: true,
  });

  const searchResults = data?.data || [];
  const totalPages = data?.pagination?.last_visible_page || 1;
  const hasNextPage = data?.pagination?.has_next_page || false;

  const handleSearch = (newQuery: string) => {
    if (newQuery.trim() !== query.trim()) {
      setSearchParams({ query: newQuery, page: '1' });
    }
  };

  const handlePageChange = (page: number) => {
    setSearchParams({ query, page: String(page) });
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-gradient-hero">
      <header className="border-b bg-card/50 backdrop-blur-sm">
        <div className="container mx-auto px-4 py-6">
          <h1 className="mb-4 bg-gradient-primary bg-clip-text text-center text-4xl font-bold text-transparent md:text-5xl">
            Anime Search
          </h1>
          <div className="mx-auto max-w-2xl">
            <SearchInput onSearch={handleSearch} defaultValue={query} />
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        {isError && <ErrorMessage message={(error as Error).message} />}
        {isLoading && <LoadingSpinner message="Searching anime..." />}

        {!isLoading && !query && (
          <div className="py-12 text-center">
            <p className="text-lg text-muted-foreground">
              Start typing to search for anime
            </p>
          </div>
        )}

        {!isLoading && query && searchResults.length === 0 && (
          <div className="py-12 text-center">
            <p className="text-lg text-muted-foreground">
              No results found for "{query}"
            </p>
          </div>
        )}

        {!isLoading && searchResults.length > 0 && (
          <>
            <div className="mb-8">
              <p className="text-sm text-muted-foreground">
                Found results for "{query}"
              </p>
            </div>

            <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
              {searchResults.map((anime: any, idx: number) => (
                <AnimeCard key={`${anime.mal_id}-${idx}`} anime={anime} />
              ))}
            </div>

            {totalPages > 1 && (
              <div className="mt-12">
                <PaginationControls
                  currentPage={currentPage}
                  totalPages={totalPages}
                  hasNextPage={hasNextPage}
                  onPageChange={handlePageChange}
                  disabled={isFetching}
                />
              </div>
            )}
          </>
        )}
      </main>
    </div>
  );
};

export default SearchPage;

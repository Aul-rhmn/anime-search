import { useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { fetchAnimeById } from '@/store/animeSlice';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { LoadingSpinner } from '@/components/LoadingSpinner';
import { ErrorMessage } from '@/components/ErrorMessage';
import { ArrowLeft, Star, Calendar, Tv, Clock, Users } from 'lucide-react';

const DetailPage = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { selectedAnime, loading, error } = useAppSelector((state) => state.anime);

  useEffect(() => {
    if (id) {
      dispatch(fetchAnimeById(Number(id)));
    }
  }, [id, dispatch]);

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-hero">
        <LoadingSpinner message="Loading anime details..." />
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-hero p-4">
        <div className="container mx-auto pt-8">
          <Button onClick={() => navigate(-1)} variant="outline" className="mb-4">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Search
          </Button>
          <ErrorMessage message={error} />
        </div>
      </div>
    );
  }

  if (!selectedAnime) {
    return null;
  }

  return (
    <div className="min-h-screen bg-gradient-hero">
      <div className="relative">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent to-background pointer-events-none" />
        <div className="container mx-auto px-4 py-8">
          <Button onClick={() => navigate(-1)} variant="outline" className="mb-4">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Search
          </Button>
        </div>
      </div>

      <div className="container mx-auto px-4 pb-12">
        <div className="grid gap-8 md:grid-cols-[300px,1fr] lg:grid-cols-[350px,1fr]">
          <div className="mx-auto w-full max-w-sm">
            <div className="overflow-hidden rounded-xl shadow-hover">
              <img
                src={selectedAnime.images.webp.large_image_url || selectedAnime.images.jpg.large_image_url}
                alt={selectedAnime.title}
                className="w-full"
              />
            </div>
          </div>

          <div className="space-y-6">
            <div>
              <h1 className="mb-2 text-3xl font-bold md:text-4xl">{selectedAnime.title}</h1>
              {selectedAnime.title_english && selectedAnime.title_english !== selectedAnime.title && (
                <p className="text-lg text-muted-foreground">{selectedAnime.title_english}</p>
              )}
              {selectedAnime.title_japanese && (
                <p className="text-sm text-muted-foreground">{selectedAnime.title_japanese}</p>
              )}
            </div>

            <div className="flex flex-wrap items-center gap-4">
              {selectedAnime.score && (
                <div className="flex items-center gap-2 rounded-full bg-primary px-4 py-2 text-primary-foreground">
                  <Star className="h-5 w-5 fill-current" />
                  <span className="text-lg font-bold">{selectedAnime.score.toFixed(1)}</span>
                </div>
              )}
              {selectedAnime.rank && (
                <Badge variant="secondary" className="px-3 py-1 text-sm">
                  Rank #{selectedAnime.rank}
                </Badge>
              )}
              {selectedAnime.popularity && (
                <Badge variant="outline" className="px-3 py-1 text-sm">
                  Popularity #{selectedAnime.popularity}
                </Badge>
              )}
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              {selectedAnime.type && (
                <div className="flex items-center gap-2">
                  <Tv className="h-5 w-5 text-muted-foreground" />
                  <div>
                    <p className="text-xs text-muted-foreground">Type</p>
                    <p className="font-semibold">{selectedAnime.type}</p>
                  </div>
                </div>
              )}
              {selectedAnime.episodes && (
                <div className="flex items-center gap-2">
                  <Clock className="h-5 w-5 text-muted-foreground" />
                  <div>
                    <p className="text-xs text-muted-foreground">Episodes</p>
                    <p className="font-semibold">{selectedAnime.episodes}</p>
                  </div>
                </div>
              )}
              {selectedAnime.aired?.from && (
                <div className="flex items-center gap-2">
                  <Calendar className="h-5 w-5 text-muted-foreground" />
                  <div>
                    <p className="text-xs text-muted-foreground">Aired</p>
                    <p className="font-semibold">{selectedAnime.aired.string}</p>
                  </div>
                </div>
              )}
              {selectedAnime.members && (
                <div className="flex items-center gap-2">
                  <Users className="h-5 w-5 text-muted-foreground" />
                  <div>
                    <p className="text-xs text-muted-foreground">Members</p>
                    <p className="font-semibold">{selectedAnime.members.toLocaleString()}</p>
                  </div>
                </div>
              )}
            </div>

            {selectedAnime.genres && selectedAnime.genres.length > 0 && (
              <div>
                <h3 className="mb-2 text-sm font-semibold text-muted-foreground">Genres</h3>
                <div className="flex flex-wrap gap-2">
                  {selectedAnime.genres.map((genre) => (
                    <Badge key={genre.mal_id} variant="secondary">
                      {genre.name}
                    </Badge>
                  ))}
                </div>
              </div>
            )}

            {selectedAnime.synopsis && (
              <div>
                <h3 className="mb-2 text-lg font-bold">Synopsis</h3>
                <p className="leading-relaxed text-muted-foreground">{selectedAnime.synopsis}</p>
              </div>
            )}

            {selectedAnime.studios && selectedAnime.studios.length > 0 && (
              <div>
                <h3 className="mb-2 text-sm font-semibold text-muted-foreground">Studios</h3>
                <div className="flex flex-wrap gap-2">
                  {selectedAnime.studios.map((studio) => (
                    <Badge key={studio.mal_id} variant="outline">
                      {studio.name}
                    </Badge>
                  ))}
                </div>
              </div>
            )}

            {selectedAnime.trailer?.embed_url && (
              <div>
                <h3 className="mb-4 text-lg font-bold">Trailer</h3>
                <div className="aspect-video overflow-hidden rounded-lg">
                  <iframe
                    src={selectedAnime.trailer.embed_url}
                    title="Anime Trailer"
                    className="h-full w-full"
                    allowFullScreen
                  />
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default DetailPage;

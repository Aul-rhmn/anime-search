import { Anime } from '@/types/anime';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { useNavigate } from 'react-router-dom';
import { Star } from 'lucide-react';

interface AnimeCardProps {
  anime: Anime;
}

export const AnimeCard = ({ anime }: AnimeCardProps) => {
  const navigate = useNavigate();

  return (
    <Card
      className="group cursor-pointer overflow-hidden transition-all duration-300 hover:shadow-hover"
      onClick={() => navigate(`/anime/${anime.mal_id}`)}
    >
      <div className="relative aspect-[3/4] overflow-hidden bg-muted">
        <img
          src={anime.images.webp.large_image_url || anime.images.jpg.large_image_url}
          alt={anime.title}
          className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-110"
          loading="lazy"
        />
        {anime.score && (
          <div className="absolute right-2 top-2 flex items-center gap-1 rounded-full bg-primary/90 px-2 py-1 text-xs font-semibold text-primary-foreground backdrop-blur-sm">
            <Star className="h-3 w-3 fill-current" />
            {anime.score.toFixed(1)}
          </div>
        )}
      </div>
      <div className="p-4">
        <h3 className="mb-2 line-clamp-2 min-h-[3rem] text-base font-bold">{anime.title}</h3>
        <div className="flex flex-wrap gap-2">
          {anime.type && (
            <Badge variant="secondary" className="text-xs">
              {anime.type}
            </Badge>
          )}
          {anime.episodes && (
            <Badge variant="outline" className="text-xs">
              {anime.episodes} eps
            </Badge>
          )}
        </div>
      </div>
    </Card>
  );
};

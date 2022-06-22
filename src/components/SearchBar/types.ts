import type { SerialisedIndexData } from 'elasticlunr';
import type { SearchResult } from '../../types';

export interface SearchProps {
  localSearchLearnPages: {
    index: SerialisedIndexData<SearchResult>;
  };
}

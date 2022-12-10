import { useMemo, useCallback } from 'react';
import { graphql, useStaticQuery } from 'gatsby';
import { Index, SerialisedIndexData } from 'elasticlunr';
import { compareTwoStrings } from 'string-similarity';
import { replaceDataTagFromString } from '../util/replaceDataTag';
import createSlug from '../../util-node/createSlug';
import { SearchResult } from '../types';

export const useSearchResults = () => {
  const { siteSearchIndex } = useStaticQuery(graphql`
    query localSearchLearnPages {
      siteSearchIndex {
        index
      }
    }
  `);

  const resultData = siteSearchIndex.index as SerialisedIndexData<SearchResult>;

  const storeIndex = useMemo(
    () => Index.load<SearchResult>(resultData),
    [resultData]
  );

  const searchResults = useCallback(
    (currentQuery: string) => {
      const currentResults = storeIndex
        .search(currentQuery, { expand: true })
        .map(({ ref }) => storeIndex.documentStore.getDoc(ref) as SearchResult);

      const mapResult = (result: SearchResult) => {
        if (result.tableOfContents) {
          const tableArray = result.tableOfContents.split('\n');

          const uniqueItems = new Set(
            tableArray
              .map(replaceDataTagFromString)
              .filter(item => compareTwoStrings(currentQuery, item) > 0.3)
          );

          return [...uniqueItems].map(item => ({
            title: result.title,
            displayTitle: item.replace(/(`|\(.*\))/g, ''),
            id: `${result.id}-${createSlug(item)}`,
            slug: `${result.slug}#${createSlug(item)}`,
            category: result.category,
            wrapInCode: item.startsWith('`'),
          }));
        }

        return result;
      };

      return currentResults.slice(0, 20).map(mapResult).flat().slice(0, 20);
    },
    [storeIndex]
  );
  return searchResults;
};

"use client"

import { createContext, useState, useContext, ReactNode } from 'react';
import type { TProduct } from '../product/[id]/page';

interface SearchContextType {
  searchResults: TProduct[];
  setSearchResults: (results: TProduct[]) => void;
}

const SearchContext = createContext<SearchContextType | undefined>(undefined);

export const SearchProvider = ({ children }: { children: ReactNode }) => {
  const [searchResults, setSearchResults] = useState<TProduct[]>([]);

  return (
    <SearchContext.Provider value={{ searchResults, setSearchResults }}>
      {children}
    </SearchContext.Provider>
  );
};

export const useSearch = () => {
  const context = useContext(SearchContext);
  if (!context) throw new Error('useSearch must be used within SearchProvider');
  return context;
};

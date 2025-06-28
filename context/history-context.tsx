'use client';

import { createContext, useContext, useState } from 'react';
import type { HistoryItem_ } from '@/logic/history';

interface AppContextType {
  items: HistoryItem_[] | null;
  setItems: React.Dispatch<React.SetStateAction<HistoryItem_[] | null>>;
}

const AppContext = createContext<AppContextType>({
  items: null,
  setItems: () => {},
});

export function AppProvider({ children }: { children: React.ReactNode }) {
  const [state, setState] = useState<HistoryItem_[] | null>(null);

  return (
    <AppContext.Provider value={{ items: state, setItems: setState }}>
      {children}
    </AppContext.Provider>
  );
}

export function useAppContext() {
  return useContext(AppContext);
}
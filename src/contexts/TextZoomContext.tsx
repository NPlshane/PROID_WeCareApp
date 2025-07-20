import React, { createContext, useContext, useState, ReactNode } from 'react';

interface TextZoomContextType {
  textZoom: number;
  setTextZoom: (zoom: number) => void;
  adjustTextSize: (increment: boolean) => void;
}

const TextZoomContext = createContext<TextZoomContextType | undefined>(undefined);

export const useTextZoom = () => {
  const context = useContext(TextZoomContext);
  if (context === undefined) {
    throw new Error('useTextZoom must be used within a TextZoomProvider');
  }
  return context;
};

interface TextZoomProviderProps {
  children: ReactNode;
}

export const TextZoomProvider: React.FC<TextZoomProviderProps> = ({ children }) => {
  const [textZoom, setTextZoom] = useState(3);

  const adjustTextSize = (increment: boolean) => {
    setTextZoom((prev) => {
      const newZoom = increment ? Math.min(prev + 1, 5) : Math.max(prev - 1, 1);
      return newZoom;
    });
  };

  return (
    <TextZoomContext.Provider value={{ textZoom, setTextZoom, adjustTextSize }}>
      {children}
    </TextZoomContext.Provider>
  );
};
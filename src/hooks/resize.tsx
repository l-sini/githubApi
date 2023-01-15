import { createContext, useContext, useCallback, ReactNode } from 'react';
import { useResizeDetector } from 'react-resize-detector';

interface Props {
  children: JSX.Element | ReactNode;
}

const ResizeContext = createContext<any>(null);

export const useResize = () => useContext(ResizeContext);

export const Resize: React.FC<Props> = ({ children }) => {
  const { width, height, ref } = useResizeDetector();
  const isMobile = useCallback(() => width && width < 1200, [width]);
  return (
    <ResizeContext.Provider value={{ ref, isMobile }}>
      {children}
    </ResizeContext.Provider>
  );
};

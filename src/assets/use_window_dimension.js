import { useContext } from 'react';
import { WindowSizeContext } from '../context/window_size_context';

export default function useWindowDimensions() {
  const { width, height } = useContext(WindowSizeContext);
  return { width, height };
};
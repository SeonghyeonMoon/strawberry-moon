import { useCallback, useEffect, useState } from 'react';

type UseSwipeProps = {
  handleSwipeRight: () => void;
  handleSwipeLeft: () => void;
};

const UseSwipe = ({ handleSwipeRight, handleSwipeLeft }: UseSwipeProps) => {
  const [touchStart, setTouchStart] = useState({ x: 0, y: 0 });

  const handleTouchStart = (e: TouchEvent) => {
    const { clientX, clientY } = e.touches[0];
    setTouchStart({ x: clientX, y: clientY });
  };

  const handleTouchEnd = useCallback(
    (e: TouchEvent) => {
      const { clientX, clientY } = e.changedTouches[0];
      const touchOffsetX = clientX - touchStart.x;
      const touchOffsetY = clientY - touchStart.y;

      if (Math.abs(touchOffsetX) >= 80 && Math.abs(touchOffsetY) <= 100) {
        if (touchOffsetX < 0) handleSwipeLeft();
        else handleSwipeRight();
      }
    },
    [handleSwipeLeft, handleSwipeRight, touchStart],
  );

  useEffect(() => {
    document.addEventListener('touchstart', handleTouchStart);
    document.addEventListener('touchend', handleTouchEnd);
    return () => {
      document.removeEventListener('touchstart', handleTouchStart);
      document.removeEventListener('touchend', handleTouchEnd);
    };
  }, [handleTouchEnd]);
};

export default UseSwipe;

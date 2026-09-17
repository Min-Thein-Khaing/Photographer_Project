import { useEffect, useRef, useState } from 'react';

export function CustomCursor() {
  const cursorRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    // Disable custom cursor on touch devices
    if (window.matchMedia('(pointer: coarse)').matches) {
      return;
    }

    const move = (e: MouseEvent) => {
      setIsVisible(true);
      if (cursorRef.current) {
        const size = isHovered ? 60 : 36;
        cursorRef.current.style.transform = `translate3d(${e.clientX - size / 2}px, ${e.clientY - size / 2}px, 0)`;
      }
    };

    const handleMouseLeave = () => setIsVisible(false);
    const handleMouseEnter = () => setIsVisible(true);

    const handleHoverCheck = (e: MouseEvent) => {
      const target = e.target as HTMLElement | null;
      if (!target) return;
      
      const isInteractive = target.closest('a, button, [role="button"], input, select, textarea, .cursor-pointer');
      setIsHovered(!!isInteractive);
    };

    window.addEventListener('mousemove', move);
    window.addEventListener('mouseover', handleHoverCheck);
    document.addEventListener('mouseleave', handleMouseLeave);
    document.addEventListener('mouseenter', handleMouseEnter);

    return () => {
      window.removeEventListener('mousemove', move);
      window.removeEventListener('mouseover', handleHoverCheck);
      document.removeEventListener('mouseleave', handleMouseLeave);
      document.removeEventListener('mouseenter', handleMouseEnter);
    };
  }, [isHovered]);

  if (!isVisible) return null;

  return (
    <div
      ref={cursorRef}
      className={`fixed top-0 left-0 rounded-full pointer-events-none z-[9999] transition-all duration-150 ease-out border border-white ${
        isHovered ? 'w-16 h-16 opacity-90 scale-110' : 'w-9 h-9 opacity-80'
      }`}
      style={{
        mixBlendMode: 'difference',
        backgroundColor: '#ffffff',
      }}
      aria-hidden="true"
    />
  );
}

import { useEffect, useMemo, useRef, useState } from 'react';
import {
  FaArrowDown,
  FaArrowLeft,
  FaArrowRight,
  FaArrowUp,
} from 'react-icons/fa6';

export default function DPad({
  screenRef,
  step = 32,
  intervalMs = 60,
  centerContent = null,
  onCenter = null,
  centerAriaLabel = 'Center',
  onLeft = null,
  onRight = null,
}) {
  const intervalRef = useRef(null);
  const [active, setActive] = useState(null);

  const sizeStyle = useMemo(
    () => ({
      width: 'clamp(150px, 26vw, 190px)',
      height: 'clamp(150px, 26vw, 190px)',
    }),
    [],
  );

  const getScrollEl = () => {
    if (screenRef?.current) return screenRef.current;
    return document.querySelector('.pokedex-screen');
  };

  const scrollBy = (deltaY) => {
    const el = getScrollEl();
    if (!el) return;
    el.scrollBy({ top: deltaY, left: 0, behavior: 'auto' });
  };

  const stop = () => {
    setActive(null);
    if (intervalRef.current) {
      window.clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
  };

  const start = (dir) => {
    stop();
    setActive(dir);

    // Single step for a quick tap
    if (dir === 'up') scrollBy(-step);
    if (dir === 'down') scrollBy(step);

    // Left/right navigation
    if (dir === 'left' && onLeft) onLeft();
    if (dir === 'right' && onRight) onRight();

    // Hold-to-scroll
    if (dir === 'up' || dir === 'down') {
      intervalRef.current = window.setInterval(() => {
        scrollBy(dir === 'up' ? -step : step);
      }, intervalMs);
    }
  };

  useEffect(() => stop, []);

  const buttonBase = {
    border: '2px solid',
    borderColor: '#444 #1a1a1a #111 #333',
    background: 'linear-gradient(145deg, #353535, #1f1f1f)',
    color: 'white',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    height: '100%',
    padding: 0,
    lineHeight: 1,
    boxShadow:
      '0 4px 8px rgba(0,0,0,0.4), inset 0 1px 0 rgba(255,255,255,0.15), inset 0 -1px 2px rgba(0,0,0,0.3)',
    transition: 'transform 0.06s ease, filter 0.12s ease, box-shadow 0.12s ease',
    userSelect: 'none',
    touchAction: 'none',
  };

  const activeStyle = {
    transform: 'translateY(2px)',
    filter: 'brightness(1.1)',
    boxShadow:
      'inset 0 3px 8px rgba(0,0,0,0.6), 0 1px 2px rgba(0,0,0,0.3)',
    borderColor: '#333 #333 #444 #333',
  };

  const mkHandlers = (dir) => ({
    onPointerDown: (e) => {
      e.preventDefault();
      start(dir);
    },
    onPointerUp: stop,
    onPointerLeave: stop,
    onPointerCancel: stop,
  });

  const centerHandlers = {
    onPointerDown: (e) => {
      if (!onCenter) return;
      e.preventDefault();
      setActive('center');
      onCenter();
    },
    onPointerUp: () => setActive(null),
    onPointerLeave: () => setActive(null),
    onPointerCancel: () => setActive(null),
  };

  const crossMask = "url(\"data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'><path fill='white' d='M 30 10 Q 30 0 40 0 H 60 Q 70 0 70 10 V 30 H 90 Q 100 30 100 40 V 60 Q 100 70 90 70 H 70 V 90 Q 70 100 60 100 H 40 Q 30 100 30 90 V 70 H 10 Q 0 70 0 60 V 40 Q 0 30 10 30 H 30 Z'/></svg>\")"

  return (
    <div
      aria-label="D-pad"
      role="group"
      style={{
        ...sizeStyle,
        boxSizing: 'border-box',
        display: 'grid',
        gridTemplateColumns: '1fr 1fr 1fr',
        gridTemplateRows: '1fr 1fr 1fr',
        gap: '4px',
        padding: '8px',
        background: 'linear-gradient(145deg, #3a3a3a, #1a1a1a)',
        boxShadow: '0 6px 16px rgba(0,0,0,0.5)',
        maskImage: crossMask,
        WebkitMaskImage: crossMask,
        maskSize: '100% 100%',
        WebkitMaskSize: '100% 100%',
        fontSize: 'clamp(14px, 2.2vw, 20px)',
        userSelect: 'none',
        WebkitUserSelect: 'none',
        WebkitTouchCallout: 'none',
      }}
    >
      <div />
      <button
        type="button"
        aria-label="Scroll up"
        style={{
          ...buttonBase,
          borderRadius: '12px 12px 6px 6px',
          ...(active === 'up' ? activeStyle : null),
        }}
        {...mkHandlers('up')}
      >
        <FaArrowUp />
      </button>
      <div />

      <button
        type="button"
        aria-label="Left"
        style={{
          ...buttonBase,
          borderRadius: '12px 6px 6px 12px',
          ...(active === 'left' ? activeStyle : null),
        }}
        {...mkHandlers('left')}
      >
        <FaArrowLeft />
      </button>

      {onCenter ? (
        <button
          type="button"
          aria-label={centerAriaLabel}
          style={{
            ...buttonBase,
            borderRadius: '10px',
            background:
              'linear-gradient(145deg, rgba(70,70,70,0.85), rgba(20,20,20,0.95))',
            ...(active === 'center' ? activeStyle : null),
          }}
          {...centerHandlers}
        >
          {centerContent}
        </button>
      ) : (
        <div aria-hidden="true" />
      )}

      <button
        type="button"
        aria-label="Right"
        style={{
          ...buttonBase,
          borderRadius: '6px 12px 12px 6px',
          ...(active === 'right' ? activeStyle : null),
        }}
        {...mkHandlers('right')}
      >
        <FaArrowRight />
      </button>

      <div />
      <button
        type="button"
        aria-label="Scroll down"
        style={{
          ...buttonBase,
          borderRadius: '6px 6px 12px 12px',
          ...(active === 'down' ? activeStyle : null),
        }}
        {...mkHandlers('down')}
      >
        <FaArrowDown />
      </button>
      <div />
    </div>
  );
}

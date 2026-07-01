import { useEffect, useMemo, useRef, useState } from 'react';

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
    borderColor: '#686868 #202020 #0a0a0a #353535',
    background:
      'radial-gradient(140% 90% at 50% 0%, rgba(255,255,255,0.18) 0%, rgba(255,255,255,0.06) 28%, transparent 52%), linear-gradient(180deg, #4a4a4a 0%, #353535 18%, #272727 56%, #161616 100%), radial-gradient(120% 120% at 50% 100%, rgba(0,0,0,0.24) 0%, transparent 58%)',
    color: 'white',
    position: 'absolute',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 0,
    lineHeight: 1,
    boxShadow:
      '0 8px 14px rgba(0,0,0,0.34), 0 2px 0 rgba(0,0,0,0.3), inset 0 1px 0 rgba(255,255,255,0.24), inset 0 3px 4px rgba(255,255,255,0.06), inset 0 -4px 7px rgba(0,0,0,0.44)',
    transition: 'transform 0.06s ease, filter 0.12s ease, box-shadow 0.12s ease',
    userSelect: 'none',
    touchAction: 'none',
    overflow: 'visible',
    outline: 'none',
  };

  const activeStyle = {
    filter: 'brightness(0.96)',
    boxShadow:
      '0 2px 4px rgba(0,0,0,0.24), inset 0 4px 10px rgba(0,0,0,0.64), inset 0 1px 0 rgba(255,255,255,0.08)',
    borderColor: '#353535 #2a2a2a #464646 #2f2f2f',
  };

  const pressedTransforms = {
    up: 'translateY(2px)',
    down: 'translateY(-2px)',
    left: 'translateX(2px)',
    right: 'translateX(-2px)',
    center: 'translateY(1px)',
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

  const crossPath = 'M 30 10 Q 30 0 40 0 H 60 Q 70 0 70 10 V 30 H 90 Q 100 30 100 40 V 60 Q 100 70 90 70 H 70 V 90 Q 70 100 60 100 H 40 Q 30 100 30 90 V 70 H 10 Q 0 70 0 60 V 40 Q 0 30 10 30 H 30 Z';
  const crossMaskUrl = `url("data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'><path fill='white' d='${crossPath}'/></svg>")`;
  const armLayout = {
    up: {
      left: '30%',
      top: '4%',
      width: '40%',
      height: '49%',
      clipPath: 'url(#dpad-up)',
    },
    down: {
      left: '30%',
      top: '47%',
      width: '40%',
      height: '49%',
      clipPath: 'url(#dpad-down)',
    },
    left: {
      left: '4%',
      top: '30%',
      width: '49%',
      height: '40%',
      clipPath: 'url(#dpad-left)',
    },
    right: {
      left: '47%',
      top: '30%',
      width: '49%',
      height: '40%',
      clipPath: 'url(#dpad-right)',
    },
  };

  const getDirectionalStyle = (dir) => ({
    ...buttonBase,
    ...armLayout[dir],
    zIndex: 2,
    ...(active === dir
      ? {
          ...activeStyle,
          transform: pressedTransforms[dir],
        }
      : null),
  });

  return (
    <div
      aria-label="D-pad"
      role="group"
      style={{
        ...sizeStyle,
        position: 'relative',
        overflow: 'visible',
        fontSize: 'clamp(14px, 2.2vw, 20px)',
        userSelect: 'none',
        WebkitUserSelect: 'none',
        WebkitTouchCallout: 'none',
      }}
    >
      {/* Hidden SVG clip-path defs for the four D-pad arms. */}
      <svg width="0" height="0" style={{ position: 'absolute', overflow: 'hidden' }}>
        <defs>
          <clipPath id="dpad-up" clipPathUnits="objectBoundingBox">
            <path d="M 0.18 0.08 Q 0.18 0 0.30 0 L 0.70 0 Q 0.82 0 0.82 0.08 L 0.82 0.66 L 0.60 0.84 Q 0.50 0.96 0.40 0.84 L 0.18 0.66 Z" />
          </clipPath>
          <clipPath id="dpad-down" clipPathUnits="objectBoundingBox">
            <path d="M 0.40 0.16 Q 0.50 0.04 0.60 0.16 L 0.82 0.34 L 0.82 0.92 Q 0.82 1 0.70 1 L 0.30 1 Q 0.18 1 0.18 0.92 L 0.18 0.34 Z" />
          </clipPath>
          <clipPath id="dpad-left" clipPathUnits="objectBoundingBox">
            <path d="M 0.08 0.18 Q 0 0.18 0 0.30 L 0 0.70 Q 0 0.82 0.08 0.82 L 0.66 0.82 L 0.84 0.60 Q 0.96 0.50 0.84 0.40 L 0.66 0.18 Z" />
          </clipPath>
          <clipPath id="dpad-right" clipPathUnits="objectBoundingBox">
            <path d="M 0.34 0.18 L 0.92 0.18 Q 1 0.18 1 0.30 L 1 0.70 Q 1 0.82 0.92 0.82 L 0.34 0.82 L 0.16 0.60 Q 0.04 0.50 0.16 0.40 Z" />
          </clipPath>
        </defs>
      </svg>

      <div
        style={{
          position: 'absolute',
          inset: 0,
          background:
            'radial-gradient(120% 85% at 50% 2%, rgba(255,255,255,0.14) 0%, rgba(255,255,255,0.03) 28%, transparent 52%), linear-gradient(145deg, #454545 0%, #262626 42%, #161616 100%), radial-gradient(120% 120% at 50% 100%, rgba(0,0,0,0.32) 0%, transparent 60%)',
          boxShadow:
            '0 10px 22px rgba(0,0,0,0.4), 0 3px 0 rgba(0,0,0,0.28), inset 0 1px 0 rgba(255,255,255,0.14), inset 0 5px 10px rgba(255,255,255,0.02), inset 0 -6px 10px rgba(0,0,0,0.42)',
          maskImage: crossMaskUrl,
          WebkitMaskImage: crossMaskUrl,
          maskSize: '100% 100%',
          WebkitMaskSize: '100% 100%',
          maskRepeat: 'no-repeat',
          WebkitMaskRepeat: 'no-repeat',
        }}
        aria-hidden="true"
      />

      <button
        type="button"
        aria-label="Scroll up"
        style={getDirectionalStyle('up')}
        {...mkHandlers('up')}
      />

      <button
        type="button"
        aria-label="Left"
        style={getDirectionalStyle('left')}
        {...mkHandlers('left')}
      />

      <button
        type="button"
        aria-label="Right"
        style={getDirectionalStyle('right')}
        {...mkHandlers('right')}
      />

      <button
        type="button"
        aria-label="Scroll down"
        style={getDirectionalStyle('down')}
        {...mkHandlers('down')}
      />

      {onCenter ? (
        <button
          type="button"
          aria-label={centerAriaLabel}
          style={{
            ...buttonBase,
            left: '37%',
            top: '37%',
            width: '26%',
            height: '26%',
            borderRadius: '999px',
            borderColor: '#707070 #232323 #0b0b0b #393939',
            background:
              'radial-gradient(120% 90% at 50% 0%, rgba(255,255,255,0.26) 0%, rgba(255,255,255,0.05) 32%, transparent 52%), linear-gradient(180deg, rgba(88,88,88,0.96), rgba(28,28,28,0.98)), radial-gradient(120% 120% at 50% 100%, rgba(0,0,0,0.26) 0%, transparent 60%)',
            boxShadow:
              '0 7px 12px rgba(0,0,0,0.34), 0 2px 0 rgba(0,0,0,0.28), inset 0 1px 0 rgba(255,255,255,0.24), inset 0 -4px 7px rgba(0,0,0,0.44)',
            zIndex: 3,
            ...(active === 'center'
              ? {
                  ...activeStyle,
                  transform: pressedTransforms.center,
                }
              : null),
          }}
          {...centerHandlers}
        >
          {centerContent}
        </button>
      ) : null}

      <svg
        aria-hidden="true"
        style={{
          position: 'absolute',
          inset: 0,
          width: '100%',
          height: '100%',
          pointerEvents: 'none',
          overflow: 'visible',
        }}
        viewBox="0 0 100 100"
        preserveAspectRatio="none"
      >
        <path d={crossPath} fill="none" stroke="rgba(0,0,0,0.56)" strokeWidth="8" opacity="0.55" />
        <path d={crossPath} fill="none" stroke="rgba(0,0,0,0.78)" strokeWidth="4.8" />
        <path d={crossPath} fill="none" stroke="rgba(255,255,255,0.24)" strokeWidth="1.4" opacity="0.85" />
        <path d={crossPath} fill="none" stroke="rgba(255,255,255,0.08)" strokeWidth="3.2" opacity="0.7" />
      </svg>
    </div>
  );
}

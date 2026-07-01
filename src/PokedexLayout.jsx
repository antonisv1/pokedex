import { useEffect, useMemo, useRef, useState } from 'react';
import { Link, Outlet, useNavigate, useParams } from 'react-router-dom';
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa6';
import DPad from './DPad';
import SearchBar from './SearchBar';
import SmallLed from './SmallLed';
import { PageContext } from './PageContext';

function clampPageParamToNumber(p) {
  const n = Number.parseInt(`${p ?? ''}`, 10);
  return Number.isFinite(n) && n > 0 ? n : null;
}

export default function PokedexLayout() {
  const { p, id } = useParams();
  const navigate = useNavigate();

  const screenRef = useRef(null);
  const searchInputRef = useRef(null);
  const [page, setPage] = useState(1);
  const [isSpeakerActive, setIsSpeakerActive] = useState(false);

  const pageFromParam = useMemo(() => clampPageParamToNumber(p), [p]);
  const isInfo = Boolean(id);

  useEffect(() => {
    if (pageFromParam) setPage(pageFromParam);
  }, [pageFromParam]);

  useEffect(() => {
    if (!isInfo && p && pageFromParam === null) {
      navigate(`/1/${p}`, { replace: true });
    }
  }, [isInfo, navigate, p, pageFromParam]);

  const logoUrl = `${import.meta.env.BASE_URL}assets/pokedex-logo.png`;

  const canPaginate = !isInfo && pageFromParam !== null;
  const canBack = canPaginate && page > 1;

  const backButtonDisabled = !canBack;
  const nextButtonDisabled = !canPaginate;
  const speakerHoles = useMemo(() => Array.from({ length: 9 }, (_, index) => index), []);

  const navButtonClass = 'select-none flex items-center justify-center rounded-full border-[3px] border-t-neutral-500 border-l-neutral-500 border-r-black border-b-black bg-[radial-gradient(circle_at_32%_24%,rgba(255,255,255,0.18),rgba(255,255,255,0.04)_28%,transparent_29%),linear-gradient(180deg,#4d4d4d_0%,#242424_45%,#060606_100%)] text-neutral-50 shadow-[0_10px_18px_rgba(0,0,0,0.45),inset_0_1px_1px_rgba(255,255,255,0.16),inset_0_-5px_8px_rgba(0,0,0,0.45)] transition-all hover:-translate-y-0.5 hover:brightness-110 active:translate-y-1 active:shadow-[0_3px_6px_rgba(0,0,0,0.24),inset_0_3px_7px_rgba(0,0,0,0.58)] disabled:opacity-35 disabled:cursor-not-allowed disabled:hover:translate-y-0 disabled:hover:brightness-100';
  const navLabelClass = 'text-[0.58rem] sm:text-[0.68rem] uppercase tracking-[0.22em] text-red-950/75';
  const systemButtonClass = 'select-none h-4 w-14 sm:h-5 sm:w-16 rounded-full border-2 border-t-neutral-500 border-l-neutral-500 border-r-black border-b-black bg-[linear-gradient(180deg,#4b4b4b_0%,#1b1b1b_100%)] shadow-[0_4px_8px_rgba(0,0,0,0.36),inset_0_1px_0_rgba(255,255,255,0.12)] transition-all hover:brightness-110 active:translate-y-0.5 active:shadow-[0_2px_4px_rgba(0,0,0,0.22),inset_0_2px_4px_rgba(0,0,0,0.5)]';
  const systemLabelClass = 'text-[0.52rem] sm:text-[0.62rem] uppercase tracking-[0.24em] text-red-950/75';

  function focusSearch() {
    screenRef.current?.scrollTo({ top: 0, behavior: 'smooth' });
    searchInputRef.current?.focus();
    searchInputRef.current?.select?.();
  }

  return (
    <PageContext.Provider value={{ page, setPage }}>
      <div className="min-h-screen w-full flex items-center justify-center p-2 sm:p-6 font-retro">
        <div className="w-full max-w-[1200px] min-h-[90vh] max-h-[95vh] flex flex-col rounded-2xl bg-gradient-to-b from-red-400 via-red-500 to-red-700 shadow-[0_25px_50px_-12px_rgba(0,0,0,0.5),0_12px_24px_-8px_rgba(0,0,0,0.4),inset_0_2px_0_rgba(255,255,255,0.2),inset_0_-2px_0_rgba(0,0,0,0.2)] border-t-4 border-l-4 border-r-4 border-b-8 border-t-red-300/50 border-l-red-300/30 border-r-red-800/50 border-b-red-900 overflow-hidden">
          {/* Header */}
          <div className="px-4 sm:px-6 pt-3 sm:pt-4 pb-2 bg-gradient-to-b from-red-400 to-red-500 border-b-4 border-red-700/60 shadow-[inset_0_1px_0_rgba(255,255,255,0.15)]">
            <div className="flex items-center justify-between gap-4 flex-wrap">
            <Link to="/" className="flex items-center">
              <img
                alt="Pokedex"
                src={logoUrl}
                  className="h-14 sm:h-20 w-auto select-none drop-shadow-[0_6px_10px_rgba(0,0,0,0.35)] transition-transform hover:scale-[1.03]"
              />
            </Link>

            <div className="flex items-center gap-1 sm:gap-2">
              <SmallLed id="red-led" color="#dc2626" />
              <SmallLed id="yellow-led" color="#fbbf24" />
              <SmallLed id="green-led" color="#22c55e" />
            </div>
            </div>
          </div>

          {/* Screen area - gray like old monitors */}
          <div className="flex-1 flex flex-col m-3 sm:m-4 rounded-2xl border-4 border-neutral-800 bg-gradient-to-br from-neutral-700 via-neutral-800 to-neutral-900 p-2 sm:p-3 shadow-[inset_0_6px_20px_rgba(0,0,0,0.6),inset_0_-2px_6px_rgba(255,255,255,0.05),0_4px_8px_rgba(0,0,0,0.3)] min-h-0">
            <div
              ref={screenRef}
              className="pokedex-screen flex-1 overflow-y-auto rounded-xl bg-gradient-to-br from-neutral-50 via-neutral-100 to-neutral-200 shadow-[inset_0_2px_8px_rgba(0,0,0,0.1),inset_0_-1px_0_rgba(255,255,255,0.8)] min-h-0"
            >
              {/* Search bar at top of screen */}
              <div className="flex justify-center py-4 px-3 z-10 rounded-t-xl">
                <SearchBar inputRef={searchInputRef} />
              </div>
              {/* Content */}
              <div className="px-2 pb-2">
                <Outlet context={{ screenRef, setSpeakerActive: setIsSpeakerActive }} />
              </div>
            </div>
          </div>

          {/* Bottom controls */}
          <div className="bg-gradient-to-b from-red-400 via-red-500 to-red-600 px-4 sm:px-6 py-3 sm:py-4 border-t-2 border-red-300/40 shadow-[inset_0_2px_0_rgba(255,255,255,0.15)]">
            <div className="grid grid-cols-[auto_minmax(0,1fr)_auto] grid-rows-[auto_auto] items-end gap-x-3 gap-y-6 p-2 sm:gap-x-6 sm:gap-y-3 sm:p-3">
              <div className="col-start-1 row-start-1 self-start flex items-end justify-start sm:row-span-2 sm:self-end">
                  <DPad
                    screenRef={screenRef}
                    onLeft={() => {
                      if (isInfo) {
                        navigate(`/${pageFromParam ?? 1}`);
                      } else if (canBack) {
                        navigate(`/${page - 1}`);
                      }
                    }}
                    onRight={() => {
                      if (canPaginate) {
                        navigate(`/${page + 1}`);
                      }
                    }}
                  />
              </div>

              <div className="col-start-1 col-span-3 row-start-2 justify-self-center flex flex-col items-center justify-end
               gap-1 sm:col-start-2 sm:col-span-1 sm:gap-2 md:-translate-x-10">
                <div className="flex items-center gap-4 sm:gap-5">
                  <div className="flex flex-col items-center gap-1.5">
                    <button
                      type="button"
                      onClick={focusSearch}
                      className={systemButtonClass}
                      aria-label="Focus search"
                      title="Focus search"
                    />
                    <span className={systemLabelClass}>Select</span>
                  </div>

                  <div className="flex flex-col items-center gap-1.5">
                    <button
                      type="button"
                      onClick={() => navigate('/')}
                      className={systemButtonClass}
                      aria-label="Go home"
                      title="Go home"
                    />
                    <span className={systemLabelClass}>Start</span>
                  </div>
                </div>
              </div>

              <div className="col-start-2 col-span-2 row-start-1 justify-self-end -translate-y-8 flex items-end justify-end gap-4 sm:translate-y-0 sm:gap-6">
                <div className="flex items-end gap-3 sm:gap-4">
                  <div className="flex flex-col items-center gap-1.5 translate-y-3 sm:translate-y-4">
                    <button
                      type="button"
                      disabled={isInfo ? false : backButtonDisabled}
                      onClick={() => {
                        if (isInfo) {
                          navigate(`/${pageFromParam ?? 1}`);
                        } else if (!backButtonDisabled) {
                          navigate(`/${page - 1}`);
                        }
                      }}
                      className={`${navButtonClass} h-[60px] w-[60px] sm:h-[72px] sm:w-[72px] text-slate-400`}
                    >
                      B
                    </button>
                    <span className={navLabelClass}>Back</span>
                  </div>

                  <div className="flex flex-col items-center gap-1.5 -translate-y-1 sm:-translate-y-2">
                    <button
                      type="button"
                      disabled={isInfo || nextButtonDisabled}
                      onClick={() => {
                        if (!isInfo && !nextButtonDisabled) navigate(`/${page + 1}`);
                      }}
                      className={`${navButtonClass} h-[68px] w-[68px] sm:h-[84px] sm:w-[84px] text-slate-400`}
                    >
                      A
                    </button>
                    <span className={navLabelClass}>Next</span>
                  </div>
                </div>
              </div>

              <div className="col-start-3 row-start-2 justify-self-end relative flex items-end justify-end pb-1 pr-1">
                {isSpeakerActive ? (
                  <>
                    <div
                      className="absolute inset-[-6px] rounded-[20px] bg-emerald-300/12 blur-[4px]"
                      style={{ animation: 'speaker-grill-glow 420ms ease-in-out infinite' }}
                    />
                    <div
                      className="absolute left-[-14px] top-1/2 h-4 w-4 -translate-y-1/2 rounded-full border border-emerald-100/55"
                      style={{ animation: 'speaker-wave 620ms ease-out infinite' }}
                    />
                    <div
                      className="absolute left-[-23px] top-1/2 h-6 w-6 -translate-y-1/2 rounded-full border border-emerald-100/35"
                      style={{ animation: 'speaker-wave 620ms ease-out infinite 120ms' }}
                    />
                  </>
                ) : null}
                <div className="grid grid-cols-3 gap-x-1.5 gap-y-1 sm:gap-x-2 sm:gap-y-1.5">
                  {speakerHoles.map((hole) => (
                    <span
                      key={hole}
                      className={`h-2 w-1.5 rounded-full bg-neutral-950/70 shadow-[inset_0_1px_0_rgba(255,255,255,0.08)] sm:h-2.5 sm:w-2 ${isSpeakerActive ? 'bg-emerald-100/85 shadow-[0_0_8px_rgba(167,243,208,0.45),inset_0_1px_0_rgba(255,255,255,0.25)]' : ''}`}
                      style={isSpeakerActive ? { animation: 'speaker-grill-pulse 420ms ease-in-out infinite', animationDelay: `${(hole % 5) * 50 + Math.floor(hole / 5) * 28}ms` } : undefined}
                    />
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </PageContext.Provider>
  );
}

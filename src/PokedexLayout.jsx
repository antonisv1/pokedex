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
  const [page, setPage] = useState(1);

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
                <SearchBar />
              </div>
              {/* Content */}
              <div className="px-2 pb-2">
                <Outlet context={{ screenRef }} />
              </div>
            </div>
          </div>

          {/* Bottom controls */}
          <div className="bg-gradient-to-b from-red-400 via-red-500 to-red-600 px-4 sm:px-6 py-3 sm:py-4 border-t-2 border-red-300/40 shadow-[inset_0_2px_0_rgba(255,255,255,0.15)]">
            <div className="grid grid-cols-2 gap-3 sm:gap-4 p-2 sm:p-3">
              <div className="flex items-center justify-start">
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

              <div className="flex items-center justify-end gap-2 sm:gap-3 flex-wrap">
                {isInfo ? (
                  <button
                    type="button"
                    onClick={() => navigate(`/${pageFromParam ?? 1}`)}
                    className="select-none rounded-full border-4 border-t-neutral-200 border-l-neutral-200 border-r-neutral-400 border-b-neutral-500 bg-gradient-to-b from-white via-neutral-100 to-neutral-300 text-neutral-700 shadow-[0_8px_16px_rgba(0,0,0,0.35),0_4px_6px_rgba(0,0,0,0.2),inset_0_2px_0_rgba(255,255,255,1),inset_0_-3px_6px_rgba(0,0,0,0.08)] w-[60px] h-[60px] sm:w-[70px] sm:h-[70px] flex flex-col items-center justify-center gap-0.5 transition-all active:translate-y-1 active:shadow-[0_2px_4px_rgba(0,0,0,0.2),inset_0_4px_8px_rgba(0,0,0,0.15)] active:border-t-neutral-300 active:border-l-neutral-300 active:border-r-neutral-300 active:border-b-neutral-300 hover:-translate-y-0.5 hover:shadow-[0_10px_20px_rgba(0,0,0,0.4)]"
                  >
                    <FaChevronLeft className="text-lg" />
                    <span className="text-[10px] leading-none">Back</span>
                  </button>
                ) : (
                  <>
                    <button
                      type="button"
                      disabled={backButtonDisabled}
                      onClick={() => {
                        if (!backButtonDisabled) navigate(`/${page - 1}`);
                      }}
                      className="select-none rounded-full border-4 border-t-neutral-200 border-l-neutral-200 border-r-neutral-400 border-b-neutral-500 bg-gradient-to-b from-white via-neutral-100 to-neutral-300 text-neutral-700 shadow-[0_8px_16px_rgba(0,0,0,0.35),0_4px_6px_rgba(0,0,0,0.2),inset_0_2px_0_rgba(255,255,255,1),inset_0_-3px_6px_rgba(0,0,0,0.08)] w-[60px] h-[60px] sm:w-[70px] sm:h-[70px] flex flex-col items-center justify-center gap-0.5 transition-all active:translate-y-1 active:shadow-[0_2px_4px_rgba(0,0,0,0.2),inset_0_4px_8px_rgba(0,0,0,0.15)] active:border-neutral-300 hover:-translate-y-0.5 hover:shadow-[0_10px_20px_rgba(0,0,0,0.4)] disabled:opacity-40 disabled:cursor-not-allowed disabled:hover:translate-y-0 disabled:hover:shadow-[0_8px_16px_rgba(0,0,0,0.35)]"
                    >
                      <FaChevronLeft className="text-lg" />
                      <span className="text-[10px] leading-none">Back</span>
                    </button>

                    <button
                      type="button"
                      disabled={nextButtonDisabled}
                      onClick={() => {
                        if (!nextButtonDisabled) navigate(`/${page + 1}`);
                      }}
                      className="select-none rounded-full border-4 border-t-neutral-200 border-l-neutral-200 border-r-neutral-400 border-b-neutral-500 bg-gradient-to-b from-white via-neutral-100 to-neutral-300 text-neutral-700 shadow-[0_8px_16px_rgba(0,0,0,0.35),0_4px_6px_rgba(0,0,0,0.2),inset_0_2px_0_rgba(255,255,255,1),inset_0_-3px_6px_rgba(0,0,0,0.08)] w-[60px] h-[60px] sm:w-[70px] sm:h-[70px] flex flex-col items-center justify-center gap-0.5 transition-all active:translate-y-1 active:shadow-[0_2px_4px_rgba(0,0,0,0.2),inset_0_4px_8px_rgba(0,0,0,0.15)] active:border-neutral-300 hover:-translate-y-0.5 hover:shadow-[0_10px_20px_rgba(0,0,0,0.4)] disabled:opacity-40 disabled:cursor-not-allowed disabled:hover:translate-y-0 disabled:hover:shadow-[0_8px_16px_rgba(0,0,0,0.35)]"
                    >
                      <FaChevronRight className="text-lg" />
                      <span className="text-[10px] leading-none">Next</span>
                    </button>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </PageContext.Provider>
  );
}

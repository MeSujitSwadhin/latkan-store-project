/**
 * First-visit introduction — pure CSS, so it never waits on JS, fonts or
 * images. It is pointer-transparent (never blocks interaction), lasts ~1.9s,
 * plays once per browser session and is skipped entirely for reduced motion
 * (both decided by the inline boot script in the root layout).
 */
export function Preloader() {
  return (
    <div className="preloader" aria-hidden="true">
      <div className="preloader-inner">
        <p className="preloader-mark display">
          The <em>Latkan</em> Store
        </p>
        <svg className="preloader-thread" viewBox="0 0 1200 80" preserveAspectRatio="none">
          <path d="M0 40 C 200 10, 380 70, 600 40 S 1000 12, 1200 40" fill="none" stroke="#C5A478" strokeWidth="1.2" />
        </svg>
        <p className="preloader-sub label">Every detail, a story</p>
      </div>
      <style>{`
        .preloader{position:fixed;inset:0;z-index:100;pointer-events:none;background:var(--color-ivory);display:grid;place-items:center;
          animation:pl-out 1s var(--ease-thread) 1.35s forwards}
        .preloader-inner{width:min(88vw,1100px);text-align:center;color:var(--color-wine)}
        .preloader-mark{font-size:clamp(2.6rem,9vw,7.5rem);opacity:0;transform:translateY(14px);animation:pl-in .9s var(--ease-silk) .05s forwards}
        .preloader-sub{margin-top:.6rem;color:var(--color-ink-soft);opacity:0;animation:pl-in .9s var(--ease-silk) .45s forwards}
        .preloader-thread{width:100%;height:40px;margin-top:.4rem}
        .preloader-thread path{stroke-dasharray:1300;stroke-dashoffset:1300;animation:pl-draw 1.2s var(--ease-thread) .15s forwards}
        @keyframes pl-in{to{opacity:1;transform:none}}
        @keyframes pl-draw{to{stroke-dashoffset:0}}
        @keyframes pl-out{0%{clip-path:inset(0 0 0 0)}100%{clip-path:inset(0 0 100% 0);visibility:hidden}}
        html.no-preload .preloader{display:none}
      `}</style>
    </div>
  );
}

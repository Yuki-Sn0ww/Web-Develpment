import React from 'react'

const Card = () => {
  return (
       <div className="bg-[#1a1a1a] border border-neutral-700 rounded-xl p-5 w-80">
      {/* Header */}
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-full bg-neutral-700 flex items-center justify-center">
            <svg viewBox="0 0 16 16" className="w-5 h-5 text-white fill-current">
              <path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.013 8.013 0 0016 8c0-4.42-3.58-8-8-8z"/>
            </svg>
          </div>
          <div>
            <p className="text-white text-sm font-semibold">@nyx</p>
            <p className="text-neutral-400 text-xs">Nyx Volkov</p>
          </div>
        </div>
        <span className="text-neutral-500 text-xs">#1</span>
      </div>
 
      {/* Bio */}
      <p className="text-neutral-300 text-sm mb-4 leading-snug">
        wayland compositor weirdo · maintainer of hyprdock · she/her
      </p>
 
      <hr className="border-neutral-700 mb-4" />
 
      {/* ASCII Art + badge + arrow */}
      <div className="flex items-center justify-between mb-4">
        <pre className="text-neutral-400 text-[10px] leading-tight font-mono">{`  | o_o |
  |:_/ |
 //   \\ \\
(|     | )
/'\\_   _/\`\\
\\___)=(___/`}</pre>
        <div className="flex items-center gap-3">
          <span className="border border-neutral-600 text-neutral-300 text-xs px-3 py-1 rounded-full">
            legendary tux
          </span>
          <span className="text-neutral-400 text-base">→</span>
        </div>
      </div>
 
      <hr className="border-neutral-700 mb-4" />
 
      {/* Stats */}
      <div className="flex gap-6">
        <div>
          <div className="flex items-center gap-1 text-white text-sm font-semibold">
            <span>🔥</span> 2,847
          </div>
          <p className="text-neutral-500 text-[10px] tracking-wide uppercase mt-0.5">Supported</p>
        </div>
        <div>
          <div className="flex items-center gap-1 text-white text-sm font-semibold">
            <span>🩷</span> 11.2k
          </div>
          <p className="text-neutral-500 text-[10px] tracking-wide uppercase mt-0.5">Followers</p>
        </div>
        <div>
          <div className="flex items-center gap-1 text-white text-sm font-semibold">
            <span>📦</span> 3
          </div>
          <p className="text-neutral-500 text-[10px] tracking-wide uppercase mt-0.5">Projects</p>
        </div>
      </div>
    </div>

 
  )
}

export default Card
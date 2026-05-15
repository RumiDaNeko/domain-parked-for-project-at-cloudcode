"use client"

import React, { useEffect, useState } from 'react'

export default function Home() {
  const [theme, setTheme] = useState<string | null>(null)
  const [anim, setAnim] = useState(false)
  const [host, setHost] = useState('')

  useEffect(() => {
    const stored = typeof window !== 'undefined' ? localStorage.getItem('theme') : null
    if (stored) {
      setTheme(stored)
      if (stored === 'dark') document.documentElement.classList.add('dark')
      else document.documentElement.classList.remove('dark')
      return
    }

    const prefersDark = typeof window !== 'undefined' && window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches
    setTheme(prefersDark ? 'dark' : 'light')
    if (prefersDark) document.documentElement.classList.add('dark')
    else document.documentElement.classList.remove('dark')
    // enable transitions after hydration to avoid SSR snap
    if (typeof window !== 'undefined') {
      setTimeout(() => document.documentElement.classList.add('transitions-ready'), 50)
    }
  }, [])

  useEffect(() => {
    if (typeof window !== 'undefined') setHost(window.location.host)
  }, [])

  function toggleTheme() {
    const next = theme === 'dark' ? 'light' : 'dark'
    setTheme(next)
    if (next === 'dark') document.documentElement.classList.add('dark')
    else document.documentElement.classList.remove('dark')
    localStorage.setItem('theme', next)
    setAnim(true)
    setTimeout(() => setAnim(false), 700)
  }

  return (
    <main className="min-h-screen bg-[var(--background)] flex flex-col transition-colors duration-500">
      <div className="absolute top-6 right-8">
        <button
          aria-label="Toggle theme"
          onClick={toggleTheme}
          title="Toggle theme"
          className="relative w-14 h-8 flex items-center rounded-full px-1 transition-colors duration-300"
          style={{ background: 'var(--secondary)' }}
        >
          <span className={"absolute left-1 top-1 w-6 h-6 rounded-full shadow transform transition-transform duration-300 " + (theme === 'dark' ? 'translate-x-6 bg-gray-900' : 'translate-x-0 bg-white')}>
            <span className="flex items-center justify-center w-full h-full">
              {theme === 'dark' ? (
                <svg className={anim ? 'spin-once' : ''} width="14" height="14" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                  <path d="M21 12.79A9 9 0 1111.21 3 7 7 0 0021 12.79z" fill="#fff" stroke="#ffffff" strokeWidth="0.6" />
                </svg>
              ) : (
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                  <circle cx="12" cy="12" r="4" fill="#000000" stroke="#000000" />
                  <g stroke="#000000" strokeWidth="0.9" strokeLinecap="round">
                    <path d="M12 1.5v2" />
                    <path d="M12 20.5v2" />
                    <path d="M1.5 12h2" />
                    <path d="M20.5 12h2" />
                    <path d="M4.2 4.2l1.4 1.4" />
                    <path d="M18.4 18.4l1.4 1.4" />
                    <path d="M4.2 19.8l1.4-1.4" />
                    <path d="M18.4 5.6l1.4-1.4" />
                  </g>
                </svg>
              )}
            </span>
          </span>
          <span className="sr-only">Toggle theme</span>
        </button>
      </div>

      {/* Main Content Area - left-aligned hero */}
      <div className="flex-1 flex items-start justify-start px-4 sm:px-8 py-8 sm:py-12">
        <div className="w-full max-w-6xl">
          <div className="hero-grid rounded-xl">
            <div className="max-w-3xl">
              <div className="text-xs tracking-widest text-[var(--muted-foreground)] mb-6">{host || 'example.com'}</div>
              <h1 className="hero-headline">Trang này trống?</h1>
              <p className="muted-paragraph mt-6">Thật ra thì, một thứ tuyệt vời đang được xây dựng ở đây đó!<br/>Chúng ta cùng đợi nhé!<br/><br/>Bạn cũng muốn build một cái sao? bấm cái nút ở dưới để chúng mình giúp nhé!</p>
              <div className="mt-8 flex flex-col sm:flex-row gap-4">
                <a href="#" className="outlined-button w-full sm:w-auto text-center">TUI CŨNG MUỐN!</a>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Footer - Bottom Right */}
      <div className="absolute bottom-8 right-8">
        <div className="flex items-center gap-2">
          <p className="text-sm font-semibold text-gray-700 dark:text-white">Powered by Cloudcode Studio</p>
          <img src={theme === 'dark' ? '/cloudcodeLogo-white.png' : '/cloudcodeLogo.png'} alt="Cloudcode Studio" className="h-8" />
        </div>
      </div>

      {/* Site address - Bottom Left */}
      <div className="absolute bottom-8 left-8">
          <a href="/" className="site-host hidden sm:inline-block text-sm font-mono text-gray-700 dark:text-white opacity-90">{host || 'example.com'}</a>
      </div>
    </main>
  )
}

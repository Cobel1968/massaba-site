'use client'
import { useState, useEffect } from 'react'

export function useIntroVideo() {
  const [showIntro, setShowIntro] = useState(true)
  const [hasSeenIntro, setHasSeenIntro] = useState(false)

  useEffect(() => {
    // Check if user has already seen the intro in this session
    const introSeen = sessionStorage.getItem('massaba_intro_seen')
    if (introSeen === 'true') {
      setShowIntro(false)
      setHasSeenIntro(true)
    }
  }, [])

  const handleIntroComplete = () => {
    sessionStorage.setItem('massaba_intro_seen', 'true')
    setShowIntro(false)
    setHasSeenIntro(true)
  }

  return { showIntro, hasSeenIntro, handleIntroComplete }
}
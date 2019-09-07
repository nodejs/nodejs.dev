import { useState, useEffect } from 'react';

export function useReleaseHistory() {
  const releasesURL = 'https://nodejs.org/dist/index.json'
  const [releaseHistory, setReleaseHistory] = useState()
  useEffect(async () => {
    try {
      const result = await fetch(releasesURL).then(data => data.json())
      setReleaseHistory(result.slice(0, 24))
    } catch (err) {
      console.error("Could not get API docs", err)
    }
  }, [])

  return releaseHistory
}

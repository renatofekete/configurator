import { useState } from 'react'

function useConcurrentFetch(endpoints: string[], authToken: string) {
  const [results, setResults] = useState<any[]>([])
  const [errors, setErrors] = useState<any[]>([])
  const [loading, setLoading] = useState(false)

  async function callApis() {
    setLoading(true)
    setResults([])
    setErrors([])

    try {
      const promises = endpoints.map((endpoint) =>
        fetch(endpoint, {
          headers: {
            'Content-Type': 'application/json',
            'x-authentication-token': authToken,
          },
        })
      )
      const responses = await Promise.all(promises)
      const data = await Promise.all(
        responses.map((response) => response.json())
      )
      setResults(data)
      return data
    } catch (error) {
      setErrors((prevErrors) => [...prevErrors, error])
    } finally {
      setLoading(false)
    }
  }

  return { results, errors, loading, callApis }
}

export default useConcurrentFetch

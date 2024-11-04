import { useState } from 'react'

function useFetch(endpoint: string, authToken: string, method: string) {
  const [result, setResult] = useState<any[]>([])
  const [errors, setErrors] = useState<any[]>([])
  const [loading, setLoading] = useState(false)

  async function callApi(body?: any) {
    setLoading(true)
    setResult([])
    setErrors([])

    try {
      const options: RequestInit = {
        headers: {
          'Content-Type': 'application/json',
          'x-authentication-token': authToken,
        },
        method,
      }

      if (
        body &&
        (method === 'POST' || method === 'PUT' || method === 'PATCH')
      ) {
        options.body = JSON.stringify(body)
      }

      const response = await fetch(endpoint, options)

      if (!response.ok) {
        throw new Error(`Error: ${response.status} ${response.statusText}`)
      }

      const contentType = response.headers.get('content-type')
      const data =
        contentType && contentType.includes('application/json')
          ? await response.json()
          : []

      setResult(data)
      return data
    } catch (error) {
      console.error(error)
      setErrors((prevErrors) => [...prevErrors, error])
    } finally {
      setLoading(false)
    }
  }

  return { result, errors, loading, callApi }
}

export default useFetch

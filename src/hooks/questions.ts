import { useEffect, useState} from 'react'
import axios, {AxiosError} from 'axios'
import { IQuestion } from '../models'

export function useQuestions() {

  const [questions, setQuestions] = useState<IQuestion[]>([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')



  async function fetchQuestions() {
    try {
      setError('')
      setLoading(true)
      const response = await axios.get('http://localhost:3000/questionnaires/1')
      setQuestions(response.data.questions)
      setLoading(false)
    } catch (e: unknown) {
      const error = e as AxiosError
      setLoading(false)
      setError(error.message)
    }
  }

  useEffect(() => {
    fetchQuestions()
  }, [])

  return { questions, error, loading }
}
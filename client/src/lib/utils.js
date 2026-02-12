import { clsx } from "clsx"
import { twMerge } from "tailwind-merge"

const HOST = import.meta.env.VITE_API_HOST || 'localhost:8000'
const URL = import.meta.env.VITE_API_URL || `http://${HOST}`
const PROD = (import.meta.env.VITE_PROD ?? 'false') === 'true'
export { HOST, URL, PROD }

export function cn(...inputs) {
  return twMerge(clsx(inputs))
}

export async function makeRequest(path, method = 'GET', data = null) {
  const token = localStorage.getItem('token')
  const response = await fetch(URL+path, {
    method, mode: 'cors',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': token ? `Token ${token}` : '',
    },
    body: data ? JSON.stringify(data) : undefined,
  })
  return response.json()
}
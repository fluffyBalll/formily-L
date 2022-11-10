import { useRef } from 'react'
import { useLayoutEffect } from './useLayoutEffect'
import { immediate } from './immediate'

export const useDidUpdate = (callback?: () => void) => {
  const request = useRef(()=>{})
  request.current = immediate(callback) 
  useLayoutEffect(() => {
    request.current()
    callback&&callback()
  })
}

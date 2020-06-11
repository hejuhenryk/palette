import { useEffect, useState, useCallback} from 'react'

type UsePersistentStateHook<T> = [ T, (value: T) => void]

export const usePersistentState = <T>(localStorageKey: string, initialValue: T): UsePersistentStateHook<T> => {
  const getInitialValue = useCallback(() => {
    try {
      const item = localStorage.getItem(localStorageKey);
      return item ? JSON.parse(item) : initialValue;
    } catch (error) {
      console.error(error)
      return initialValue;
    }
  }, [initialValue, localStorageKey])
  
  const [state, setRawState] = useState(initialValue)

  const setState = useCallback((value: T) => {
    setRawState(value)
    localStorage.setItem(localStorageKey, JSON.stringify(value))
  }, [localStorageKey])
  
  useEffect(() => {
    const v = getInitialValue()
    setState(v)
  }, [getInitialValue, setState])


  return [ state, setState ]
}
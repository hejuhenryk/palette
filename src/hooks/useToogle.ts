import { useState } from 'react';

export const useToogle = (initialState: boolean): [boolean, ()=>void, (v: boolean)=>void] => {
    const [state, setState] = useState(initialState)
    const toogleState = () => {setState(state=>!state)};
    return [state, toogleState, setState]
}
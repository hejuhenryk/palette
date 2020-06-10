import React from 'react'
import { Button } from '@material-ui/core'
import { useHistory } from 'react-router-dom'
import styled from 'styled-components'

export const Page404 = () => {
    const history = useHistory()
    return (
        <Page404Styled>
            <h1>Page not found</h1>
            <Button onClick={()=>history.push('/')} size="large" >Main Page</Button>
        </Page404Styled>
    )
}

const Page404Styled = styled.div`
    width: 100vw;
    height: 100vh;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    h1 {
        font-size: 6rem;
        font-weight: bold;
        margin: 1rem;
        text-align: center;
    }

`
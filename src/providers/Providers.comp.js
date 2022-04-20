import React from 'react'
import TxProvider from './TxProvider'

export default function Providers({ children }) {
    return (

        <TxProvider.Provider>
                    {children}
        </TxProvider.Provider>

    )
}
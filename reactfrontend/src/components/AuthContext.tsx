import React, { useEffect, useState } from 'react';
import { useAuth } from '../scripts/auth';
interface Auth {
    authorized: boolean;
    setToken:
        | React.Dispatch<React.SetStateAction<string | undefined>>
        | undefined;
}
export const authContext = React.createContext<Auth>({
    authorized: false,
    setToken: undefined,
});
export function AuthProvider({ children }: any) {
    const { authorized, setToken } = useAuth();

    return (
        <authContext.Provider value={{ authorized, setToken }}>
            {children}
        </authContext.Provider>
    );
}

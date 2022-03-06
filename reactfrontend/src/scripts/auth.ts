import { useEffect, useState } from 'react';
import { API } from './api';

export function useAuth() {
    const [authorized, setAuthed] = useState(false);
    const [token, setToken] = useState<string>();

    useEffect(() => {
        console.log('authorized: ', authorized);
    }, [authorized]);

    useEffect(() => {
        API.verify().then((x) => setAuthed(x));
        console.log('token changed');
    }, [token]);

    return { authorized, setToken };
}

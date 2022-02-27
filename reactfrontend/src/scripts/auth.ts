import { useEffect, useState } from 'react';
import { API } from './api';

export function useAuth() {
    let [authorized, setAuthed] = useState(false);
    const [token, setToken] = useState<string>();

    useEffect(() => {
        API.verify().then((x) => setAuthed(x));
    }, [token]);

    return { authorized, setToken };
}

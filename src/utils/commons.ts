export const getToken = () => {
    return sessionStorage.getItem('token') || null;
}

export const removeTokenSession = () => {
    sessionStorage.removeItem('token');
}

export const setTokenSession = (token: string) => {
    sessionStorage.setItem('token', token);
}


import { Navigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { verifyUser } from '../../services/api';

export const AuthGate = ({ type, toggle, children }) => {
    const [userVerified, setUserVerified] = useState(null);
    const user = localStorage.getItem('currentUser') ||'none'
    
    useEffect(() => {
        if (user !== 'none') {
            verifyUser(user.substring(8, user.length - 1))
                .then((res) => {
                    setUserVerified(res)
                })
                .catch((err) => console.log("verifyUser Error: ", err))
        } else { setUserVerified({ 'status': false }) }
    }, [])

    if (userVerified) {

        // console.log('Auth: ', userVerified, "toggle: ", toggle, "child: ", children)
        if ((userVerified.status && !toggle) || (!userVerified.status && toggle)) {
            return children;
        }

        switch (type) {
            case 'route':
                //console.log('route: ', type)
                return <Navigate to="/login" replace />;
            case 'menu':
                //console.log('menu: ', type, "toggle: ", toggle)
                return null;
            default:
                //console.log('default: ', type)
                return null;
        }

    } return null;
};
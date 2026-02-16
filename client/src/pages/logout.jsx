import { useEffect } from "react";

const Logout = () => {
    useEffect(() => {
        localStorage.removeItem('login');
        localStorage.removeItem('token');
        localStorage.removeItem('Name');
        localStorage.removeItem('room_uid');
        localStorage.removeItem('role');
        window.location.href = '/'
    }, [])

    return (
        <></>
    )
}

export default Logout
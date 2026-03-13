import { useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { useEffect } from 'react'

export default function PrivateRoute({ children }) {
    const { token } = useSelector((state) => state.auth)
    const navigate = useNavigate()

    useEffect(() => {
        if (!token) {
            navigate('/login')
        }
    }, [token, navigate])

    return token ? children : null
}

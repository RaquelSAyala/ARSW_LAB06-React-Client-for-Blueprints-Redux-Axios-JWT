import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { logout } from './features/auth/authSlice'
import DashboardPage from './pages/DashboardPage'
import LoginPage from './pages/LoginPage'
import PrivateRoute from './components/PrivateRoute'
import './styles.css'

function App() {
  const { token } = useSelector((state) => state.auth)
  const dispatch = useDispatch()

  return (
    <>
      <nav className="navbar navbar-dark bg-dark mb-4">
        <div className="container">
          <Link className="navbar-brand" to="/">
            Blueprints App
          </Link>
          <div className="d-flex">
            {token ? (
              <button
                className="btn btn-outline-light btn-sm"
                onClick={() => dispatch(logout())}
              >
                Logout
              </button>
            ) : (
              <Link className="btn btn-outline-light btn-sm" to="/login">
                Login
              </Link>
            )}
          </div>
        </div>
      </nav>

      <Routes>
        <Route
          path="/"
          element={
            <PrivateRoute>
              <DashboardPage />
            </PrivateRoute>
          }
        />
        <Route path="/login" element={<LoginPage />} />
      </Routes>
    </>
  )
}

export default App

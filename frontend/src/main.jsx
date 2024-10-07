import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from "react-router-dom";
import { Provider } from 'react-redux';
import store from './redux/store.js';
import Login from './pages/Auth/Login.jsx';
import Register from './pages/Auth/Register.jsx';
import PrivateRoutes from './components/PrivateRoutes.jsx';
import Profile from './pages/User/Profile.jsx';
import AdminRoutes from './pages/Admin/AdminRoutes.jsx';
import UserList from './pages/Admin/UserList.jsx';



const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path='/' element={<App />} >
      <Route path='/login' element={<Login />} />
      <Route path='/register' element={<Register />} />

      <Route path="" element={<PrivateRoutes />} >
        <Route path="/profile" element={<Profile />} />

      </Route>
      {/* Admin Routes */}
      <Route path="/admin" element={<AdminRoutes />} >
        <Route path="user-list" element={<UserList />} />

      </Route>
    </Route>
  )

)

createRoot(document.getElementById('root')).render(
  <Provider store={store}>
    <RouterProvider router={router} />

  </Provider>

)

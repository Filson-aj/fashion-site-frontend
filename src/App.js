import { Routes, Route } from 'react-router-dom'
import 'slick-carousel/slick/slick.css'
import 'slick-carousel/slick/slick-theme.css'

import { urls } from './assets/constants/data'
import { ROLES } from './configs/roles'
import useTitle from './hooks/useTitle'
import Layout from './components/Layout/Layout'
import Landing from './components/Landing/Landing'
import NotFound from './components/NotFound/NotFound'
import Login from './features/Auth/Login/Login'
import Signup from './features/Auth/Login/Signup'
import Register from './features/Auth/Login/Register'
import Portfolio from './features/Portfolio/Portfolio'
import Styles from './features/Styles/Styles'
import Services from './features/Services/Services'
import Contact from './components/Contact/Contact'
import About from './components/About/About'
import PersistLogin from './features/Auth/Login/PersistLogin'
import RequireAuth from './features/Auth/Login/RequireAuth'
import Prefetch from './features/Auth/Prefetch'
import DashboardLayout from './components/Dashboard/DashboardLayout/DashboardLayout'
import Dashboard from './components/Dashboard/Dashboard'
import Users from './features/User/Users'
import EditUser from './features/User/EditUser'
import Staffs from './features/Staff/Staffs'
import EditStaff from './features/Staff/EditStaff'
import NewStaffForm from './features/Staff/NewStaffForm'
import Customers from './features/Customers/Customers'
import EditCustomer from './features/Customers/EditCustomer'
import NewCustomerForm from './features/Customers/NewCustomerForm'
import Clothings from './features/Clothings/Clothings'
import EditClothing from './features/Clothings/EditClothing'
import NewClothingForm from './features/Clothings/NewClothingForm'
import Orders from './features/Orders/Orders'
import Sales from './features/Sales/Sales'
import EditSale from './features/Sales/EditSale'
import NewSaleForm from './features/Sales/NewSaleForm'

const App = () =>{
  useTitle(`Joyce's Fashion Stylist Zone`)

  return(
    <Routes>{/* routes container */}
      <Route path={urls.root} element={<Layout />}>{/* root route */}
        {/* public routes */}
        <Route index element={<Landing />} />
        <Route path={`/${urls.signin}`} element={<Login />} />
        <Route path={`/register/admin`} element={<Signup />} />
        <Route path={`/register`} element={<Register />} />
        <Route path={`/portfolio`} element={<Portfolio />} />
        <Route path={`/styles`} element={<Styles />} />
        <Route path={`/services`} element={<Services />} />
        <Route path={`/contact-us`} element={<Contact />} />
        <Route path={`/about-us`} element={<About />} />

        {/* protected routes */}
        <Route element={<PersistLogin />}>
          <Route element={<RequireAuth allowedRoles={[...Object.values(ROLES)]} />}>
            <Route element={<Prefetch />}>
              {/* dashboard routes */}
              <Route path='dashboard' element={<DashboardLayout />}>
                <Route index element={<Dashboard />} /> {/* dashboard landing */}

                {/* Users routing */}
                <Route element={<RequireAuth allowedRoles={[...Object.values(ROLES)]} />}>
                  <Route path='users'>
                    <Route element={<RequireAuth allowedRoles={[ROLES.Admin]} />}>
                      <Route index element={<Users />} />
                      <Route path=':id' element={<EditUser />} />
                    </Route>
                  </Route>
                </Route>

                {/* Staffs routing */}
                <Route element={<RequireAuth allowedRoles={[...Object.values(ROLES)]} />}>
                  <Route path='staffs'>
                    <Route index element={<Staffs />} />
                    <Route element={<RequireAuth allowedRoles={[ROLES.Admin]} />}>
                      <Route path=':id' element={<EditStaff />} />
                      <Route path='new' element={<NewStaffForm />} />
                    </Route>
                  </Route>
                </Route>

                {/* Customers routing */}
                <Route element={<RequireAuth allowedRoles={[ROLES.Admin, ROLES.Staff]} />}>
                  <Route path='customers'>
                    <Route index element={<Customers />} />
                    <Route element={<RequireAuth allowedRoles={[ROLES.Admin]} />} >
                      <Route path=':id' element={<EditCustomer />} />
                      <Route path='new' element={<NewCustomerForm />} />
                    </Route>
                  </Route>
                </Route>

                {/* Clothings routing */}
                <Route element={<RequireAuth allowedRoles={[...Object.values(ROLES)]} />}>
                  <Route path='clothings'>
                    <Route index element={<Clothings />} />
                    <Route element={<RequireAuth allowedRoles={[ROLES.Admin, ROLES.Staff]} />} >
                      <Route path=':id' element={<EditClothing />} />
                      <Route path='new' element={<NewClothingForm />} />
                    </Route>
                  </Route>
                </Route>

                {/* Orders routing */}
                <Route element={<RequireAuth allowedRoles={[...Object.values(ROLES)]} />}>
                  <Route path='orders'>
                    <Route index element={<Orders />} />
                  </Route>
                </Route>

                {/* Sales routing */}
                <Route element={<RequireAuth allowedRoles={[...Object.values(ROLES)]} />}>
                  <Route path='sales'>
                    <Route index element={<Sales />} />
                    <Route element={<RequireAuth allowedRoles={[ROLES.Admin, ROLES.Staff]} />} >
                      <Route path=':id' element={<EditSale />} />
                      <Route path='new' element={<NewSaleForm />} />
                    </Route>
                  </Route>
                </Route>

              </Route>

            </Route>
          </Route>
        </Route>


        {/* This is the catch-all route for 404 */}
        <Route path="*" element={<NotFound />} />

      </Route>
    </Routes>
  )
}

export default App
import React, { Suspense, useEffect } from 'react';
import Loader from './shared/Loader';
import { BrowserRouter, Route, Router, Routes } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getUser } from './redux/thunks/userThunk';
import { ToastContainer } from 'react-toastify';
import { RoleRoutes, UserRoutes } from './auth/ProtectedRoute';
const App = () => {
  const dispatch = useDispatch();
  const { user, loading } = useSelector((s) => s.auth);

  useEffect(() => {
    dispatch(getUser())
  }, []);

  
  const AuthPage = React.lazy(() => import('./app/Auth'));
  const LandingPage = React.lazy(() => import('./app/LandingPage'));
  const ForgetPass = React.lazy(() => import('./app/ForgetPass'))
  // User Components 
  const UserLayout = React.lazy(() => import('./pages/user/components/Layout'));
  const UserDashboard = React.lazy(() => import('./pages/user/Dashboard'));
  const UserEvents = React.lazy(() => import('./pages/user/UpcomingEvents'))
  const UserDonations = React.lazy(() => import('./pages/user/DonationPage'));
  const UserReports = React.lazy(() => import('./pages/user/ReportsPage'));
  const UserProducts = React.lazy(() => import('./pages/user/Products'))
  const UserFeedback = React.lazy(() => import('./pages/user/FeedbackForm'));
  // Member Routes Components
  const MemberLayout = React.lazy(() => import('./pages/member/components/Layout'));
  const MenmberTasks = React.lazy(()=> import('./pages/member/Task'));
  const MemberDonation = React.lazy(()=>import('./pages/member/DonationHistory'))
  const MemberDashboard = React.lazy(()=>import('./pages/member/DashBoard'))
  // Admin Route
  const AdminLayout = React.lazy(() => import('./pages/admin/components/Layout'));
  const AdminDashboard = React.lazy(() => import('./pages/admin/Dashboard'));
  const AdminDrvie = React.lazy(() => import('./pages/admin/PlantationDrive'));
  const AdminReprt = React.lazy(() => import('./pages/admin/PlantationReport'));
  const AdminDonations = React.lazy(()=> import('./pages/admin/Donations'));
  const AdminTaks = React.lazy(() => import('./pages/admin/TaskPage'));
  return (
    loading ? <><Loader /></> :
      <Suspense fallback={<></>}>
        <BrowserRouter>
          <Routes>
            <Route path='/forget-pass' element={<ForgetPass/>} />
            <Route path='/' element={<><LandingPage /></>} />
            <Route path='/auth' element={<UserRoutes><AuthPage /></UserRoutes>} />
            {/* User Routes */}
            <Route path='/user' element={<RoleRoutes requiredRole={"user"}></RoleRoutes>}>
              <Route index element={<UserLayout><UserDashboard/></UserLayout>} />
              {/* <Route path='dashboard' /> */}
              <Route path='events' element={<UserLayout><UserEvents/></UserLayout>} />
              <Route path='donations' element={<UserLayout><UserDonations/></UserLayout>} />
              <Route path='reports' element={<UserLayout><UserReports/></UserLayout>} />
              <Route path='products' element={<UserLayout><UserProducts/></UserLayout>}/>
              <Route path='checkout' element={<UserLayout><UserProducts/></UserLayout>}/>
              <Route path='feedback' element={<UserLayout><UserFeedback/></UserLayout>}/>
            </Route>
            {/* Member Routes */}
            <Route path='/member' element={<RoleRoutes requiredRole={"member"} />}>
              <Route index element={<MemberLayout><MemberDashboard/></MemberLayout>} />
              <Route path='tasks' element={<MemberLayout><MenmberTasks/></MemberLayout>} />
              <Route path='donations' element={<MemberLayout>  <MemberDonation/></MemberLayout>} />
            </Route>
            {/* Admin Routes */}
            <Route path='/admin' element={<RoleRoutes requiredRole={"admin"} />}>
              <Route index element={<AdminLayout > <AdminDashboard /></AdminLayout>} />
              <Route path='tasks' element={<AdminLayout > <AdminTaks/></AdminLayout>} />
              <Route path='donations' element={<AdminLayout> <AdminDonations/> </AdminLayout>} />
              <Route path='reports' element={<AdminLayout ><AdminReprt /></AdminLayout>} />
              <Route path='events' element={<AdminLayout ><AdminDrvie/></AdminLayout>} />
            </Route>

          </Routes>
        </BrowserRouter>
        <ToastContainer position='bottom-right' />
      </Suspense>
  );
}



export default App;

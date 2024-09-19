import { useSelector } from 'react-redux';
import { ThemeProvider } from '@mui/material/styles';
import { CssBaseline, StyledEngineProvider } from '@mui/material';
import themes from './themes/themes';
import NavigationScroll from './components/NavigationScroll';
import { Navigate, Route, Routes } from 'react-router-dom';
import Loadable from './components/uiComponents/Loadable';
import { lazy, useState } from 'react';
import MainLayout from './components/MainLayout/MainLayout';
import MeetingsSection from './components/SGInterface/Meetings/MeetingsSection';
import Meeting from './components/SGInterface/Meetings/Meeting';
import './App.css';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const AuthLogin = Loadable(lazy(() => import('./views/pages/authentication/auth/Login')));
const Dashboard = Loadable(lazy(() => import('./views/dashboard/dashboard')));
const Account = Loadable(lazy(() => import('./views/pages/profile-page/SettingsPage')));

const App = () => {
  const customization = useSelector((state) => state.customization);
  const [user] = useState(JSON.parse(localStorage.getItem("profile")));

  return (
    <StyledEngineProvider injectFirst>
      <ThemeProvider theme={themes(customization)}>
        <CssBaseline />
        <NavigationScroll>
          <Routes>
            {user ? (
              <>
                <Route path='/login' element={<Navigate to='/' />} />
                <Route path='/' element={<MainLayout />}>
                  <Route path='dashboard' element={<Dashboard />} />
                  <Route path='projects/intern' element={<h3>Intern Projetcs</h3>} />
                  <Route path='projects/extern' element={<h3>Extern Projetcs</h3>} />
                  <Route path='meetings'>
                    <Route path='' element={<MeetingsSection />} />
                    <Route path=':id' element={<Meeting />} />
                  </Route>
                  <Route path='members' element={<h3>Members Table</h3>} />
                </Route>
                <Route path='/account-settings' element={<Account />} />
              </>
            ) : (
              <>
                <Route path='/login' element={<AuthLogin />} />
                <Route path='/*' element={<Navigate to='/login' />} />
              </>
            )}
          </Routes>
        </NavigationScroll>
      </ThemeProvider>
      <ToastContainer />
    </StyledEngineProvider >
  );
};

export default App;

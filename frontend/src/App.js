import React from 'react';
// import Map from "./feature/Map/Map";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from './routes/Layout';
import Map1 from './feature/Map/Map1';
import Dashboard from './feature/Dashboard/Dashboard';
import {
  Vehicles,
  VehicleItem,
  VehicleItemNew
} from './feature/Vehicles';
import {
  Bins,
  BinItem,
  BinItemNew
} from './feature/Bins';

import {
  Drivers,
  DriverItem,
  DriverItemNew
} from './feature/Driver';
import {
  Companies,
  CompanyItem,
  CompanyItemNew
} from './feature/Companies';

import {
  ValidVehicle
} from './feature/ValidVehicle';

import Login from './feature/Auth/Login';
import { useSelector } from 'react-redux';
import { authSelector } from './store/reducers/authSlice';
import ProtectedRoutes from './routes/ProtectedRoutes';
import PublicRoutes from './routes/PublicRoutes';
import Map from './feature/Map/Map';

const App = () => {
  const useAuth = () => {
    const user = localStorage.getItem('user')
    if (user) {
      return JSON.parse(user);
    } else {
      return null
    }
  }

  const isAdmin = () => {
    const user = localStorage.getItem('user')
    if (user) {
      return !!user && JSON.parse(user).role.includes('admin');
    } else {
      return false
    }
  }

  const isCompany = () => {
    const user = localStorage.getItem('user')
    if (user) {
      return !!user && JSON.parse(user).role.includes('company_staff');
    } else {
      return false
    }
  }

  const isDriver = () => {
    const user = localStorage.getItem('user')
    if (user) {
      return !!user && JSON.parse(user).role.includes('driver');
    } else {
      return false
    }
  }

  const auth = useAuth();

  return (
    <Routes>
      <Route element={<ProtectedRoutes />}>
        <Route path="" element={<Layout />} >
          <Route index element={isDriver() ? <Map /> : <Map1 />} />
          <Route path="map" element={isDriver() ? <Map /> : <Map1 />} />

          {(isAdmin() || isCompany()) && <Route path="dashboard" element={<Dashboard />} />}

          {(isAdmin() || isCompany()) && <Route path="vehicles" element={<Vehicles />} />}
          {(isAdmin() || isCompany()) && <Route path="vehicles/:vehicleId" element={<VehicleItem />} />}
          {(isAdmin()) && <Route path="vehicles/add" element={<VehicleItemNew state={"new"} />} />}
          {(isAdmin()) && <Route path="vehicles/edit/:vehicleId" element={<VehicleItemNew state={"edit"} />} />}

          {(isAdmin() || isCompany()) && <Route path="drivers" element={<Drivers />} />}
          {(isAdmin() || isCompany()) && <Route path="drivers/:driverId" element={<DriverItem />} />}
          {(isAdmin()) && <Route path="drivers/add" element={<DriverItemNew state={"new"} />} />}
          {(isAdmin()) && <Route path="drivers/edit/:driverId" element={<DriverItemNew state={"edit"} />} />}

          {(isAdmin()) && <Route path="companies" element={<Companies />} />}
          {(isAdmin()) && <Route path="companies/:companyId" element={<CompanyItem />} />}
          {(isAdmin()) && <Route path="companies/add" element={<CompanyItemNew state={"new"} />} />}
          {(isAdmin()) && <Route path="companies/edit/:companyId" element={<CompanyItemNew state={"edit"} />} />}

          {(isAdmin() || isCompany()) && <Route path="bins" element={<Bins />} />}
          {(isAdmin() || isCompany()) && <Route path="bins/:binId" element={<BinItem />} />}
          {(isAdmin()) && <Route path="bins/add" element={<BinItemNew state={"new"} />} />}
          {(isAdmin()) && <Route path="bins/edit/:binId" element={<BinItemNew state={"edit"} />} />}

          {(isAdmin() || isCompany()) && <Route path="alerts" element={<ValidVehicle />} />}

          <Route path="*" element={<div>Not Found</div>} />
        </Route>
      </Route>
      <Route element={<PublicRoutes />}>
        {/* <Route path='register' element={<Register />} /> */}
        <Route path="/login" element={<Login />} />
      </Route>
    </Routes>
  );
}

export default App;

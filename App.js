import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import LoginPage from './components/LoginPage';
import RegistrationPage from './components/RegistrationPage';
import { Navigate } from "react-router-dom";
import AdminPage1 from "./components/AdminPage1";
import AdminPage2 from "./components/AdminPage2";
import OrderList from "./components/OrderList";
import Orders from "./components/orders";
import Dashboard from "./components/dashboard";
import DeliveryPerson from "./components/DeliveryPerson";
import Home from "./components/Home";

function App() {
    return (
        <>
            <Router>
                <Routes>
                    <Route path="/" element={<Home/>} />
                    <Route path="/login" element={<LoginPage />} />
                    <Route path="/register" element={<RegistrationPage />} />
                    <Route path="/adminPage1" element={<AdminPage1 />} />
                    <Route path="/adminPage2" element={<AdminPage2 />} />
                    <Route path="/orderList" element={<OrderList />} />
                    <Route path="/orders" element={<Orders />} />
                    <Route path="/dashboard" element={<Dashboard/>}/>
                    <Route path="/deliveryPerson" element={<DeliveryPerson />} />
                    <Route path="*" element={<Navigate to="/login" />} />
                </Routes>
            </Router>
        </>
    );
}

export default App;
import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Link, useNavigate } from 'react-router-dom';
import ShipmentList from './components/Shipment/ShipmentList.tsx';
import DriverList from './components/Driver/DriverList.tsx';
import CustomerList from './components/Customer/CustomerList.tsx';
import AddShipment from './components/Shipment/AddShipment.tsx';
import EditShipment from './components/Shipment/EditShipment.tsx';
import AddDriver from './components/Driver/AddDriver.tsx';
import EditDriver from './components/Driver/EditDriver.tsx';
import AddCustomer from './components/Customer/AddCustomer.tsx';
import EditCustomer from './components/Customer/EditCustomer.tsx';
import { ApolloWrapper } from './services/api.tsx';

const App: React.FC = () => {
  return (
    <ApolloWrapper>
      <Router>
        <div>
          {/* Top Navigation Menu */}
          <nav style={styles.nav}>
            <ul style={styles.menuList}>
              <li>
                <Link to="/shipments" style={styles.menuItem}>
                  Shipment
                </Link>
              </li>
              <li>
                <Link to="/drivers" style={styles.menuItem}>
                  Driver
                </Link>
              </li>
              <li>
                <Link to="/customers" style={styles.menuItem}>
                  Customer
                </Link>
              </li>
            </ul>
          </nav>

          {/* Routes */}
          <Routes>
            {/* Shipment Routes */}
            <Route path="/shipments" element={<ShipmentList />} />
            <Route path="/shipments/add" element={<AddShipment />} />
            <Route path="/shipments/edit/:id" element={<EditShipment />} />

            {/* Driver Routes */}
            <Route path="/drivers" element={<DriverList />} />
            <Route path="/drivers/add" element={<AddDriver />} />
            <Route path="/drivers/edit/:id" element={<EditDriver />} />

            {/* Customer Routes */}
            <Route path="/customers" element={<CustomerList />} />
            <Route path="/customers/add" element={<AddCustomer />} />
            <Route path="/customers/edit/:id" element={<EditCustomer />} />
          </Routes>
        </div>
      </Router>
    </ApolloWrapper>
  );
};

export default App;

// Add simple inline styles for layout and design
const styles = {
  nav: {
    backgroundColor: '#282c34',
    padding: '10px 0',
  },
  menuList: {
    listStyleType: 'none',
    padding: 0,
    display: 'flex',
    justifyContent: 'space-around',
    margin: 0,
    fontSize: "18px"
  },
  menuItem: {
    margin: '0 10px',
    color: 'white',
    textDecoration: 'none',
    cursor: 'pointer',
  },

};
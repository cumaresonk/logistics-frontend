import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useQuery, useMutation } from '@apollo/client';
import { UPDATE_SHIPMENT } from '../../graphql/mutations.ts';
import { GET_ALL_DRIVERS, GET_ALL_CUSTOMERS } from '../../graphql/queries.ts';

const EditShipment: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  console.log("location.state?.shipment",location.state?.shipment)
  const shipment = location.state?.shipment || {
    id: '',
    origin: '',
    destination: '',
    status: '',
    driver: { id: '' },
    customer: { id: '' },
  };

  const [origin, setOrigin] = useState(shipment.origin);
  const [destination, setDestination] = useState(shipment.destination);
  const [status, setStatus] = useState(shipment.status);
  const [driverId, setDriver] = useState(shipment.driver.id);
  const [customerId, setCustomer] = useState(shipment.customer.id);

  const { loading: driversLoading, data: driversData } = useQuery(GET_ALL_DRIVERS);
  const { loading: customersLoading, data: customersData } = useQuery(GET_ALL_CUSTOMERS);
  const [updateShipment] = useMutation(UPDATE_SHIPMENT);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await updateShipment({
        variables: {
          id: shipment.id,
          origin,
          destination,
          status,
          driverId,
          customerId,
        },
      });
      navigate('/shipments');
    } catch (err) {
      console.error('Error updating shipment:', err.message);
    }
  };

  if (driversLoading || customersLoading) return <p>Loading...</p>;

  const drivers = driversData?.drivers || [];
  const customers = customersData?.customers || [];

  return (
    <div style={styles.container}>
      <h2 style={styles.title}>Edit Shipment</h2>
      <form style={styles.form} onSubmit={handleSubmit}>
        <label style={styles.label}>
          Origin:
          <input
            type="text"
            value={origin}
            onChange={(e) => setOrigin(e.target.value)}
            required
            style={styles.input}
          />
        </label>
        <label style={styles.label}>
          Destination:
          <input
            type="text"
            value={destination}
            onChange={(e) => setDestination(e.target.value)}
            required
            style={styles.input}
          />
        </label>
        <label style={styles.label}>
          Status:
          <input
            type="text"
            value={status}
            onChange={(e) => setStatus(e.target.value)}
            required
            style={styles.input}
          />
        </label>
        <label style={styles.label}>
          Driver:
          <select
            value={driverId}
            onChange={(e) => setDriver(e.target.value)}
            required
            style={styles.select}
          >
            <option value="">Select Driver</option>
            {drivers.map((driver: any) => (
              <option key={driver.id} value={driver.id}>
                {driver.name}
              </option>
            ))}
          </select>
        </label>
        <label style={styles.label}>
          Customer:
          <select
            value={customerId}
            onChange={(e) => setCustomer(e.target.value)}
            required
            style={styles.select}
          >
            <option value="">Select Customer</option>
            {customers.map((customer: any) => (
              <option key={customer.id} value={customer.id}>
                {customer.name}
              </option>
            ))}
          </select>
        </label>
        <button type="submit" style={styles.button}>
          Update
        </button>
      </form>
    </div>
  );
};

export default EditShipment;

const styles = {
  container: {
    width: '90%',
    maxWidth: '420px',
    margin: '20px auto',
    backgroundColor: 'rgb(245 242 242)',
    borderRadius: '6px',
  
  },
  title: {
    textAlign: 'center',
    color: '#333',
    marginBottom: '15px',
    fontSize: '18px',
    fontWeight: '600',
  },
  form: {
    display: 'flex',
    flexDirection: 'column' as 'column',
    gap: '10px', // Reduced space between elements
  },
  label: {
    fontSize: '14px',
    color: 'black',
    fontWeight: '500',
    marginBottom: '4px',
  },
  input: {
    padding: '10px',
    fontSize: '12px',
    border: '1px solid #ccc',
    borderRadius: '4px',
    width: '93%',
    boxSizing: 'border-box',
    marginTop: '4px',
  },
  select: {
    padding: '10px',
    fontSize: '12px',
    border: '1px solid #ccc',
    borderRadius: '4px',
    width: '93%',
    boxSizing: 'border-box',
    marginTop: '4px',
  },
  button: {
    padding: '10px 16px',
    fontSize: '14px',
    color: '#fff',
    backgroundColor: '#4CAF50',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
    width: '34%',
    marginLeft:"135px",
    marginTop: '15px',
    transition: 'background-color 0.3s ease',
  },
  buttonHover: {
    backgroundColor: '#45a049',
  },
  loading: {
    textAlign: 'center',
    fontSize: '14px',
    color: '#555',
  },
  error: {
    textAlign: 'center',
    fontSize: '14px',
    color: 'red',
  },
};

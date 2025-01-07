import React, { useState } from 'react';
import { useMutation, useQuery } from '@apollo/client';
import { ADD_SHIPMENT } from '../../graphql/mutations.ts';
import { GET_ALL_CUSTOMERS, GET_ALL_DRIVERS, GET_ALL_SHIPMENTS } from '../../graphql/queries.ts';
import { useNavigate } from 'react-router-dom';

const AddShipment: React.FC = () => {
  const [origin, setOrigin] = useState('');
  const [destination, setDestination] = useState('');
  const [status, setStatus] = useState('');
  const [driverId, setDriverId] = useState('');
  const [customerId, setCustomerId] = useState('');

  const [addShipment] = useMutation(ADD_SHIPMENT);
  const navigate = useNavigate();

  const { data: driverData, loading: driverLoading, error: driverError } = useQuery(GET_ALL_DRIVERS);
  const { data: customerData, loading: customerLoading, error: customerError } = useQuery(GET_ALL_CUSTOMERS);

  if (driverLoading || customerLoading) return <p style={styles.loading}>Loading...</p>;
  if (driverError || customerError) return <p style={styles.error}>Error loading data</p>;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      await addShipment({
        variables: {
          customerId,
          destination,
          driverId,
          origin,
          status,
        },
        refetchQueries: [{ query: GET_ALL_SHIPMENTS }],
      });
      navigate('/shipments');
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div style={styles.container}>
      <h2 style={styles.title}>Add Shipment</h2>
      <form onSubmit={handleSubmit} style={styles.form}>
        <label style={styles.label}>
          Origin:
          <input
            type="text"
            value={origin}
            onChange={(e) => setOrigin(e.target.value)}
            style={styles.input}
            required
          />
        </label>
        <label style={styles.label}>
          Destination:
          <input
            type="text"
            value={destination}
            onChange={(e) => setDestination(e.target.value)}
            style={styles.input}
            required
          />
        </label>
        <label style={styles.label}>
          Status:
          <input
            type="text"
            value={status}
            onChange={(e) => setStatus(e.target.value)}
            style={styles.input}
            required
          />
        </label>
        <label style={styles.label}>
          Driver:
          <select
            value={driverId}
            onChange={(e) => setDriverId(e.target.value)}
            style={styles.select}
            required
          >
            <option value="">Select Driver</option>
            {driverData?.drivers.map((driver: any) => (
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
            onChange={(e) => setCustomerId(e.target.value)}
            style={styles.select}
            required
          >
            <option value="">Select Customer</option>
            {customerData?.customers.map((customer: any) => (
              <option key={customer.id} value={customer.id}>
                {customer.name}
              </option>
            ))}
          </select>
        </label>
        <button type="submit" style={styles.button}>
          Save
        </button>
      </form>
    </div>
  );
};

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
    width: '15%',
    marginLeft:"169px",
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

export default AddShipment;

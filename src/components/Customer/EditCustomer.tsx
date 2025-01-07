// EditCustomer.tsx
import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useMutation } from '@apollo/client';
import { UPDATE_CUSTOMER } from '../../graphql/mutations.ts';
import { GET_ALL_CUSTOMERS } from '../../graphql/queries.ts';

const EditCustomer: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  
  const customer = location.state?.customer || {
    id: '',
    name: '',
    location: '',
  };

  const [name, setName] = useState(customer.name);
  const [locationValue, setLocation] = useState(customer.location);

  const [updateCustomer] = useMutation(UPDATE_CUSTOMER);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await updateCustomer({
        variables: {
          id: customer.id,
          name,
          location: locationValue,
        },
      });
      navigate('/customers');
    } catch (err) {
      console.error('Error updating customer:', err.message);
    }
  };

  return (
    <div style={styles.container}>
      <h2 style={styles.title}>Edit Customer</h2>
      <form style={styles.form} onSubmit={handleSubmit}>
        <label style={styles.label}>
          Name:
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            style={styles.input}
          />
        </label>
        <label style={styles.label}>
          Location:
          <input
            type="text"
            value={locationValue}
            onChange={(e) => setLocation(e.target.value)}
            required
            style={styles.input}
          />
        </label>
        <button type="submit" style={styles.button}>
          Update
        </button>
      </form>
    </div>
  );
};

export default EditCustomer;

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
    gap: '10px',
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
  button: {
    padding: '10px 16px',
    fontSize: '14px',
    color: '#fff',
    backgroundColor: '#4CAF50',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
    width: '34%',
    marginLeft: '135px',
    marginTop: '15px',
    transition: 'background-color 0.3s ease',
  },
  buttonHover: {
    backgroundColor: '#45a049',
  },
};

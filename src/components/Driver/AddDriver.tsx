import React, { useState } from 'react';
import { useMutation } from '@apollo/client';
import { ADD_DRIVER } from '../../graphql/mutations.ts';
import { GET_ALL_DRIVERS } from '../../graphql/queries.ts';
import { useNavigate } from 'react-router-dom';

const AddDriver: React.FC = () => {
  const [name, setName] = useState('');
  const [vehicle, setVehicle] = useState('');
  const navigate = useNavigate();
  const [addDriver] = useMutation(ADD_DRIVER, {
    refetchQueries: [{ query: GET_ALL_DRIVERS }],
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await addDriver({ variables: { name, vehicle } });
      navigate('/drivers');
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div style={styles.container}>
      <h2 style={styles.title}>Add Driver</h2>
      <form onSubmit={handleSubmit} style={styles.form}>
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
          Vehicle:
          <input
            type="text"
            value={vehicle}
            onChange={(e) => setVehicle(e.target.value)}
            required
            style={styles.input}
          />
        </label>
        <button type="submit" style={styles.button}>Save</button>
      </form>
    </div>
  );
};

const styles = {
  container: {
    width: '52%',
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
    width: '29%',
    marginLeft: '142px',
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

export default AddDriver;

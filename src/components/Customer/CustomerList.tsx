// CustomerList.tsx
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useQuery, useMutation } from '@apollo/client';
import { GET_ALL_CUSTOMERS } from '../../graphql/queries.ts';
import { DELETE_CUSTOMER } from '../../graphql/mutations.ts';

const CustomerList: React.FC = () => {
  const navigate = useNavigate();
  const { loading, error, data, refetch } = useQuery(GET_ALL_CUSTOMERS);
  const [deleteCustomer] = useMutation(DELETE_CUSTOMER);

  const handleEdit = (customer: any) => {
    navigate(`/customers/edit/${customer.id}`, { state: { customer } });
  };

  const handleDelete = async (id: string) => {
    try {
      await deleteCustomer({ variables: { id } });
      refetch();
    } catch (err) {
      console.error(`Error deleting customer: ${err.message}`);
    }
  };

  if (loading) return <p>Loading customers...</p>;
  if (error) return <p>Error fetching customers: {error.message}</p>;

  const customers = data?.customers || [];
console.log("cs",customers)
  return (
    <div style={styles.customerListContainer}>
      <div style={styles.headerContainer}>
        <h2 style={styles.header}>Customer List</h2>
        <button style={styles.addButton} onClick={() => navigate('/customers/add')}>
          Add
        </button>
      </div>
      <table style={styles.customerTable}>
        <thead>
          <tr>
            <th style={styles.tableHeader}>No</th>
            <th style={styles.tableHeader}>Name</th>
            <th style={styles.tableHeader}>Location</th>
            <th style={styles.tableHeader}>Actions</th>
          </tr>
        </thead>
        <tbody>
          {customers.map((customer: any, index: number) => (
            <tr key={customer.id}>
              <td style={styles.tableCell}>{index + 1}</td>
              <td style={styles.tableCell}>{customer.name}</td>
              <td style={styles.tableCell}>{customer.location}</td>
              <td style={styles.actions}>
                <button style={styles.actionButton} onClick={() => handleEdit(customer)}>
                  Edit
                </button>
                <button style={styles.actionButton} onClick={() => handleDelete(customer.id)}>
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default CustomerList;

const styles = {
  customerListContainer: {
    width: '90%',
    margin: '25px auto',
  },
  headerContainer: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '20px',
    width: "88%",
    marginLeft: "59px",
  },
  header: {
    fontSize: '16px',
    marginBottom: '20px',
  },
  addButton: {
    backgroundColor: '#4CAF50',
    color: 'white',
    padding: '10px 20px',
    border: 'none',
    cursor: 'pointer',
    borderRadius: '4px',
    fontSize: '14px',
    ':hover': {
      backgroundColor: '#45a049',
    },
  },
  customerTable: {
    width: '90%',
    maxWidth: '100%',
    margin: '0 auto',
    borderCollapse: 'collapse',
    backgroundColor: '#fff',
    fontSize: '14px',
    boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
  },
  tableHeader: {
    backgroundColor: '#4CAF50',
    color: 'white',
    padding: '12px',
    border: '1px solid #aaa', 
    textAlign: 'center',
  },
  tableCell: {
    padding: '10px',
    border: '1px solid #ddd', 
    textAlign: 'center',
  },
  actions: {
    display: 'flex',
    justifyContent: 'center',
    border: 'none', 
  },
  actionButton: {
    backgroundColor: '#4CAF50',
    color: 'white',
    padding: '8px 12px',
    border: 'none',
    cursor: 'pointer',
    marginRight: '8px',
    borderRadius: '4px',
    ':hover': {
      backgroundColor: '#45a049',
    },
  },
};

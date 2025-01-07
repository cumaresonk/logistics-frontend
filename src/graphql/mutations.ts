import { gql } from '@apollo/client';

// Shipments
export const ADD_SHIPMENT = gql`
  mutation AddShipment($origin: String!, $destination: String!, $status: String!, $driverId: String!, $customerId: String!) {
  createShipment(
    createShipmentInput: {
      origin: $origin,
      destination: $destination,
      status: $status,
      driverId: $driverId,
      customerId: $customerId
    }
  ) {
    id
    origin
    destination
    status
    driver {
      id
      name
    }
    customer {
      id
      name
    }
  }
}

`;

export const UPDATE_SHIPMENT = gql`
 mutation UpdateShipment(
  $id: String!, 
  $origin: String, 
  $destination: String, 
  $status: String, 
  $driverId: String, 
  $customerId: String
) {
  updateShipment(
      updateShipmentInput: {
      id: $id
      origin: $origin
      destination: $destination
      status: $status
      driverId: $driverId
      customerId: $customerId
    }
  ) {
    id
    origin
    destination
    status
    driver {
      id
      name
    }
    customer {
      id
      name
    }
  }
}


`;

export const DELETE_SHIPMENT = gql`
mutation DeleteShipment($id: String!) {
    deleteShipment(id: $id) 
  }
`;

// Drivers
export const ADD_DRIVER = gql`
  mutation AddDriver($name: String!, $vehicle: String!) {
    createDriver(
      createDriverInput: { name: $name, vehicle: $vehicle }
    ) {
      id
      name
      vehicle
    }
  }
`;

export const UPDATE_DRIVER = gql`
    mutation UpdateDriver($id: String!, $name: String, $vehicle: String) {
    updateDriver(
      updateDriverInput: { id: $id, name: $name, vehicle: $vehicle }
    ) {
      id
      name
      vehicle
    }
  }
`;

export const DELETE_DRIVER = gql`
  mutation DeleteDriver($id: String!) {
    removeDriver(id: $id)
  }
`;

// Customers
export const ADD_CUSTOMER = gql`
  mutation AddCustomer($name: String!, $location: String!) {
    createCustomer(
      createCustomerInput: { name: $name, location: $location }
    ) {
      id
      name
      location
    }
  }
`;

export const UPDATE_CUSTOMER = gql`
  mutation UpdateCustomer($id: String!, $name: String, $location: String) {
    updateCustomer(
      updateCustomerInput: { id:$id,name: $name, location: $location }
    ) {
      id
      name
      location
    }
  }
`;

export const DELETE_CUSTOMER = gql`
  mutation DeleteCustomer($id: String!) {
    removeCustomer(id: $id)
  }
`;

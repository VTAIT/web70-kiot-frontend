import React from "react";

const Customer = (props) => {
  const customer = props.customer;

  return (
    <tr>
      <td>{customer.username}</td>
      <td>{customer.fullName}</td>
      <td>{customer.gender}</td>
      <td>{customer.phone}</td>
      <td>{customer.email}</td>
      <td>{customer.address}</td>
      <td>{customer.rank}</td>
    </tr>
  );
};

export default Customer;

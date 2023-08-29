import React, { useEffect, useState } from "react";
import customerAPI from "../apis/customerAPI";
import Customer from "../components/Customer";
import NewCustomerModal from "../components/NewCustomerModal";

const Customers = () => {
  const [customers, setCustomers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [newCustomerModalOpen, setNewCustomerModalOpen] = useState(false);
  // const [show, setShow] = useState(false);
  const handleClose = () => setNewCustomerModalOpen(false);
  const handleShow = () => setNewCustomerModalOpen(true);
  const [editedCustomer, setEditedCustomer] = useState()
  useEffect(() => {
    fetchCustomers();
  }, []);

  const fetchCustomers = async () => {
    try {
      setLoading(true);
      const response = await customerAPI.getAll();
      setCustomers(response.data.data.customerList);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  // const openCustomerModal = () => {
  //   setNewCustomerModalOpen(true);
  // };
  const handleEditCustomer = (customer) => {
    setEditedCustomer(customer);
    setNewCustomerModalOpen(true);
  };
  return (
    <div className="container-fluid mt-4">
      {loading ? (
        <p>Loading customers ...</p>
      ) : (
        <>
          <div className="row">
            <div className="col-sm-12">
              {/* account list */}
              <div className="row">
                <div className="col-12">
                  <div className="card">
                    <div className="card-body">
                      <div
                        className="mt-0 header-title"
                        style={{
                          display: "flex",
                          justifyContent: "space-between",
                        }}
                      >
                        <h4 className="mt-0 header-title">Customer List</h4>
                        <button
                          className="btn btn-primary mb-4 fw-bolder "
                          type="button"
                          onClick={handleShow}
                        >
                          Add Customer
                        </button>
                      </div>
                      <table
                        id="datatable"
                        className="table table-bordered dt-responsive nowrap"
                        style={{
                          borderCollapse: "collapse",
                          borderSpacing: 0,
                          width: "100%",
                        }}
                      >
                        <thead>
                          <tr>
                            <th>Full Name</th>
                            <th>Gender</th>
                            <th>Phone</th>
                            <th>Email</th>
                            <th>Address</th>
                            <th>Rank</th>
                            <th>Action</th>
                          </tr>
                        </thead>
                        <tbody>
                          {customers &&
                            customers.length > 0 &&
                            customers.map((customer, index) => {
                              return (
                                <Customer
                                  customer={customer}
                                  key={index}
                                  onEditCustomer={() => {
                                    handleEditCustomer(customer);
                                  }}
                                />
                              );
                            })}
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <NewCustomerModal
            show={newCustomerModalOpen}
            handleClose={handleClose}
            onUpdateCustomer={fetchCustomers}
            editedCustomer={editedCustomer}
          />
        </>
      )}
    </div>
  );
};

export default Customers;

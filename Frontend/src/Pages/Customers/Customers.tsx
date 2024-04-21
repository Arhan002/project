import axios from "axios";
import { createContext, useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { usercontext } from "../../Context/User Details/User_details";
import "../Customers/Customers.css";

const showContext = createContext<boolean | any>(false);

const url = "http://127.0.0.1:5000/get_customer";

type customer_data = {
  customer_id: number;
  customer_name: string;
  email: string;
  phone_number: string;
  address: string;
};

const Customers = () => {
  const navigate = useNavigate();
  const [show, setShow] = useState(false);
  const [customer_data, setCustomerData] = useState<customer_data[]>([]);
  const [user, setUser] = useContext(usercontext);

  const getAllCustomers = async () => {
    try {
      const resp = await axios.post(url, { store_id: user.store });
      const data = resp.data;
      setCustomerData(data);
      console.log(data);
      console.log(user);
    } catch (error) {
      console.log(error);
    }
  };

  const goToCustomer = (id: number) => {
    try {
      setUser({ ...user, customer: id });
      if (user.customer != 0 && user.customer != undefined) {
        navigate("/store/Customers/Payments");
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getAllCustomers();
  }, []);

  return (
    <>
      <showContext.Provider value={[show, setShow]}>
        {show ? <AddStore /> : <>{}</>}
        <div className="main-container">
          <div className="sub-container">
            <div className="store-container">
              <div className="store-heading">
                <p>Customers</p>
                <button
                  className="add-store-button"
                  onClick={() => setShow(true)}
                >
                  +
                </button>
              </div>
              <div className="table-container">
                <table className="table-main">
                  <tr>
                    <th>Customer ID</th>
                    <th>Customer Name</th>
                    <th>Customer Location</th>
                    <th>Customer Type</th>
                    <th>Contact Number</th>
                    <th>Actions</th>
                  </tr>
                  {/* <tr className="table-row">
                    <td>Customer ID</td>
                    <td>Customer Name</td>
                    <td>Customer Location</td>
                    <td>Customer Type</td>
                    <td>Contact Number</td>
                    <td>
                      <button>View</button>
                    </td>
                  </tr> */}
                  {customer_data &&
                    Array.isArray(customer_data) &&
                    customer_data.map((data: customer_data) => {
                      return (
                        <tr className="table-row">
                          <td>{data.customer_id}</td>
                          <td>{data.customer_name}</td>
                          <td>{data.address}</td>
                          <td>{data.email}</td>
                          <td>{data.phone_number}</td>
                          <td>
                            <button
                              onClick={() => goToCustomer(data.customer_id)}
                            >
                              View
                            </button>
                            <button>delete</button>
                          </td>
                        </tr>
                      );
                    })}
                </table>
              </div>
            </div>
          </div>
        </div>
      </showContext.Provider>
    </>
  );
};

const AddStore = () => {
  const [show, setShow] = useContext(showContext);
  return (
    <div className="add-main-container">
      <div className="add-sub-container">
        <div className="mini-container">
          <p style={{ fontWeight: "bold" }}>ADD new Store</p>
          <button className="x_button" onClick={() => setShow(false)}>
            X
          </button>

          <form id="AddForm">
            <input type="text" placeholder="" />
            <input type="text" />
            <button onClick={() => setShow(false)}>Submit</button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Customers;

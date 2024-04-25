import axios from "axios";
import { Button } from "primereact/button";
import { Toast } from "primereact/toast";
import {
  MouseEvent,
  createContext,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";
import { Link, useNavigate } from "react-router-dom";
import { usercontext } from "../../Context/User Details/User_details";
import back from "../../assets/back.png";
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
  const toast = useRef<any>(null);
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

  const deleteStore = async (id: number) => {
    try {
      const resp = await axios.delete(url + "/" + id);
      toast.current.show({
        severity: "warn",
        summary: "Deleted",
        detail: "Please refresh",
      });
      console.log("Delete");
    } catch (error) {
      toast.current.show({
        severity: "error",
        summary: "Contains Content",
        detail: "Please remove all the related tables",
      });
      console.log("error");
    }
  };

  useEffect(() => {
    getAllCustomers();
  }, [show]);

  return (
    <>
      <showContext.Provider value={[show, setShow]}>
        <Toast ref={toast} />
        {show ? <AddStore /> : <>{}</>}
        <div className="main-container">
          <div className="sub-container">
            <div className="store-container">
              <Link to={"/store"}>
                <img
                  src={back}
                  style={{ width: "50px", height: "50px" }}
                  className="back-button"
                />
              </Link>
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
                              className="vButton"
                              style={{ margin: "2px" }}
                            >
                              View
                            </button>
                            <button
                              className="dButton"
                              onClick={() => deleteStore(data.customer_id)}
                              style={{ margin: "2px" }}
                            >
                              delete
                            </button>
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
  const [store, setStore] = useState({
    customer_name: "",
    email: "",
    contact: "",
    address: "",
  });
  const addUrl = "http://127.0.0.1:5000/add_customer";
  const [user, setUser] = useContext(usercontext);
  const addStore = async (
    e: MouseEvent<HTMLButtonElement, globalThis.MouseEvent>
  ) => {
    e.preventDefault();
    if (user.store != 0 && user.store != undefined) {
      try {
        const resp = await axios.post(addUrl, {
          store_id: user.store,
          customer_name: store.customer_name,
          email: store.email,
          contact: store.contact,
          address: store.address,
        });
        console.log(resp.data);
        setShow(false);
      } catch (error) {
        console.log("F Err");
      }
    }
  };
  return (
    <div className="add-main-container">
      <div className="add-sub-container">
        <div className="mini-container">
          <p style={{ fontWeight: "bold" }}>ADD new Customer</p>
          <button className="x_button" onClick={() => setShow(false)}>
            X
          </button>

          <form id="AddForm">
            <input
              type="text"
              placeholder="Customer Name"
              value={store.customer_name}
              onChange={(e) =>
                setStore({ ...store, customer_name: e.target.value })
              }
            />
            <input
              type="text"
              placeholder="Email"
              value={store.email}
              onChange={(e) => setStore({ ...store, email: e.target.value })}
            />
            <input
              type="text"
              placeholder="Phone Number"
              value={store.contact}
              onChange={(e) => setStore({ ...store, contact: e.target.value })}
            />
            <input
              type="text"
              placeholder="Address"
              value={store.address}
              onChange={(e) => setStore({ ...store, address: e.target.value })}
            />
            <Button
              severity="warning"
              onClick={(e) => addStore(e)}
              style={{ display: "flex", justifyContent: "center" }}
            >
              Submit
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Customers;

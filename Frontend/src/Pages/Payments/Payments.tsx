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
import "../Payments/Payments.css";

export const showContext = createContext<boolean | any>(false);

const url = "http://127.0.0.1:5000/get_payments";

type payments_data = {
  payment_id: number;
  customer_id: number;
  purchase_id: number;
  payment_date: number;
  payment_method: string;
  amount: number;
};
const Payments = () => {
  const toast = useRef<any>(null);
  const [payments_data, setPaymentsData] = useState([]);
  const [show, setShow] = useState(false);
  const [user, setUser] = useContext(usercontext);
  const navigate = useNavigate();

  const getAllStores = async () => {
    try {
      const resp = await axios.post(url, { customer_id: user.customer });
      const data = resp.data;
      setPaymentsData(data);
      console.log(data);
      console.log(user);
    } catch (error) {
      console.log(error);
    }
  };

  const goToPayment = (id: number) => {
    try {
      setUser({ ...user, payment: id });
      if (user.payment != 0 && user.payment != undefined) {
        navigate("/store/Customers/Payments/Products");
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
    getAllStores();
  }, [show]);
  return (
    <>
      <showContext.Provider value={[show, setShow]}>
        <Toast ref={toast} />
        {show ? <AddStore /> : <>{}</>}
        <div className="main-container">
          <div className="sub-container">
            <div className="store-container">
              <Link to={"/store/Customers"}>
                <img
                  src={back}
                  style={{ width: "50px", height: "50px" }}
                  className="back-button"
                />
              </Link>
              <div className="store-heading">
                <p>Payments</p>
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
                    <th>Payments ID</th>
                    <th>Payments Method</th>

                    <th>Date</th>
                    <th>Actions</th>
                  </tr>
                  {/* <tr className="table-row">
                    <td>Payments ID</td>
                    <td>Payments Name</td>
                    <td>Payments Location</td>
                    <td>Payments Type</td>
                    <td>Contact Number</td>
                    <td>
                      <button>View</button>
                    </td>
                  </tr> */}

                  {payments_data &&
                    Array.isArray(payments_data) &&
                    payments_data.map((data: payments_data) => {
                      return (
                        <tr className="table-row">
                          <td>{data.payment_id}</td>
                          <td>{data.payment_method}</td>

                          <td>{data.payment_date}</td>
                          <td>
                            <button
                              onClick={() => goToPayment(data.payment_id)}
                              className="vButton"
                              style={{ margin: "2px" }}
                            >
                              View
                            </button>
                            <button
                              onClick={() => deleteStore(data.payment_id)}
                              className="dButton"
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
    payment_method: "",
  });
  const addUrl = "http://127.0.0.1:5000/add_payment";
  const [user, setUser] = useContext(usercontext);
  const addStore = async (
    e: MouseEvent<HTMLButtonElement, globalThis.MouseEvent>
  ) => {
    e.preventDefault();
    if (user.customer != 0 && user.customer != undefined) {
      try {
        const resp = await axios.post(addUrl, {
          customer_id: user.customer,
          payment_method: store.payment_method,
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
          <p style={{ fontWeight: "bold" }}>ADD new Payment</p>
          <button className="x_button" onClick={() => setShow(false)}>
            X
          </button>

          <form id="AddForm">
            <input
              type="text"
              placeholder="Payment Method"
              value={store.payment_method}
              onChange={(e) =>
                setStore({ ...store, payment_method: e.target.value })
              }
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

export default Payments;

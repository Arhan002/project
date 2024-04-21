import axios from "axios";
import { createContext, useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { usercontext } from "../../Context/User Details/User_details";
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

  useEffect(() => {
    getAllStores();
  }, []);
  return (
    <>
      <showContext.Provider value={[show, setShow]}>
        {show ? <AddStore /> : <>{console.log("error")}</>}
        <div className="main-container">
          <div className="sub-container">
            <div className="store-container">
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
                    <th>Payments Name</th>
                    <th>Payments Location</th>
                    <th>Payments Type</th>
                    <th>Contact Number</th>
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
                          <td>{data.amount}</td>
                          <td>{data.payment_date}</td>
                          <td>
                            <button
                              onClick={() => goToPayment(data.payment_id)}
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

export default Payments;

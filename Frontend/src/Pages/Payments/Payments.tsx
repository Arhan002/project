import { createContext, useContext, useState } from "react";
import "../Payments/Payments.css";

export const showContext = createContext<boolean | any>(false);

const Payments = () => {
  const [show, setShow] = useState(false);
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
                  <tr className="table-row">
                    <td>Payments ID</td>
                    <td>Payments Name</td>
                    <td>Payments Location</td>
                    <td>Payments Type</td>
                    <td>Contact Number</td>
                    <td>
                      <button>View</button>
                    </td>
                  </tr>
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
          <p>ADD new Store</p>
          <form>
            <input type="text" />
            <input type="text" />
            <button onClick={() => setShow(false)}>Submit</button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Payments;

import { createContext, useContext, useState } from "react";
import "../Products/Products.css";

type samp = {
  id: Number;
  name: String;
  location: String;
  type: String;
  number: Number;
  amount: number;
};

const showContext = createContext<boolean | any>(false);

const Products = () => {
  const [show, setShow] = useState(false);
  const sampData: samp[] = [
    {
      id: 1,
      name: "Soap",
      location: "HYD",
      type: "HouseHold",
      number: 6304260972,
      amount: 200,
    },
    {
      id: 2,
      name: "Soap",
      location: "HYD",
      type: "HouseHold",
      number: 6304260972,
      amount: 200,
    },
    {
      id: 3,
      name: "Soap",
      location: "HYD",
      type: "HouseHold",
      number: 6304260972,
      amount: 200,
    },
  ];

  let sum: number = Number.MIN_VALUE;

  const calcSum = (sampData: samp[]) => {
    sampData.map((data) => {
      sum = sum + data.amount;
    });
    return sum;
  };

  calcSum(sampData);

  return (
    <>
      <showContext.Provider value={[show, setShow]}>
        {show ? <AddStore /> : <>{console.log("error")}</>}
        <div className="main-container">
          <div className="sub-container">
            <div className="store-container">
              <div className="store-heading">
                <p>Products</p>
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
                    <th>Product ID</th>
                    <th>Product Name</th>
                    <th>Product Location</th>
                    <th>Product Type</th>
                    <th>Contact Number</th>
                    <th>Amount</th>
                  </tr>
                  <tr className="table-row">
                    <td>Product ID</td>
                    <td>Product Name</td>
                    <td>Product Location</td>
                    <td>Product Type</td>
                    <td>Contact Number</td>
                    <td>100</td>
                  </tr>
                </table>
                <div className="summation-container">
                  Total Payable Sum Amount : {sum}
                </div>
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

export default Products;

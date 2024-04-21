import axios from "axios";
import { createContext, useContext, useEffect, useState } from "react";
import { usercontext } from "../../Context/User Details/User_details";
import "../Products/Products.css";

type products_data = {
  product_id: number;
  product_name: string;
  category: string;
  price: number;
  quantity_available: number;
};

const url = "http://127.0.0.1:5000/get_products";

const showContext = createContext<boolean | any>(false);

const Products = () => {
  const [show, setShow] = useState(false);
  const [products_data, setProductsData] = useState<products_data[]>([]);
  const [user, setUser] = useContext(usercontext);

  const getAllStores = async () => {
    try {
      const resp = await axios.post(url, { payment_id: user.payment });
      const data = resp.data;
      setProductsData(data);
      console.log(data);
      console.log(user);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getAllStores();
  }, []);

  let sum: number = 0;

  const calcSum = (sampData: products_data[]) => {
    sampData.map((data) => {
      if (data.quantity_available > 1) {
        sum = sum + Number(data.price) * Number(data.quantity_available);
      } else {
        sum = sum + Number(data.price);
      }
    });
    return sum;
  };

  {
    products_data && calcSum(products_data);
  }

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
                    <th>Quantity</th>
                    <th>Product Type</th>
                    <th>Contact Number</th>
                    <th>Amount</th>
                  </tr>
                  {/* <tr className="table-row">
                    <td>Product ID</td>
                    <td>Product Name</td>
                    <td>Product Location</td>
                    <td>Product Type</td>
                    <td>Contact Number</td>
                    <td>100</td>
                  </tr> */}
                  {products_data &&
                    Array.isArray(products_data) &&
                    products_data.map((data: products_data) => {
                      return (
                        <tr className="table-row">
                          <td>{data.product_id}</td>
                          <td>{data.product_name}</td>
                          <td>{data.quantity_available}</td>
                          <td>{data.category}</td>
                          <td>{data.price}</td>
                          <td>
                            <button>View</button>
                            <button>delete</button>
                          </td>
                        </tr>
                      );
                    })}
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

export default Products;

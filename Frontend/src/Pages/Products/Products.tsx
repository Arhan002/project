import axios from "axios";
import {
  MouseEvent,
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";
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
  }, [show]);

  let sum: number = 0;

  const calcSum = (sampData: products_data[]) => {
    sampData &&
      Array.isArray(sampData) &&
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
  const deleteStore = async (id: number) => {
    try {
      const resp = await axios.delete(url + "/" + id);
      console.log("Delete");
    } catch (error) {
      console.log("error");
    }
  };

  return (
    <>
      <showContext.Provider value={[show, setShow]}>
        {show ? <AddStore /> : <>{}</>}
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
                            <button
                              onClick={() => deleteStore(data.product_id)}
                            >
                              delete
                            </button>
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
  const [store, setStore] = useState({
    product_name: "",
    category: "",
    price: 0,
    quantity: 0,
  });
  const addUrl = "http://127.0.0.1:5000/add_product";
  const [user, setUser] = useContext(usercontext);
  const addStore = async (
    e: MouseEvent<HTMLButtonElement, globalThis.MouseEvent>
  ) => {
    e.preventDefault();
    console.log(user);
    if (user.customer != 0 && user.customer != 0) {
      try {
        const resp = await axios.post(addUrl, {
          payment_id: user.payment,
          product_name: store.product_name,
          category: store.category,
          price: store.price,
          quantity: store.quantity,
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
          <p style={{ fontWeight: "bold" }}>ADD new Store</p>
          <button className="x_button" onClick={() => setShow(false)}>
            X
          </button>

          <form id="AddForm">
            <input
              type="text"
              placeholder="Product"
              value={store.product_name}
              onChange={(e) =>
                setStore({ ...store, product_name: e.target.value })
              }
            />
            <input
              type="text"
              placeholder="Category"
              value={store.category}
              onChange={(e) => setStore({ ...store, category: e.target.value })}
            />
            <input
              type="text"
              placeholder="Price"
              value={store.price > 0 ? store.price : undefined}
              onChange={(e) =>
                setStore({ ...store, price: Number(e.target.value) })
              }
            />
            <input
              type="text"
              placeholder="Quantity"
              value={store.quantity > 0 ? store.quantity : undefined}
              onChange={(e) =>
                setStore({ ...store, quantity: Number(e.target.value) })
              }
            />

            <button onClick={(e) => addStore(e)}>Submit</button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Products;

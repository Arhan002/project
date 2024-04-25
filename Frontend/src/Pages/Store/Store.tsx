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
import { useNavigate } from "react-router-dom";
import { usercontext } from "../../Context/User Details/User_details";
import "../Store/Store.css";

export const showContext = createContext<boolean | any>(false);

type store_data = {
  contact_number: string;
  location: string;
  store_id: number;
  store_name: string;
};

const url = "http://127.0.0.1:5000/get_store";

const Store = () => {
  const navigate = useNavigate();
  const toast = useRef<any>(null);
  const [show, setShow] = useState(false);
  const [store_data, setStoreData] = useState<store_data[]>([]);
  const [user, setUser] = useContext(usercontext);
  console.log(user);
  const getAllStores = async () => {
    try {
      const resp = await axios.post(url, { user_id: user.user });
      const data = resp.data;
      setStoreData(data);
      console.log(data);
    } catch (error) {
      console.log(error);
    }
  };

  const goToStore = (id: number, e: any) => {
    e.preventDefault();
    try {
      setUser({ ...user, store: id });
      if (user.store != 0 && user.store != undefined) {
        navigate("/store/Customers");
      }
    } catch (error) {
      console.log(error);
    }
  };

  const deleteStore = async (id: number) => {
    try {
      const resp = await axios.delete(url + "/" + id);
      toast.current.show({
        severity: "warning",
        summary: "Deleted",
        detail: "Please refresh",
      });
      console.log("Delete");
    } catch (error) {
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
              <div className="store-heading">
                <p>Stores</p>
                <button
                  className="add-store-button2"
                  onClick={() => setShow(true)}
                >
                  +
                </button>
              </div>

              <div className="table-container">
                <table className="table-main">
                  <tr>
                    <th>Store ID</th>
                    <th>Store Name</th>
                    <th>Store Location</th>

                    <th>Contact Number</th>
                    <th>Actions</th>
                  </tr>
                  {/* <tr className="table-row">
                    <td>Store ID</td>
                    <td>Store Name</td>
                    <td>Store Location</td>
                    <td>Store Type</td>
                    <td>Contact Number</td>
                    <td>
                      <button>View</button>
                    </td>
                  </tr> */}
                  {store_data &&
                    Array.isArray(store_data) &&
                    store_data.map((data: store_data) => {
                      return (
                        <tr className="table-row">
                          <td>{data.store_id}</td>
                          <td>{data.store_name}</td>
                          <td>{data.location}</td>

                          <td>{data.contact_number}</td>
                          <td>
                            <button
                              className="vButton"
                              onClick={(e) => goToStore(data.store_id, e)}
                              style={{ margin: "2px" }}
                            >
                              View
                            </button>
                            <button
                              className="dButton"
                              onClick={() => deleteStore(data.store_id)}
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
    // <>
    //   <AddStore />
    // </>
  );
};

const AddStore = () => {
  const [show, setShow] = useContext(showContext);
  const [store, setStore] = useState({
    store_name: "",
    location: "",
    contact: "",
  });
  const toast = useRef<any>(null);
  const addUrl = "http://127.0.0.1:5000/add_store";
  const [user, setUser] = useContext(usercontext);
  const addStore = async (
    e: MouseEvent<HTMLButtonElement, globalThis.MouseEvent>
  ) => {
    e.preventDefault();
    if (user.user != 0 && user.user != undefined) {
      try {
        const resp = await axios.post(addUrl, {
          user_id: user.user,
          store_name: store.store_name,
          location: store.location,
          contact: store.contact,
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
              placeholder="Store Name"
              value={store.store_name}
              onChange={(e) =>
                setStore({ ...store, store_name: e.target.value })
              }
            />
            <input
              type="text"
              placeholder="Store Location"
              value={store.location}
              onChange={(e) => setStore({ ...store, location: e.target.value })}
            />
            <input
              type="text"
              placeholder="Contact"
              value={store.contact}
              onChange={(e) => setStore({ ...store, contact: e.target.value })}
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

export default Store;

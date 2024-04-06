import "../Store/Store.css";
const Store = () => {
  return (
    <>
      <AddStore />
      <div className="main-container">
        <div className="sub-container">
          <div className="store-container">
            <div className="store-heading">
              <p>Stores</p>
              <button style={{ height: "80%" }} className="add-store-button2">
                +
              </button>
            </div>

            <div className="table-container">
              <table className="table-main">
                <tr>
                  <th>Store ID</th>
                  <th>Store Name</th>
                  <th>Store Location</th>
                  <th>Store Type</th>
                  <th>Contact Number</th>
                  <th>Actions</th>
                </tr>
                <tr className="table-row">
                  <td>Store ID</td>
                  <td>Store Name</td>
                  <td>Store Location</td>
                  <td>Store Type</td>
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
    </>
    // <>
    //   <AddStore />
    // </>
  );
};

const AddStore = () => {
  return (
    <div className="add-main-container">
      <div className="add-sub-container">
        <p>ADD new Store</p>
        <form>
          <input type="text" />
          <input type="text" />
          <button>Submit</button>
        </form>
      </div>
    </div>
  );
};

export default Store;

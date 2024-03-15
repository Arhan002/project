import { Button } from "primereact/button";
import "../Store/Store.css";
const Store = () => {
  return (
    <div className="main-container">
      <div className="sub-container">
        <div className="store-container">
          <div className="store-heading">
            <p>Stores</p>
            <Button
              size="small"
              style={{ height: "80%" }}
              className="add-store-button2"
            >
              +
            </Button>
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
                  <Button size="small">View</Button>
                </td>
              </tr>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Store;

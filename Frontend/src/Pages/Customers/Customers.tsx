import "../Customers/Customers.css";

const Customers = () => {
  return (
    <div className="main-container">
      <div className="sub-container">
        <div className="store-container">
          <div className="store-heading">
            <p>Customers</p>
            <button className="add-store-button">+</button>
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
              <tr className="table-row">
                <td>Customer ID</td>
                <td>Customer Name</td>
                <td>Customer Location</td>
                <td>Customer Type</td>
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
  );
};

export default Customers;

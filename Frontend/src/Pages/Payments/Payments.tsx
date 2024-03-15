import "../Payments/Payments.css";

const Payments = () => {
  return (
    <div className="main-container">
      <div className="sub-container">
        <div className="store-container">
          <div className="store-heading">
            <p>Payments</p>
            <button className="add-store-button">+</button>
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
  );
};

export default Payments;

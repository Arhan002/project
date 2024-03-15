import "../Products/Products.css";

const Products = () => {
  return (
    <div className="main-container">
      <div className="sub-container">
        <div className="store-container">
          <div className="store-heading">
            <p>Products</p>
            <button className="add-store-button">+</button>
          </div>
          <div className="table-container">
            <table className="table-main">
              <tr>
                <th>Product ID</th>
                <th>Product Name</th>
                <th>Product Location</th>
                <th>Product Type</th>
                <th>Contact Number</th>
                <th>Actions</th>
              </tr>
              <tr className="table-row">
                <td>Product ID</td>
                <td>Product Name</td>
                <td>Product Location</td>
                <td>Product Type</td>
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

export default Products;

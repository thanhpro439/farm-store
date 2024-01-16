import React, { useState } from 'react';
import './AddProduct.css';
import upload_area from '../../assets/upload_area.svg';

function AddProduct(props) {
  const [image, setImage] = useState(false);
  const imageUploadHandle = (e) => {
    setImage(e.target.files[0]);
  };

  const [productDetails, setProductDetails] = useState({
    name: '',
    image: '',
    category: '',
    new_price: '',
    old_price: '',
  });
  const onChangeHandle = (e) => {
    setProductDetails({ ...productDetails, [e.target.name]: e.target.value });
  };

  const Add_product = async () => {
    let resData;
    let product = productDetails;

    let formData = new FormData();
    formData.append('product', image);

    await fetch('http://localhost:4000/upload', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
      },
      body: formData,
    })
      .then((res) => res.json())
      .then((data) => (resData = data));

    if (resData.success) {
      product.image = resData.image_url;
      console.log('product: ', productDetails);
      await fetch('http://localhost:4000/addproduct', {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(product),
      })
        .then((res) => res.json())
        .then((data) =>
          data.success
            ? alert('Add product successfully.')
            : alert('Failed to add product. Please try again.')
        );
    }
  };

  return (
    <div className="addproduct">
      <div className="addproduct-itemfield">
        <p>Product title</p>
        <input
          value={productDetails.name}
          onChange={onChangeHandle}
          type="text"
          name="name"
          placeholder="Enter product title"
        />
      </div>

      <div className="addproduct-price">
        <div className="addproduct-itemfield">
          <p>Old Price</p>
          <input
            value={productDetails.old_price}
            onChange={onChangeHandle}
            type="text"
            name="old_price"
            placeholder="Enter old price"
          />
        </div>

        <div className="addproduct-itemfield">
          <p>New Price</p>
          <input
            value={productDetails.new_price}
            onChange={onChangeHandle}
            type="text"
            name="new_price"
            placeholder="Enter new price"
          />
        </div>
      </div>

      <div className="addproduct-itemfield">
        <p>Product category</p>
        <select
          value={productDetails.category}
          onChange={onChangeHandle}
          name="category"
          className="add-product-selector"
          id=""
        >
          <option value="women">Women</option>
          <option value="men">Men</option>
          <option value="kid">Kid</option>
        </select>
      </div>

      <div className="addproduct-itemfield">
        <label htmlFor="file-input">
          <img
            src={image ? URL.createObjectURL(image) : upload_area}
            className="add-product-thumb"
            alt=""
          />
        </label>
        <input
          type="file"
          name="image"
          id="file-input"
          accept="image/*"
          hidden
          onChange={imageUploadHandle}
        />
      </div>

      <button
        onClick={() => {
          Add_product();
        }}
        className="addproduct-btn"
      >
        Add
      </button>
    </div>
  );
}

export default AddProduct;

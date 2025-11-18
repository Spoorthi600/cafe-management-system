import React, { useEffect, useState } from 'react';
import axios from 'axios';

function MenuPage() {
  const [menuItems, setMenuItems] = useState([]);
  const [formData, setFormData] = useState({ name: '', price: '', category: '' });

  useEffect(() => {
    axios.get('http://localhost:5000/api/menu')
      .then(res => setMenuItems(res.data))
      .catch(err => console.error(err));
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    axios.post('http://localhost:5000/api/menu', formData)
      .then(() => {
        setFormData({ name: '', price: '', category: '' });
        axios.get('http://localhost:5000/api/menu')
          .then(res => setMenuItems(res.data));
      });
  };

  return (
    <div style={{ padding: '20px' }}>
      <h1>Cafe Menu</h1>
      <form onSubmit={handleSubmit}>
        <input name="name" value={formData.name} onChange={handleChange} placeholder="Item Name" required />
        <input name="price" value={formData.price} onChange={handleChange} placeholder="Price" required />
        <input name="category" value={formData.category} onChange={handleChange} placeholder="Category" required />
        <button type="submit">Add Item</button>
      </form>
      <ul>
        {menuItems.map(item => (
          <li key={item._id}>{item.name} - ₹{item.price} ({item.category})</li>
        ))}
      </ul>
    </div>
  );
}

export default MenuPage;
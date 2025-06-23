import React, { useState, useEffect } from 'react';
import { getDocs, collection, deleteDoc, doc } from 'firebase/firestore';
import { db } from '../../configrations/Firebase';
import "./Allitem.css";

export default function Categories() {
  const [selectedCategory, setSelectedCategory] = useState('');
  const [products, setProducts] = useState([]);

  const categories = [
    'Logo',
    'Thumbnail',
    'Banner',
    'Business Card',
    'Social Post',
    'All'
  ];

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, 'Projects'));
        const items = querySnapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        }));

        if (selectedCategory === 'all' || selectedCategory === '') {
          setProducts(items);
        } else {
          const filtered = items.filter(
            item => item.category?.toLowerCase() === selectedCategory.toLowerCase()
          );
          setProducts(filtered);
        }
      } catch (error) {
        console.error('Error fetching products:', error);
      }
    };

    fetchProducts();
  }, [selectedCategory]);

  const handleDelete = async (id) => {
    const confirm = window.confirm("Are you sure you want to delete this item?");
    if (!confirm) return;

    try {
      await deleteDoc(doc(db, 'Projects', id));
      setProducts(prev => prev.filter(item => item.id !== id));
    } catch (error) {
      console.error("Error deleting item:", error);
      alert("Failed to delete item.");
    }
  };

  const getGalleryClass = () => {
    switch (selectedCategory.toLowerCase()) {
      case 'logo': return 'logo-gallery';
      case 'banner': return 'b-gallery';
      case 'thumbnail': return 'thumb-gallery';
      case 'social post': return 'so-gallery';
      case 'business card': return 'logo-gallery';
      default: return 'logo-gallery';
    }
  };

  const getCardClass = () => {
    switch (selectedCategory.toLowerCase()) {
      case 'logo': return 'logo-card';
      case 'banner': return 'b-card';
      case 'thumbnail': return 'thumb-card';
      case 'social post': return 'so-card';
      case 'business card': return 'logo-card';
      default: return 'logo-card';
    }
  };

  return (
    <div style={{ textAlign: 'center' }}>
      <h3>Select a Category</h3>
      <select
        value={selectedCategory}
        onChange={(e) => setSelectedCategory(e.target.value)}
        style={{
          padding: '10px',
          fontSize: '16px',
          borderRadius: '8px',
          border: '1px solid #ccc',
          marginBottom: '30px'
        }}
      >
        <option value="">-- Choose --</option>
        {categories.map((cat) => (
          <option key={cat} value={cat.toLowerCase()}>{cat}</option>
        ))}
      </select>

      <div className={getGalleryClass()}>
        {products.length === 0 && selectedCategory && <p>No products found.</p>}
        {products.map(product => (
          <div key={product.id} className={`${getCardClass()} card-wrapper`}>
            <img src={product.image} alt="product" />
            <button
              className="permanent-delete-btn"
              onClick={() => handleDelete(product.id)}
            >
              Delete
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

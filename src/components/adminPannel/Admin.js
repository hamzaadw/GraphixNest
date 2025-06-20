import React, { useState } from 'react';
import './AdminPanel.css';
import { db } from '../../configrations/Firebase';
import { collection, addDoc } from "firebase/firestore";
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";
import Swal from 'sweetalert2';

export default function Admin() {
  const [formData, setFormData] = useState({
    image: '',
    Name: '',
    description: '',
    category: '',
  });

  const [url, setUrl] = useState("");
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === "image" && files.length > 0) {
      const file = files[0];
      setFormData({ ...formData, image: file });
      setUrl(URL.createObjectURL(file));
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { image, Name, description, category } = formData;

    if (!image || !Name || !description || !category) {
      setError('Please fill out all fields');
      return;
    }

    setLoading(true);
    setError('');

    try {
      const storage = getStorage();
      const imageRef = ref(storage, `products/${image.name}`);
      await uploadBytes(imageRef, image);

      const downloadURL = await getDownloadURL(imageRef);
      const docRef = await addDoc(collection(db, "Projects"), {
        Name,
        description,
        category,
        image: downloadURL,
      });

      console.log("Document written with ID: ", docRef.id);

      setFormData({ image: '', Name: '', description: '', category: '' });
      setUrl("");

      Swal.fire({
        icon: 'success',
        title: 'Success!',
        text: 'Form submitted successfully.',
        confirmButtonColor: '#3085d6'
      });
    } catch (error) {
      console.error("Error submitting form:", error);
      setError('Something went wrong. Please try again.');
    }

    setLoading(false);
  };

  return (
    <div className="admin-container">
      <h2>Admin Panel</h2>
      <form onSubmit={handleSubmit} className="admin-form">
        <input type="file" name="image" onChange={handleChange} />
        <input type="text" name="Name" placeholder="Name" value={formData.Name} onChange={handleChange} />
        <textarea name="description" placeholder="Description" rows="4" value={formData.description} onChange={handleChange} />
        <select name="category" value={formData.category} onChange={handleChange}>
          <option value="">Select Category</option>
          <option value="Logo">Logo</option>
          <option value="Overlay">Overlay</option>
          <option value="Banner">Banner</option>
          <option value="Social Post">Social Post</option>
          <option value="Business Card">Business Card</option>
          <option value="Thumbnail">Thumbnail</option>
        </select>

        {error && <p className="error">{error}</p>}

        <button type="submit" disabled={loading}>
          {loading ? <span className="loader"></span> : 'Submit'}
        </button>
      </form>

      {url && (
        <div className="image-preview">
          <p>Image Preview:</p>
          <img src={url} alt="Preview" width="200" />
        </div>
      )}
    </div>
  );
}

import React, { useState } from 'react';
import './AdminPanel.css';
import { db } from '../../configrations/Firebase';
import { collection, addDoc } from "firebase/firestore";
import { getStorage, ref, uploadBytes } from "firebase/storage";
import { getDownloadURL } from "firebase/storage";

export default function Admin() {



  const [formData, setFormData] = useState({
    image: '',
    logoName: '',
    description: '',
    category: '',
  });

  const [url, seturl] = useState("")

  const [error, setError] = useState('');

  const handleChange = (e) => {

    const { name, value, files } = e.target;
    const checkImage = name == "image"
    if (checkImage && checkImage != "") {
      const file = files[0]
      setFormData({ ...formData, image: files[0] }); // store file object
      seturl(URL.createObjectURL(file))


    }
    else {
      setFormData({ ...formData, [name]: value })
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const { image, Name, description, category } = formData;

    if (!image || !Name || !description || !category) {
      setError('Please fill out all fields');
      return;
    }


    
    
    try {
      const storage = getStorage();
      const imageRef = ref(storage, `products/${image.name}`); 
      await uploadBytes(imageRef, image);
      console.log('Uploaded a blob or file!');


       const downloadURL = await getDownloadURL(imageRef);
       
       const docRef = await addDoc(collection(db, "Projects"), {
      Name,
      description,
      category,
      image: downloadURL, 
    });
    console.log("Document written with ID: ", docRef.id);
    alert('Form submitted successfully!');
    setFormData({ image: '', Name: '', description: '', category: '' });
    seturl("")



    } catch (error) {
      console.error("Error submitting form:", error);
    setError('Something went wrong. Please try again.');
    }









    console.log('Submitted Data:', formData);
    setError('');
    alert('Form submitted successfully!');
    imageUrlMaker(image)

    // const docRef = await addDoc(collection(db, "Projects"), {
    //   logoName,
    //   description,
    //   category,
    //   image: ""
    // });
    // console.log("Document written with ID: ", docRef.id);




  };


  const imageUrlMaker = async (image) => {

    console.log(image)
    const storage = getStorage();
    const imageRef = ref(storage, `products/${image.name}`); // give file a unique name


    try {
      await uploadBytes(imageRef, image);
      console.log('Uploaded a blob or file!');
    } catch (error) {
      console.error("Upload failed:", error);
    }
  }










  return (
    <div className="admin-container">
      <h2>Admin Panel</h2>
      <form onSubmit={handleSubmit} className="admin-form">
        <input
          type="file"
          name="image"
          placeholder="ImageFile"

          onChange={handleChange}
        />
        <input
          type="text"
          name="Name"
          placeholder=" Name"
          value={formData.Name}
          onChange={handleChange}
        />
        <textarea
          name="description"
          placeholder="Description"
          rows="4"
          value={formData.description}
          onChange={handleChange}
        ></textarea>
        <select
          name="category"
          value={formData.category}
          onChange={handleChange}
        >
          <option value="">Select Category</option>
          <option value="Logo">Logo</option>
          <option value="Overlay">Overlay</option>
          <option value="Banner">Banner</option>
          <option value="Social Post">Social Post</option>
          <option value="Business Card">Business Card</option>
          <option value="Thumbnail">Thumbnail</option>
        </select>
        {error && <p className="error">{error}</p>}
        <button type="submit">Submit</button>
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

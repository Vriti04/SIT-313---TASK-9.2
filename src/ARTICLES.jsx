import React, { useEffect, useState } from 'react';
import { db, storage } from './firebase';
import { collection, getDocs, addDoc } from 'firebase/firestore';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { v4 } from 'uuid';

//managing various state variables
function ARTICLES() {
  //stores selected images
  const [imageUpload, setImageUpload] = useState(null);
  //title
  const [newTitle, setnewTitle] = useState('');
  //1-paragraph abstract
  const [newAbstract, setNewAbs] = useState('');
  //stores article text
  const [Art_text, setArt_Text] = useState('');
  //up to 3 tags
  const [setTags, setNewTags] = useState('');
  //array to store data from firestore collection
  const [users, setUsers] = useState([]);
  //creates a firestore collection reference using 'collection' to 'article' collection
  const usersCollectionRef = collection(db, 'Article');

  //to upload seleted image in firebase 'storage'. generates a unique image path using 'v4' from uuid library, uploads to storage , then retrieves the download URL.
  //the URL is stored in imageUrl 
  const uploadImage = () => {
    if (imageUpload == null) return;

    const ImageRef = ref(storage, `images/${imageUpload.name + v4()}`);
    uploadBytes(ImageRef, imageUpload).then((snapshot) => {
      getDownloadURL(snapshot.ref).then((downloadURL) => {
        const imageUrl = downloadURL;

        const articleData = {
          Title: newTitle,
          Abstract: newAbstract,
          ArticleText: Art_text,
          Tags: setTags,
          ImageUrl: imageUrl,
        };

        addDoc(usersCollectionRef, articleData)
          .then(() => {
            alert('Article and image uploaded successfully');
          })
          .catch((error) => {
            console.error('Error adding document: ', error);
          });
      });
    });
  };

  //add document to the firestore collection. Includes title, abstract, article text, tags, but the URL for image is uploaded seperate so not here
  const createUser = async () => {
    await addDoc(usersCollectionRef, {
      Title: newTitle,
      Abstract: newAbstract,
      ArticleText: Art_text,
      Tags: setTags,
      
    });
  };

  //populates the 'users; state variable
  useEffect(() => {
    const getUsers = async () => {
      const data = await getDocs(usersCollectionRef);
      setUsers(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
    };
    getUsers();
  }, []);
    
  return (
       <>
      <h2 className = "h2">WHAT DO YOU WANT TO ASK AND SHARE</h2>

      
        <div className="all">
        <div className="q">Title:</div> <input className="title" placeholder = "Enter a descriptive title" onChange={(event)=>{
            setnewTitle(event.target.value)
        }}/>
        <br></br>

        <div>
      Add an Image: <input type="file" onChange={(event)=>{
        setImageUpload(event.target.files[0])
      }}/>
    </div>

    <div>
    <button onClick={uploadImage}>Add Image</button>
    </div>

<br></br>
        <div className="q">Abstract:</div>
       
        <input className ="abstract" placeholder = "Enter a 1-paragraph abstract" onChange={(event)=>{
            setNewAbs(event.target.value)
        }}/>
       <br></br>
      <div className="q">Article Text: </div> <input className = "text"placeholder = "Enter a 1-paragraph abstract"/>
       <br></br>
       <div className="q">Tags:</div> <input className = "tags" placeholder = "Please add up to 3 tags to describe what your question is about e.g., Java" onChange={(event)=>{
        setNewTags(event.target.value)
       }}/>

        <div>
        <button onClick={createUser} className="button">Post</button>
        </div>

       </div>
        </>
    
  );
}

export default ARTICLES

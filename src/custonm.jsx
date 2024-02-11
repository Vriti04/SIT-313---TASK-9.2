import Image from './UploadImage';
import { db } from './firebase';
import React, { useState } from 'react';
import { collection, addDoc } from 'firebase/firestore';
import SyntaxHighlighter from 'react-syntax-highlighter';
import { docco } from 'react-syntax-highlighter/dist/esm/styles/hljs';

function CustomBar() {
  const [title, setTitle] = useState('');
  const [desc, setDesc] = useState('');
  const [tag, setTag] = useState('');
  const [timestamp, setTimestamp] = useState('');
  const [code,mirrorCode] = useState("");
  const userCollectionRef = collection(db, 'questions');

  const writeUserData = async () => {
    const parsedTimestamp = new Date(timestamp);
    if (isNaN(parsedTimestamp.getTime())) {
      alert('Invalid Timestamp. Please enter a valid date and time.');
      return;
    }
    await addDoc(userCollectionRef, {
      title: title,
      desc: desc,
      tag: tag,
      date: parsedTimestamp, // Use the parsed timestamp
      code: code,
    }).then(() => {
      alert('Data Uploaded!');
    });
  };

  return (
    <>
      <div className='articleHeader'>
        <h2>What do you want to share or ask?</h2>
        <div className='img'>
          <h3>Add an image:</h3>
          <Image />
        </div>
        <div className='title'>
          <label>Title:</label>
          <input type='text' placeholder='Start your question with how, what, why, etc.' onChange={(event) => setTitle(event.target.value)} />
        </div>
        <div className='Description'>
          <label>Description:</label>
          <input type='text' placeholder='Describe your Problem' onChange={(event) => setDesc(event.target.value)} />
        </div>
        <div>
      <label className='Code'>Code</label> 
          <textarea name="code" className='codetext' id="" cols="30" rows="10" onChange={(event) => mirrorCode(event.target.value)} />
          <SyntaxHighlighter language="javascript" style={docco}>
          {code}
          </SyntaxHighlighter>
      </div>
        <div className='Tag'>
          <label>Tags:</label>
          <input type='text' placeholder='Please add up to 3 tags to describe what your question is about e.g., Java' onChange={(event) => setTag(event.target.value)} />
        </div>
        <div className='Timestamp'>
          <label>date:</label>
          <input type='datetime-local' onChange={(event) => setTimestamp(event.target.value)} />
        </div>
        <button onClick={writeUserData} className='Button'>
          Post
        </button>
      </div>
    </>
  );
}

export default CustomBar;
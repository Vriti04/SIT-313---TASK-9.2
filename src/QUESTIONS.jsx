import React from "react";
import { useEffect, useState } from "react";
import { db } from "./firebase";
import { collection, getDocs, addDoc } from "firebase/firestore";




function Questions() {
  const [newDate, setNewDate] = useState(0);
  const [newDesc, setNewDesc] = useState("");
  const [setTitle, setNewTitle] = useState("");
  const [setTag, setNewTag] = useState("");
  const [users, setUsers] = useState([]);

  //creates a firestore collection 'reference' using firebase's cloud firestore
  //collection- a function provided by firebase firestore that is used to create a 'reference' to a specific collection in firestore database. here-question
  //this would allow us to perform actions on the accessed collection - like adding, retrieving, updating documents in that collections
  //addDoc , getDocs, updateDocs- functions we can perform as mentioned above in a more technical way
  const usersCollectionRef = collection(db, "question");

  //adding document to the 'question' collection of the firebase with the newDesc etc values
  const createUser = async () => {
    await addDoc(usersCollectionRef, {
      desc: newDesc,
      title: setTitle,
      tag: setTag,
      date: newDate,
    });
  };

  //uses useEffect hook to fetch the questions from Firestore collection when component is mounted.
  //questions are fetched and stored in 'users' state variable which ensures that the component displays the existing questions when it's first loaded
  useEffect(() => {
    const getUsers = async () => {
      const data = await getDocs(usersCollectionRef); //to retrieve all documents from firestore collection referenced by 'usersCollectionRef', then returns a 'QuerySnapshot' object
      //setUsers- function used to update state
      setUsers(data.docs.map((doc) => ({ ...doc.data(), id: doc.id }))); //documents retrieved are ,apped using map function.
      // For each document in the snapshot, it creates a new object using the document's data and assigns a unique id property based on the document's ID. This transformed data is then set in the users state variable.
    };
    //the getUsers function is called immediately to initiate the data retrieval process when the component is mounted.
    getUsers();
  }, []);

  //read:
  // A QuerySnapshot object is a part of Firebase's Cloud Firestore API and is returned when you perform a query to retrieve documents from a Firestore collection. It represents a snapshot of the results of a query and contains an array of QueryDocumentSnapshot objects, each of which represents a document that matches the query.

  return (
    <>
      <h2 className="h2">WHAT DO YOU WANT TO ASK AND SHARE</h2>

      <div className="all">
        <div className="q">Title: </div>
        <br></br>
        <input
          className="title"
          placeholder="Enter a descriptive title"
          onChange={(event) => {
            setNewTitle(event.target.value);
          }}
        />

        <br></br>
        <div className="q">Describe your problem: </div>
        <br></br>
        <input
          className="problem"
          onChange={(event) => {
            // This is an event handler that listens for changes in the input field. When the user types or modifies the content in the input field, this function is called. It takes the event object as a parameter and updates the newTitle state variable by setting it to the current value of the input field (event.target.value). This ensures that the component's state reflects the user's input as they type.
            setNewDesc(event.target.value);
          }}
        />

        <br></br>


        <div>
          <label>Date:</label>
          <input
            type="date"
            placeholder="Enter Date"
            onChange={(event) => {
              setNewDate(event.target.value);
            }}
          />
        </div>



        <div className="q">Tags: </div>


        <input
          className="tags"
          placeholder="Please add up to 3 tags to describe what your question is about e.g., Java"
          onChange={(event) => {
            setNewTag(event.target.value);
          }}
        />

        <div>
          <button onClick={createUser} className="button">
            Post
          </button>
        </div>
      </div>
    </>
  );
}

export default Questions;

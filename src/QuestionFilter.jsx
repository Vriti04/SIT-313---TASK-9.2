import React, { useState, useEffect } from 'react';
import { db } from './firebase';
import { collection, getDocs,addDoc,deleteDoc,doc } from 'firebase/firestore';


function FindQuestion() {
  const [filterDate, set_NEW_FilterDate] = useState("");
  const [questions, setQuestions] = useState([]);
  const [TitleFilter, setTitle] = useState('');
  const [Filter_Tags, setFilter_Tags] = useState('');
  const [Expand_Index, setExpandedIndex] = useState(null);

  const userQuestionsRef = collection(db, 'question');
  const [filteredQuestions, setFilteredQuestions] = useState([]);

  useEffect(() => {
    const getQuestions = async () => {
      const data = await getDocs(userQuestionsRef);
      const questionData = data.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
      setQuestions(questionData);
      setFilteredQuestions(questionData); 
    };
    getQuestions();
  }, []);

  const handleFilter = () => {
    const filteredQuestions = questions.filter(
      (question) =>
        question.title.toLowerCase().includes(TitleFilter.toLowerCase()) &&
        question.tag.toLowerCase().includes(Filter_Tags.toLowerCase())
        
    );
    const dateMatch =
    filterDate === "" ||
    (questions.date && questions.date.includes(filterDate));
    setFilteredQuestions(filteredQuestions);
  };

  const Handle_Deleted_Question = async (id) => {
    const Updated_Questions = filteredQuestions.filter((question) => question.id !== id);
    setFilteredQuestions(Updated_Questions);
  };
  const handleExpand = (index) => {
    setExpandedIndex(index === Expand_Index ? null : index);
  };

  return (
    <div>
      <h1>Filter Questions</h1>
      <div className='filter'>
        <h5>Title:</h5>
        <input
          type="text"
          placeholder="Filter by title"
          value={TitleFilter}
          onChange={(e) => setTitle(e.target.value)}
        />

        <h5>Tag:</h5>
        <input
          type="text"
          placeholder="Filter by tags"
          value={Filter_Tags}
          onChange={(e) => setFilter_Tags(e.target.value)}
        />
        <h5>Date:</h5>
        <input
          type="date"
          placeholder="Filter by date"
          value={filterDate}
          onChange={(e) => set_NEW_FilterDate(e.target.value)}
        />
        <button onClick={handleFilter}>Filter</button>
      </div>
      <h1>Questions</h1>
      {filteredQuestions.map((question, index) => (
        <div className="card" key={question.id}>
          <h2>Question: {index + 1}</h2> 
          <h2>Title: {question.title}</h2>
          
          <button onClick={() => Handle_Deleted_Question(question.id)}>Delete</button>
          <button onClick={() => handleExpand(index)}>
            {Expand_Index === index ? 'Collapse' : 'Expand'}
          </button>
          {Expand_Index === index && (
            <div>
              <h3>More Details:</h3>
              <p>Description: {question.desc}</p>
              <p>Tag: {question.tag}</p>
              <p>Date: {question.date}</p>
            </div>
          )}
        </div>
      ))}
    </div>
  );
}

export default FindQuestion;
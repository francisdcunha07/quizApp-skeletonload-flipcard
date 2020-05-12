import React, { useState, useEffect, useContext, useRef } from 'react';
import './App.css';
import Question from './Container/Question/Question';
import axiosInstance from './axios-order'
import { CountContext } from './Context/ContextApi';
import Skeleton from "react-loading-skeleton";


function App() {
  const [questions, setQuestion] = useState([]);
  const [category, setCategory] = useState([]);
  const [countQtn, setCountQtn] = useState(0);
  const { count, setCount, setInitialFlip } = useContext(CountContext);
  const [loading, setLoading] = useState(false);

  // Skeleton component
  const CardSkeleton = () => {
    return (
      <section>

        <ul className="list">
          {Array(12)
            .fill()
            .map((item, index) => (
              <li className="cardload" key={index}>

                <h4 className="cardload-title">
                  <Skeleton height={30} width={`90%`} />
                </h4>

                <div className="cardload-metrics">
                  <Skeleton width={`80%`} />
                </div>
                <div className="cardload-metrics">
                  <Skeleton width={`80%`} />
                </div>
                <div className="cardload-metrics">
                  <Skeleton width={`80%`} />
                </div>
                <div className="cardload-metrics">
                  <Skeleton width={`80%`} />
                </div>


              </li>
            ))}
        </ul>
      </section>
    );
  };


  const categoryEl = useRef();
  const levelEl = useRef();
  const submitEl = useRef();

  useEffect(() => {
    axiosInstance.get('api_category.php').then(result => {
      setCategory(result.data.trivia_categories);
    })
  }, [])



  const submitHandler = (e) => {
    e.preventDefault();
    setLoading(true);
    axiosInstance.get('api.php', { params: { amount: 12, category: categoryEl.current.value, difficulty: levelEl.current.value } })
      .then(result => {
        setTimeout(() => {
          setInitialFlip(false)
          setCount(1);
          setQuestion(result.data.results.map((question, i) => {
            const answer = decodeStr(question.correct_answer);
            const options = [...question.incorrect_answers.map(opt => decodeStr(opt)), answer]
            return {
              id: i + Date.now().toString(),
              question: decodeStr(question.question),
              options: options.sort(() => Math.random() - 0.5),
              answer: answer
            }
          }))
          setCountQtn(result.data.results.length);
          setLoading(false);
        }, 2000);
      })
  }

  function decodeStr(str) {
    const textArea = document.createElement('textArea');
    textArea.innerHTML = str;
    return textArea.value;
  }


  return (

    <div className="App">
      <div className="header">
        <form onSubmit={(e) => submitHandler(e)}>
          <div className="group">
            <label htmlFor="category">Category</label>
            <select id="category" ref={categoryEl}>
              {category.map((cat, i) => {
                return <option key={cat.id} value={cat.id}>{cat.name}</option>
              })}
            </select>
          </div>
          <div className="group">
            <label htmlFor="level">Select Level</label>
            <select id="level" ref={levelEl}>
              <option value="easy">Easy</option>
              <option value="medium">Medium</option>
              <option value="hard">Hard</option>
            </select>
          </div>
          <div className="group">
            <button className="btn" ref={submitEl}>Submit</button>
          </div>
        </form>
      </div>
      {loading && <CardSkeleton />}
      {!loading &&
        (<div className="container">
          <div className="card-grid">
            {questions.map(question => {
              return <Question key={question.id} question={question} totalQtn={countQtn} />
            })}
          </div>
        </div>
        )
      }
    </div>

  );
}

export default App;

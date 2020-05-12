import React, { useState, useEffect, useRef, useContext } from 'react';
import { CountContext } from '../../Context/ContextApi';

const Question = (props) => {
    const { question, totalQtn } = props;
    const { setCount, initialFlip, setInitialFlip, count } = useContext(CountContext);
    
    const [flip, setFlip] = useState(false);
    const [height, setHeight] = useState('initial');
    const [setAns, setselectedAns] = useState(false);
    const [answr, setAnswer] = useState('');
    const [idSel, seletedID] = useState('');
    // const [count, setCount] =useState('')
    const frontEl = useRef();

    const optionHandler = (e, ans) => {

    }

    function setMaxHeight() {
        const frontHt = frontEl.current.getBoundingClientRect().height;
        setHeight(Math.max(frontHt, 150));
    }

    useEffect(setMaxHeight, [question.question, question.options])

    useEffect(() => {
        window.addEventListener('resize', setMaxHeight);
        return () => window.removeEventListener('resize', setMaxHeight)
    }, [])

    const checkSelectedAns = (e, ans, option, id) => {
        if (ans === option) {
            setAnswer(true)
        } else {
            setAnswer(false)
        }
        setCount(count + 1);
        seletedID(id);
        setselectedAns(true);

        if (count === totalQtn) setInitialFlip(true);
    }

    const flipHandler = () => {
        if (initialFlip) setFlip(!flip)
    }

    return (
        <div className={`card  ${flip ? 'flip' : ''}`}  style={{ height: height }} onClick={flipHandler}>
            <div className="front" ref={frontEl} ><div className="qtn">{question.question}</div>
                <div className="options">
                    {question.options.map((option, i) => {
                        const optionID = i + question.id;
                        return <div key={option} style={!setAns && setAns == '' ? { pointerEvents: 'auto' } : { pointerEvents: 'none' }} id={optionID} className={`option txt-overflow ${!setAns ? '' : idSel == optionID ? setAns && answr ? 'correct' : 'wrong' : ''}`}
                            onClick={(e) => checkSelectedAns(e, question.answer, option, optionID)} > {option}</div>
                    })}
                </div>
            </div>
            <div className="back">{question.answer}</div>

        </div>
    );
}

export default Question;
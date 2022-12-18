import { useState, useEffect, useRef } from "react";
import styled from "styled-components";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router";
import { useParams } from 'react-router-dom'
import { clearErrors } from "../Redux/UserRed/Actions";
import { getTopicDetails } from "../Redux/TopicRed/Actions";
import TextBlock from "../Components/TextBlock";

const ViewArticleStyle = styled.div`
    width: 80%;
    height: fit-content;
    min-height: 50vh;
    margin: 2rem auto;
    padding: 2rem 3rem;
    background-color: #FFF;
    box-shadow: rgba(100, 100, 111, 0.2) 0px 7px 29px 0px;
    display: flex;
    flex-direction: column;
    gap: 3rem;
    align-items: center;

    input{
        width: 90%;
        height: 5vh;
        padding-left: 1rem;
        font-size: 2rem;
        font-weight: 500;
        border: none;
        outline: none;
        transition: border 0.2s ease-in;

        &:focus{
            border-bottom: 2px solid #00C37A;
        }
    }

    .desc{
        width: 90%;
        padding: 1rem;
        word-break: break-all;
    }
    
    .btn-div{
        width: 90%;
        display: flex;
        justify-content: space-between;

        button{
            height: 3rem;
            width: fit-content;
            padding: 0 3rem;
            color: white;
            background-color: #0cadab;
            border: none;
            border-radius: 5px;
            font-size: 1.2rem;
            font-weight: normal;
            transform: scale(1);
            transition: all 0.3s ease-in-out;
            display: flex;
            gap: 1rem;
            align-items: center;

            &:hover{
                background-color: #00c3c0;
                transform: scale(1.05);
            }
        }

        button:nth-child(2){
            background-color: #353535;
        }
    }
    button{
        height: 3rem;
        width: fit-content;
        padding: 0 3rem;
        color: white;
        background-color: #0cadab;
        border: none;
        border-radius: 5px;
        font-size: 1.2rem;
        font-weight: normal;
        transform: scale(1);
        transition: all 0.3s ease-in-out;
        display: flex;
        gap: 1rem;
        align-items: center;

        &:hover{
            background-color: #00c3c0;
            transform: scale(1.05);
        }
    }
`

function ViewArticle() {
    const navigate = useNavigate();
    const { id } = useParams();
    const dispatch = useDispatch();
    const { topic, loading, error } = useSelector(state => state.topic);
    const [title, setTitle] = useState("");

    useEffect(() => {
        if (error) {
            alert(error);
            dispatch(clearErrors());
        }
        dispatch(getTopicDetails(id));

    }, [dispatch, error, id])

    return (
        <ViewArticleStyle>
            <input type="text" placeholder="Add Title" value={topic[0]?.topic} onChange={(e) => setTitle(e.target.value)} />
            <div className="desc">
                {topic[0]?.description && topic[0]?.description.map((el, ind) => {
                    return <TextBlock key={ind} id={topic[0]?._id} index={ind} desc={topic[0]?.description} value={el.category} text={el.content} />
                })}
            </div>
            <button onClick={() => {
                navigate('/dashboard');
            }}>Save and Back</button>
        </ViewArticleStyle>
    )
}

export default ViewArticle;
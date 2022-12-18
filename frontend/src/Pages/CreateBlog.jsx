import { useState, useEffect } from "react";
import styled from "styled-components";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router";
import { CreateTopic } from "../Redux/TopicRed/Actions";
import { clearErrors } from "../Redux/UserRed/Actions";
import { CREATE_TOPIC_RESET } from "../Redux/TopicRed/ActionTypes";

const CreateBlogPageStyle = styled.div`
    width: 80%;
    height: fit-content;
    min-height: 80vh;
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
        font-size: 1.6rem;
        font-weight: 500;
        border: none;
        outline: none;
        transition: border 0.2s ease-in;

        &:focus{
            border-bottom: 2px solid #00C37A;
        }
    }
    textarea{
        width: 90%;
        height: fit-content;
        min-height: 50vh;
        padding: 1.5rem 1rem;
        font-size: 1.2rem;
        font-weight: 400;
        border-radius: 10px;
        border: none;
        box-shadow: rgba(100, 100, 111, 0.2) 0px 7px 29px 0px;

        &::-webkit-scrollbar{
            width: 5px;
        }
        &:focus{
            outline: 2px solid #00C37A;
        }
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
`

function CreateBlogPage() {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");

    const { loading, error, success } = useSelector(state => state.newTopic);

    const SaveArticle = () => {
        dispatch(CreateTopic(title, description)).then(() => {
            alert("Article created successfully");
            dispatch({ type: CREATE_TOPIC_RESET });
            navigate('/dashboard');
        })
    }

    useEffect(() => {
        console.log(loading, error, success);
        if (error) {
            alert(error);
            dispatch(clearErrors());
        }
    }, [dispatch, error, success, SaveArticle])


    return (
        <CreateBlogPageStyle>
            <input type="text" placeholder="Add Title" onChange={(e) => setTitle(e.target.value)} />
            <textarea placeholder="Add the description here." onChange={(e) => setDescription(e.target.value)} />
            <div className="btn-div">
                <button onClick={() => {
                    SaveArticle();
                }}>Save</button>
                <button onClick={() => {
                    if (window.confirm("Are you sure you want to leave this page? Content written will not be saved.")) {
                        window.open("/dashboard", "Thanks for visiting!")
                    }
                }}>Cancel</button>
            </div>
        </CreateBlogPageStyle>
    )
}

export default CreateBlogPage;
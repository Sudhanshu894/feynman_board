import { useEffect } from "react";
import styled from "styled-components";
import { useNavigate } from "react-router";
import { useDispatch, useSelector } from 'react-redux'
import { deleteTopic, getAllTopicsList } from '../Redux/TopicRed/Actions';
import { clearErrors } from "../Redux/TopicRed/Actions";
import { DELETE_TOPIC_RESET } from "../Redux/TopicRed/ActionTypes";

const TopicListStyles = styled.div`
    width: 80%;
    min-width: 350px;
    height: 80%;
    margin: 2rem auto;
    background-color: #FFF;
    display: flex;
    flex-direction: column;
    gap: 2rem;
    padding: 2rem;
    overflow: auto;

    &::-webkit-scrollbar{
        width: 5px;
    }

    .card{
        border: 1px solid red;
        width: 100%;
        height: fit-content;
        background-color: transparent;
        perspective: 1000px;
        cursor: pointer;
        margin-bottom: 2rem;

        .card-inner{
            position: relative;
            width: 100%;
            height: 100%;
            transition: transform 0.8s;
            transform-style: preserve-3d;

            .card-front,.card-back{
                position: absolute;
                width: 100%;
                height: 100%;
                -webkit-backface-visibility: hidden;
                backface-visibility: hidden;
            }

            .card-front{
                background-color: #FFF;
                box-shadow: rgba(100, 100, 111, 0.2) 0px 7px 29px 0px;
                display: flex;
                padding: 1rem;
                align-items: center;
                justify-content: space-between;
            }

            .card-back{
                background-color: #FFF;
                padding: 1rem;
                display: flex;
                align-items: center;
                justify-content: center;
                gap: 2rem;
                transform: rotateY(180deg);

                button{
                    border: none;
                    background-color: teal;
                    font-size: 1.1rem;
                    padding: 0.2rem 1rem;
                    color: white;
                    border-radius: 5px;
                }
            }
        }
        &:hover .card-inner{
            transform: rotateY(180deg);
        }
    }

    @keyframes bounce{
        0%{
            transform: translateY(4px);
        }
        50%{
            transform: translateY(-2px)
        }
        75%{
            transform: translateY(2px);
        }
        100%{
            transform: translateY(0px);
        }
    }
`

function TopicsList() {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const { loading, error, topics } = useSelector(state => state.topics);

    const { error: deleteError, isDeleted } = useSelector(state => state.uptopic);

    const DeleteTopicHandler = (id) => {
        dispatch(deleteTopic(id));
    }

    useEffect(() => {
        if (error) {
            alert(error);
            dispatch(clearErrors());
            return;
        }
        if (deleteError) {
            alert(`Delete Error: ${deleteError}`);
        }
        if (isDeleted) {
            dispatch({ type: DELETE_TOPIC_RESET });
            alert(`Topic Deleted Successfully`);
        }
        dispatch(getAllTopicsList());
    }, [error, dispatch, deleteError, isDeleted])
    return (
        <>
            {loading ? <h1 style={{ marginTop: '2rem' }}>loading...</h1> : <TopicListStyles>
                {topics && topics.map((el) => {
                    return <div className="card">
                        <div className="card-inner">
                            <div className="card-front">
                                <p>{el.topic}</p>
                                <p>{`${el.score}%`}</p>
                            </div>
                            <div className="card-back">
                                <button onClick={() => {
                                    navigate(`/topic/${el._id}`)
                                }}>View</button>
                                <button onClick={() => { DeleteTopicHandler(el._id) }}>Delete</button>
                            </div>
                        </div>
                    </div>
                })}

            </TopicListStyles>}
        </>
    )
}

export default TopicsList;
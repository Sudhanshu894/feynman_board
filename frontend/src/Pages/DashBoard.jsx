import React from 'react';
import styled from "styled-components";
import { useNavigate } from 'react-router';
import TopicsList from '../Components/AllTopics';

const DashBoardStyles = styled.div`
    width: 80%;
    height: 60vh;
    margin: 2rem auto;
    padding: 2rem;
    border-radius: 10px;
    background-color: #FFF;
    box-shadow: rgba(100, 100, 111, 0.2) 0px 7px 29px 0px;
    display: flex;
    flex-direction: column;
    align-items: center;
    
    .add_topic{
        height: 3rem;
        width: fit-content;
        padding: 0 2rem;
        color: white;
        background-color: #20dcd9;
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
        span:nth-child(1){
            font-size: 2rem;
        }
    }
`

function DashBoard() {
    const navigate = useNavigate();

    return (
        <DashBoardStyles>
            <button className='add_topic' onClick={() => {
                navigate('/addtopic');
            }}><span>+</span> <span>Add Topic</span></button>
            <TopicsList />
        </DashBoardStyles>
    )
}

export default DashBoard;
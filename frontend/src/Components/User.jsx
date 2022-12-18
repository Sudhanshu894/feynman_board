import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import store from '../Redux/Store';
import { clearErrors, Loaduser, LoginUser } from '../Redux/UserRed/Actions';

const UserContainerStyle = styled.div`
    width: 80%;
    height: 70vh;
    background-color: #FFF;
    box-shadow: rgba(100, 100, 111, 0.2) 0px 7px 29px 0px;
    border-radius: 10px;
    margin: 2rem auto;
    padding: 2rem;
    display: flex;
    justify-content: center;

    h1{
        align-self: center;
    }

    .user_login{
        max-width: 300px;
        min-width: 90%;
        height: 8vh;
        display: flex;
        align-items: center;
        margin: 0 auto;

        input{
            width: 100%;
            height: 100%;
            padding: 0 2rem;
            border-radius: 10px;
            font-size: 1rem;
            font-weight: 400;
            border: none;
            box-shadow: rgba(100, 100, 111, 0.2) 0px 7px 29px 0px;
            &:focus{
                outline: 0.5px solid #353535;
            }
        }
    }
    .user_info{
        max-width: 300px;
        width: fit-content;
        height: 8vh;
        display: flex;
        align-items: center;
        margin: 0 auto;
        font-size: 1.5rem;
        font-weight: bold;
        align-self: center;
    }
`

function UserContaniner() {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [text, setText] = useState("");

    const { error, isAuthenticated, loading, user } = useSelector(state => state.user);



    const HandleLogin = (e) => {
        if (e.key === 'Enter') {
            if (text !== "") {
                console.log(text);
                dispatch(LoginUser(text)).then(() => {
                    alert("User Login Successful")
                    navigate('/dashboard');
                })
            }
        }
    }

    useEffect(() => {
        if (error) {
            dispatch(clearErrors());
        }
    }, [error, dispatch])


    return (
        <>
            {loading ? <UserContainerStyle><h1>loading...</h1></UserContainerStyle> : <UserContainerStyle>
                {isAuthenticated ? <div className='user_info'>{user.name}</div> : <div className='user_login'>
                    <input type="text" placeholder='Enter Username' onChange={(e) => setText(e.target.value)} onKeyUp={HandleLogin} />
                </div>}
            </UserContainerStyle>}
        </>
    )
}

export default UserContaniner;
import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import { Link } from 'react-router-dom'
import homeicon from '../assets/react.svg';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { Loaduser } from '../Redux/UserRed/Actions';
import store from '../Redux/Store';

const NavMainStyles = styled.div`
    width: 100vw;
    height: 5rem;
    margin-bottom: 1.5rem;
    position: relative;
    z-index: 5;

    .navMain{
        width: 80%;
        height: 100%;
        margin: 2rem auto;
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 0 2rem;
        background-color: #FFF;
        box-shadow: rgba(100, 100, 111, 0.2) 0px 7px 29px 0px;

        ul{
            display: flex;
            align-items: center;
            height: 100%;

            li:nth-child(1){
                height: 4.5rem;
                width: 4.5rem;
            }
            li > a{
                font-size: 1.25rem;
                font-weight: 600;
                color: #000000;
                display: flex;
                justify-content: center;
                align-items: center;
                padding: 0 1.2rem;
                height: 4.5rem;
                transition: 0.2s ease-in-out;
                

                &:hover{
                    border-bottom: 2px solid #00C37A;
                    background-color: #d8d8d863;
                }
                img{
                    height: 1.5rem;
                    width: 1.5rem;
                    color: #000000ec;
                }
            }
        }
        button{
            height: 3rem;
            width: fit-content;
            padding: 0 1.5rem;
            color: white;
            background-color: #0ddc90;
            border: none;
            border-radius: 5px;
            font-size: 1.2rem;
            font-weight: normal;
            transform: scale(1);
            transition: all 0.3s ease-in-out;

            &:hover{
                background-color: #00C37A;
                transform: scale(1.05);
            }
        }
    }
`

function Navbar({ HandleLogout }) {
    const [show, setShow] = useState(false);
    const navigate = useNavigate();
    let navClasses = []
    const [scrolled, setScrolled] = useState(false);
    const handleScroll = () => {
        window.scrollY >= 200 ? setScrolled(true) : setScrolled(false);

    }
    const { isAuthenticated, loading } = useSelector(state => state.user);
    useEffect(() => {
        window.addEventListener('scroll', handleScroll);
        if (isAuthenticated) {
            setShow(true);
        }
        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, [isAuthenticated]);
    if (scrolled) {
        navClasses.push('scrolled')
    }
    return (
        <NavMainStyles style={scrolled ? { backgroundColor: '#FFF', position: 'fixed', top: 0, margin: '0 auto' } : {}}>
            <div className="navMain" style={scrolled ? { boxShadow: 'none', margin: '0 auto' } : {}} >
                <ul>
                    <li><Link to='/'><img src={homeicon} alt="" /></Link></li>
                    <li><Link to='/'>LANDING PAGE</Link></li>
                    <li><Link to='/dashboard'>DASHBOARD</Link></li>
                </ul>
                {show && <button onClick={() => {
                    HandleLogout();
                    setShow(false);
                    navigate('/');
                }}>Logout</button>}

            </div>
        </NavMainStyles >
    )
}

export default Navbar
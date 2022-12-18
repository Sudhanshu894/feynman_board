import { useEffect, useState } from 'react';
import styled from 'styled-components';
import { useSelector, useDispatch } from 'react-redux';
import { clearErrors, UpdateTopic } from '../Redux/TopicRed/Actions';
import { UPDATE_TOPIC_RESET } from '../Redux/TopicRed/ActionTypes';

const TextStyle = styled.span`
    span{
        font-size: 1.3rem;
        padding: 0.2rem;
        font-weight: 500;
        cursor: pointer;
        border-radius: 5px;
    }
    .pop-up{
        position: absolute;
        margin-top: 0.5rem;
        width: 400px;
        background-color: #FFF;
        box-shadow: rgba(0, 0, 0, 0.19) 0px 10px 20px, rgba(0, 0, 0, 0.23) 0px 6px 6px;
        width: fit-content;
        padding: 1rem;
        border-radius: 10px;
        ul{
            list-style: none;
            display: flex;
            flex-direction: column;
            align-items: center;
            gap: 0.5rem;

            li{
                text-align: center;
                border-radius: 5px;
                width: 100%;
                padding: 0.2rem 0.4rem;
                cursor: pointer;
            }
        }
    }
`
function TextBlock({ index, desc, value, text, id }) {
    const [show, setShow] = useState(false);
    const dispatch = useDispatch();
    const [colorval, setColorVal] = useState(value);
    const [descrip, setDescrip] = useState(desc);
    const colorobj = {
        "Understood": 'green',
        "Somewhat Understood": 'yellow',
        "Not clear": 'teal',
        "What rubbish": 'red',
    }
    const { loading, error, isUpdated } = useSelector(state => state.uptopic);
    const UpdateDescription = (temp) => {
        console.log(temp);
        let data = {
            description: descrip,
        }
        dispatch(UpdateTopic(id, data))
    }
    const setValue = (val) => {
        console.log(index, val);
        setColorVal(val);
        let temp = descrip.map((el, ind) => {
            if (ind === index) {
                el.category = val;
            }
        });
        setDescrip(temp);
        setShow(false);
        UpdateDescription(descrip);
    }

    useEffect(() => {
        if (error) {
            console.log(error);
            alert(`Error: ${error}`);
            dispatch(clearErrors());
        }

        if (isUpdated) {
            dispatch({ type: UPDATE_TOPIC_RESET });
        }
    }, [dispatch, error, isUpdated])
    return (
        <TextStyle>
            <span style={{ color: colorobj[colorval], border: show && '2px solid black' }} onClick={() => setShow(!show)}>{text}</span>
            <div className='pop-up' style={{ display: show ? 'block' : 'none' }}>
                <ul>
                    <li style={{ backgroundColor: 'green' }} onClick={() => setValue("Understood")}>{"Understood"}</li>
                    <li style={{ backgroundColor: 'yellow' }} onClick={() => setValue("Somewhat Understood")}>{"Somewhat Understood"}</li>
                    <li style={{ backgroundColor: 'teal' }} onClick={() => setValue("Not clear")}>{"Not clear"}</li>
                    <li style={{ backgroundColor: 'red' }} onClick={() => setValue("What rubbish")}>{"What rubbish"}</li>
                </ul>
            </div>
        </TextStyle>
    )
}

export default TextBlock;
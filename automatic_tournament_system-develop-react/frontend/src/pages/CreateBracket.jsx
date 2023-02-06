import React, {useState} from 'react'
import { useNavigate } from "react-router-dom";
import Form from 'react-bootstrap/Form';
import Card from 'react-bootstrap/Card';
import '../styles/App.css';
import PostService from "../API/PostService";
import { useForm } from 'react-hook-form';
import MyFormGroupInput from '../components/UI/MyFormGroupInput/MyFormGroupInput';
import MyButton from '../components/UI/button/MyButton';
import MyCard from '../components/UI/MyCard/MyCard';


const CreateBracket = () => {

    const navigate = useNavigate()

    const [responseBody, setResponseBody] = useState({participants: '', type: 'SE'});

    const inputChangeHandler = (inputValue) => {
        const {name, value} = inputValue
        setResponseBody({...responseBody, [name]: value})
    }

    const inputSelectChangeHandler = (event) => {
        const {name, value} = event.target
        setResponseBody({...responseBody, [name]: value})
    }

    const {
        register,
        handleSubmit,
        formState: { errors },
      } = useForm({mode: "onBlur"});

    const onSubmitHandler = () => {
        console.log(responseBody)
        const response = PostService.createBracket(responseBody).then(function (response) {
            navigate(`/bracket/${JSON.parse(response.request.response).id}`)
          })  
    }

    return (
        <section className='section_without_div pt-4'>
            <Form onSubmit={handleSubmit(onSubmitHandler)}>
                <div className='my-4'>
                    <MyCard border="success">
                        <Card.Header className='tournament_text'>Bracket info</Card.Header>
                        <Card.Body>
                        <Card.Text>
                            <MyFormGroupInput
                                label='Participants'
                                name='participants'
                                as="textarea"
                                errors={errors}
                                register={register}
                                validationSchema={{ 
                                    required: "⚠ This input is required.",
                                    pattern: {
                                    value: /^.+\s+./i,
                                    message: "⚠ Minimum two participants."
                                    }
                                }}
                                onChange={inputChangeHandler}>
                            </MyFormGroupInput>
                            <Form.Group className="mb-3">
                                <Form.Label>Bracket type</Form.Label>
                                <Form.Select 
                                className='shadow-none' 
                                name='type' 
                                onChange={(e)=>inputSelectChangeHandler(e)}>
                                    <option value="SE">Single Elimination</option>
                                    <option value="DE">Double Elimination</option>
                                    <option value="RR">Round Robin</option>
                                </Form.Select>
                            </Form.Group>
                            {responseBody.type === "RR"
                                ? <>
                                    <div className='row'>
                                        <div className='col'>
                                            <MyFormGroupInput
                                                label='Points for victory'
                                                name='points_victory'
                                                errors={errors}
                                                register={register}
                                                validationSchema={{ 
                                                    required: "⚠ This input is required." 
                                                  }}
                                                onChange={inputChangeHandler}>
                                            </MyFormGroupInput>
                                        </div>
                                        <div className='col'>
                                            <MyFormGroupInput
                                                label='Points for draw'
                                                name='points_draw'
                                                errors={errors}
                                                register={register}
                                                validationSchema={{ 
                                                    required: "⚠ This input is required." 
                                                  }}
                                                onChange={inputChangeHandler}>
                                            </MyFormGroupInput>
                                        </div>
                                        <div className='col'>
                                            <MyFormGroupInput
                                                label='Points per loss'
                                                name='points_loss'
                                                errors={errors}
                                                register={register}
                                                validationSchema={{ 
                                                    required: "⚠ This input is required." 
                                                  }}
                                                onChange={inputChangeHandler}>
                                            </MyFormGroupInput>
                                        </div>
                                    </div>
                                </>
                                : <></>
                            }
                        </Card.Text>
                        </Card.Body>
                    </MyCard>
                </div>
                <div className='form_button_div pb-4'>
                    <MyButton additionalCl={'btn-md'} type="submit">
                        Create Bracket
                    </MyButton>
                </div>
            </Form>
        </section>
      );
}

export default CreateBracket
import React, {useState, useContext} from 'react'
import '../styles/App.css';
import Form from 'react-bootstrap/Form';
import Card from 'react-bootstrap/Card';
import { useNavigate } from "react-router-dom";
import { AuthContext } from '../context'
import useAxios from '../utils/useAxios';
import UploadButton from '../components/UI/UploadButton/UploadButton';
import { useForm } from 'react-hook-form';
import MyFormGroupInput from '../components/UI/MyFormGroupInput/MyFormGroupInput';
import MyButton from '../components/UI/button/MyButton';
import MyCard from '../components/UI/MyCard/MyCard';



const CreateTournament = () => {
  const api = useAxios()
  const navigate = useNavigate()
  const { user } = useContext(AuthContext);
  const [responseBody, setResponseBody] = useState({title: '', content: '', start_time: '', participants: '', game: '', prize: '',
                                                    type: 'SE', points_loss: '0', points_draw: '0', secod_final: false, points_victory: '1', creater_email: user.email});
  const [inputFile, setInputFile] = useState(null);

  const inputChangeHandler = (inputValue) => {
      const {name, value} = inputValue
      setResponseBody({...responseBody, [name]: value})
  }

  const inputSelectChangeHandler = (event) => {
    const {name, value} = event.target
    setResponseBody({...responseBody, [name]: value})
  }

  const inputCheckBoxChangeHandler = (e) => {
      const { target } = e;
      const value = target.type === 'checkbox' ? target.checked : target.value;
      const { name } = target;
      setResponseBody({...responseBody, [name]: value})
  }

  const {
      register,
      handleSubmit,
      formState: { errors },
  } = useForm({mode: "onBlur"});

  const onSubmitHandler = () => {
      setResponseBody({...responseBody, poster: inputFile})
      console.log({...responseBody, poster: inputFile})
      const response = api.post(`/create_tournament/`, {...responseBody, poster: inputFile}, {
        headers: {
          'Content-Type': 'multipart/form-data',
        }
       },{
        validateStatus: function (status) {
          return status == 201;
        },
        }) 
        // navigate(`/tournament/${responseBody.title.toLowerCase().replace(/ /g, '-').replace(/[^\w-]+/g, '')}`)
  }

  return (
    <section className='section_without_div pt-4'>
    <Form onSubmit={handleSubmit(onSubmitHandler)}>
      <MyCard>
          <Card.Header className='tournament-text'>Basic Info</Card.Header>
          <Card.Body>
              <MyFormGroupInput
                  label='Title'
                  name='title'
                  type='text'
                  errors={errors}
                  register={register}
                  validationSchema={{ 
                      required: "⚠ This input is required." 
                  }}
                  onChange={inputChangeHandler}>
              </MyFormGroupInput>
              <MyFormGroupInput
                  label='Description'
                  name='content'
                  as="textarea"
                  errors={errors}
                  register={register}
                  validationSchema={{ 
                      required: "⚠ This input is required." 
                  }}
                  onChange={inputChangeHandler}>
              </MyFormGroupInput>
              <MyFormGroupInput
                  label='Prize fund'
                  name='prize'
                  errors={errors}
                  register={register}
                  validationSchema={{ 
                    required: "⚠ This input is required.",
                    pattern: {
                      value: /^[+-]?\d+(\.\d+)?$/,
                      message: "⚠ Invalid data."
                    }
                  }}
                  onChange={inputChangeHandler}>
              </MyFormGroupInput>
              <MyFormGroupInput
                  label='Game'
                  name='game'
                  errors={errors}
                  register={register}
                  validationSchema={{ 
                    required: "⚠ This input is required." 
                  }}
                  onChange={inputChangeHandler}>
              </MyFormGroupInput>
              <MyFormGroupInput
                  label='Start of the tournament'
                  name='start_time'
                  type='datetime-local'
                  errors={errors}
                  register={register}
                  validationSchema={{ 
                    required: "⚠ This input is required." 
                  }}
                  onChange={inputChangeHandler}>
              </MyFormGroupInput>
              <Form.Group className="mb-3">
                  <Form.Label>Poster</Form.Label>
                  <UploadButton setInputFileValue={setInputFile} />
              </Form.Group>
          </Card.Body>
      </MyCard>
      <div className='my-4'>
        <MyCard>
            <Card.Header className='tournament-text'>Bracket Info</Card.Header>
            <Card.Body>
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
                  {responseBody.type === "SE"
                      ? 
                        <Form.Check type='checkbox'>
                          <Form.Check.Input name='secod_final'
                          onChange={(e)=>inputCheckBoxChangeHandler(e)} className='my_ckeckbox' type='checkbox'/>
                          <Form.Check.Label style={{color: 'inherit'}}>{`Include a match for 3rd place between semifinal losers`}</Form.Check.Label>
                        </Form.Check>
                      : <></>
                  }
                  {responseBody.type === "RR"
                                ? <>
                                    <div className='row'>
                                        <div className='col'>
                                            <MyFormGroupInput
                                                label='Points for victory'
                                                name='points_victory'
                                                errors={errors}
                                                defaultValue={1}
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
                                                defaultValue={0}
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
                                                defaultValue={0}
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
            </Card.Body>
        </MyCard>
      </div>
      <div className='form_button_div pb-4'>
        <MyButton additionalCl={'btn-md'} type="submit">
            Create
        </MyButton>
      </div>
    </Form>
</section>
  );
}

export default CreateTournament
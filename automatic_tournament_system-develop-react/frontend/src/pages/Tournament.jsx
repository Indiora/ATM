import React, { useEffect, useState, useContext } from 'react'
import { useParams } from 'react-router-dom'
import { useFetching } from '../hooks/useFetching'
import Loader from '../components/UI/Loader/Loader'
import PostService from "../API/PostService";
import def_tour from "../assets/img/d_t.png" 
import useAxios from '../utils/useAxios';
import { AuthContext } from '../context';
import { useNavigate } from "react-router-dom";
import MyButton from '../components/UI/button/MyButton';
import RoundRobin from '../components/RoundRobin';
import Accordion from 'react-bootstrap/Accordion';
import moment from 'moment'
import SingleEl from '../components/SingleEl';

const Tournament = () => {

    const params = useParams()
    const [id, setId] = useState(0)
    const [bracket, setBracket] = useState([])

    const [tournament, setTournament] = useState({})
   
    const [types, setTypes] = useState("SE")
    const { user } = useContext(AuthContext);
    const [fetchTournament, isLoading, error] = useFetching(async (slug) => {
        const response = await PostService.getTournamentBySlug(slug)
        setTournament(response.data)    
    })
    
    const api = useAxios();
    const navigate = useNavigate()
    const onDelete = async () => {
        const response = await api.delete(`/delete_tournament/${params.slug}/`)
    }

    const onEdit = async () => {
        navigate(`/edit_tournament/${params.slug}/`)
    }

    const [fetchBrackets, isBraLoadind, braError] = useFetching(async (slug) => {
        const response = await PostService.allTournamentBrackets(slug)
        setBracket(response.data.brackets[0].bracket)
        setTypes(response.data.brackets[0].type)
        setId(response.data.brackets[0].id)
    })

    useEffect(() => {
        fetchTournament(params.slug)
        fetchBrackets(params.slug)
    }, [])

    useEffect(() => {
        
    }, [bracket]);

    return (
        <section>
            {isLoading
                ? <div className='loader'><Loader/></div> 
                :   <div className="container">
                        <div className="row p-3">
                                <div className="col-lg-12 col-md-12">
                                    <div className="row">
                                        <div className="col-sm-8"> 
                                            <img src={def_tour} alt="tournament poster" className="pe-4 tournament_img"/>
                                            {/* <img src={tournament.poster} alt="tournament poster" className="pe-4 tournament_img"/> */}
                                        </div>
                                        <div className="col-sm-4">
                                            <div className="d-flex flex-column pt-1">
                                                <h3 className='tournament_text'>{tournament.title}</h3>
                                                <p>Start of the tournament</p>
                                                <p className='tournament_text'>{moment(tournament.start_time).format('MMMM Do YYYY') || ''}</p>
                                                <p>Game</p>
                                                <p className='tournament_text'>{tournament.game }</p>
                                                <p>Prize fund</p>
                                                <p className='tournament_text'>{tournament.prize } <span>&#8381;</span></p>
                                                <p>Organizer</p>
                                                <p className='tournament_text'>{tournament.owner}</p>  
                                            </div>
                                        </div>
                                    </div>
                                    <div className="row my-3">
                                        <div className="col">
                                            <Accordion flush defaultActiveKey={['1']} alwaysOpen>
                                                <Accordion.Item eventKey="0">
                                                    <Accordion.Header className="my_accordion_body"><h4 >Description</h4></Accordion.Header>
                                                    <Accordion.Body className="my_accordion_body">
                                                        <p>{tournament.content}</p>
                                                    </Accordion.Body>
                                                </Accordion.Item>
                                                <Accordion.Item eventKey="1">
                                                    <Accordion.Header className="my_accordion_body"><h4>Bracket</h4></Accordion.Header>
                                                    <Accordion.Body className="my_accordion_body">
                                                    {isBraLoadind 
                                                        ? <div className='loader'><Loader/></div>
                                                        : <> {(() => {
                                                            if (types == "SE") {
                                                                return (
                                                                    <SingleEl id={id} bracket={bracket} owner={tournament.owner}/>    
                                                                )
                                                            } else if (types == "RR") {
                                                                return (
                                                                    <RoundRobin id={id} bracket={bracket} owner={tournament.owner}/>
                                                                )
                                                            } else if (types == "DE") {
                                                                return (
                                                                    <RoundRobin id={id} bracket={bracket} owner={tournament.owner}/>
                                                                )
                                                            }
                                                        })()} </>
                                                    }
                                                    </Accordion.Body>
                                                </Accordion.Item>
                                            </Accordion>         
                                        </div>
                                    </div>
                                    {tournament.owner !== user.username
                                        ? <></>
                                        :<>
                                            <MyButton additionalCl={'btn-md btn my-3 me-3'} type="submit" onClick = {onEdit}>
                                                Edit Tournament
                                            </MyButton>
                                            <MyButton additionalCl={'btn-md btn my-3 me-3'} type="submit" onClick = {onDelete}>
                                                Delete
                                            </MyButton>
                                        </>
                                    }
                                </div>
                        </div>  
                    </div>
            }
        </section>
    )
}

export default Tournament
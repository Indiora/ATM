import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { useFetching } from '../hooks/useFetching'
import Loader from '../components/UI/Loader/Loader'
import PostService from "../API/PostService";
import RoundRobin from '../components/RoundRobin';
import { CustomDoubleElimination } from '../components/CustomDoubleElimination';
import { CustomSingleEliminationBracket } from '../components/CustomSingleElimination';


const Bracket = () => {
    const params = useParams()
    const [bracket, setBracket] = useState({id: '', type: '', bracket: [{
        "id": 1,
        "nextMatchId": 0,
        "tournamentRoundText": "test",
        "startTime": "2021-05-30",
        "state": "SCHEDULED",
        "participants": [
        {
            "id": "d1",
            "resultText": 0,
            "isWinner": false,
            "status": null,
            "name": "not",
            "picture": null
        },
        {
            "id": "d1",
            "resultText": 0,
            "isWinner": false,
            "status": null,
            "name": "not",
            "picture": null
        }
        ]
    }]})

    const [fetchBrackets, isBraLoadind, braError] = useFetching(async (id) => {
        const response = await PostService.getBracketById(id)
        setBracket(response.data)
        console.log(response.data)
    })

    useEffect(() => {
        fetchBrackets(params.id)
    }, [])

    return (
        <section>
            {isBraLoadind
                ? <div className='loader'><Loader/></div>
                :   <div className="container">
                       {(() => {
                                if (bracket.type === "SE") {
                                    return (
                                    
                                    <CustomSingleEliminationBracket bracket={bracket.bracket}/>
                                    )
                                } else if (bracket.type === "RR") {
                                    return (
                                    <RoundRobin id={bracket.id} bracket={bracket.bracket}/>
                                    )
                                } else if (bracket.type === "DE") {
                                    return (
                                    <CustomDoubleElimination/>
                                    )
                                }
                        })()}
                    </div>
            
            }
        </section>
    )
}

export default Bracket
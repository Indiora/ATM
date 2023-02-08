import React, { useEffect, useState, Fragment } from "react";
import BracketWrapper from "./UI/BracketWrapper/BracketWrapper";
import { Bracket, SeedsList, Round } from "./rounds";
import { Seed, SeedItem, SeedTeam, SeedTime, SingleLineSeed } from "./UI/seed";
import MyMatch from "./UI/MyMatch/MyMatch";


const SingleEl = ({bracket, id, owner}) => {
    const [rounds, setBracket] = useState(bracket)

    const handleBracketChange = (data) => {
        setBracket(data)
    }

    return (
        <Bracket mobileBreakpoint={992}>
            {rounds.map((round) => 
                <Round key={round.title} mobileBreakpoint={992}>
                    <SeedsList>
                        {round.seeds.map((seed, idx) => 
                        <MyMatch key={idx} owner={owner} id={id} seed={seed} onPatch={handleBracketChange}/>
                        )}
                    </SeedsList>
                </Round>
            )}
        </Bracket>
    )};


  export default SingleEl;

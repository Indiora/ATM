import React, { useEffect, useState, Fragment } from "react";
import BracketWrapper from "./UI/BracketWrapper/BracketWrapper";
import { Bracket, SeedsList, Round } from "./rounds";
import { Seed, SeedItem, SeedTeam, SeedTime, SingleLineSeed } from "./UI/seed";
import MyMatch from "./UI/MyMatch/MyMatch";


const DoubleEl = ({bracket, id, owner}) => {
    const [upperRounds, setUpperRounds] = useState(bracket.upper_rounds)
    const [lowerRounds, setLowerRounds] = useState(bracket.lower_rounds)
    // console.log(bracket)
    const [rounds, setBracket] = useState(bracket)
  
    const handleBracketChange = (data) => {
        setBracket(data)
    }
    
    // console.log(bracket)
    // setB(rounds.shift())

      
    return (
        <>
            <Bracket mobileBreakpoint={992}>
                {rounds.upper_rounds.map((round, i) => 
                    <Round key={round.title} mobileBreakpoint={992}>
                        <SeedsList>
                            {round === rounds.upper_rounds[rounds.upper_rounds.length - 2]
                                ? round.seeds.map((seed, idx) => 
                                    <MyMatch key={idx} owner={owner} match_id={idx} round_id={i} id={id} seed={seed} onPatch={handleBracketChange} single={true}/>
                                    )
                                : round.seeds.map((seed, idx) => 
                                    <MyMatch key={idx} owner={owner} match_id={idx} round_id={i} id={id} seed={seed} onPatch={handleBracketChange}/>
                                    )
                            }
                            
                        </SeedsList>
                    </Round>
                )}
            </Bracket>
             <Bracket mobileBreakpoint={992}>
             {rounds.lower_rounds.map((round, indx) => 
                 <Round key={round.title} mobileBreakpoint={992}>
                     <SeedsList>
                        {indx % 2 === 0
                            ? round.seeds.map((seed, idx) => 
                                <MyMatch key={idx} owner={owner} id={id} seed={seed} onPatch={handleBracketChange} single={true}/>)
                            : round.seeds.map((seed, idx) => 
                                <MyMatch key={idx} owner={owner} id={id} seed={seed} onPatch={handleBracketChange}/>)
                        }
                         
                     </SeedsList>
                 </Round>
             )}
         </Bracket>
       
        </>
    )};


  export default DoubleEl;

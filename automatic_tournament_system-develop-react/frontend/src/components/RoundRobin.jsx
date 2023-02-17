import MyRoundRobinMatch from "./UI/MyRoundRobinMatch/MyRoundRobinMatch";
import MySortebleTable from "./UI/MySortebleTable/MySortebleTable";
import React, { useState} from "react";
import BracketWrapper from "./UI/BracketWrapper/BracketWrapper";

const RoundRobin = ({id, bracket, owner}) => {
    const [bracketAll, setBracketAll] = useState(bracket)
    const [table, setTable] = useState(bracket.table)
    
    const handleBracketChange = (data) => {
      setBracketAll(data)
      setTable(data.table)
    }
  
    return (
      <BracketWrapper>
        <div style={{minWidth: '80rem'}}>  
            {bracketAll.rounds.map((round, i) =>
                  <div  className="row mb-3" key={i}>
                  {round.map((match) => 
                    <MyRoundRobinMatch owner={owner} id={id} match={match} key={match.id} onPatch={handleBracketChange}/>
                  )}
                    
                </div> 
            )} 
        </div>
        <MySortebleTable table={ table }/>
      </BracketWrapper>

  )
};

  export default RoundRobin;

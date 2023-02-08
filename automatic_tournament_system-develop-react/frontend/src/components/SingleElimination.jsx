// import React, { useEffect, useState} from "react";
// import BracketWrapper from "./UI/BracketWrapper/BracketWrapper";
// import { Bracket, RoundProps } from 'react-brackets';
// import CustomSeed from "./UI/CustomSeed/CustomSeed";


// const SingleElimination = ({bracket, id, owner}) => {


    // const rounds1 = [
    //      {
    //       title: "hyeta",
    //       seeds: [
    //         {
    //           id: 1,
    //           title: 'aboba',
    //           date: new Date().toDateString(),
    //           teams: [
    //             { id: 1, name: "泰山高中", score: 0 },
    //             { id: 3, name: "成功高中", score: 6 }
    //           ]
    //         }
    //       ]
    //     },
    //   ];


    // const [rounds, setBracket] = useState(rounds1)
  
    // useEffect(() => { 
    //   bracket.map((round) => {
    //     console.log(round.seeds)
    //     // round.seeds.map((match) => {console.log(match)})
    //   })

    //   setBracket(bracket)
    //   console.log(bracket)
    // }, [bracket]);

//     return (
//         <BracketWrapper>
//           <Bracket 
//           rounds={rounds} 
//           renderSeedComponent={CustomSeed} 
//           data={'hello'}
//         />  
//         </BracketWrapper>
//   )
// };

//   export default SingleElimination;

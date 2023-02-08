// import React, { useState} from "react";
// import BracketWrapper from "./UI/BracketWrapper/BracketWrapper";
// import { Bracket, RoundProps } from 'react-brackets';


// const DoubleElimination = () => {
    
//     const wining = [
//   {
//     title: 'Round 1',
//     seeds: [
//       {},
//       {
//         id: 1,
//         date: new Date().toDateString(),
//         teams: [
//           { id: 1, name: 'The Leons', score: 2 },
//           // { id: 3, name: 'Kitties', score: 6 },
//         ],
//       },
//       {},
//       {
//         id: 1,
//         date: new Date().toDateString(),
//         teams: [
//           { id: 1, name: 'The Leons', score: 2 },
//           // { id: 3, name: 'Kitties', score: 6 },
//         ],
//       },
//     ],
//   },
//   {
//     title: 'Round 2',
//     seeds: [...new Array(2)].fill({
//       id: 1,
//       date: new Date().toDateString(),
//       teams: [
//         { id: 1, name: 'The Leons', score: 2 },
//         { id: 3, name: 'Kitties', score: 6 },
//       ],
//     }),
//   },
//   {
//     title: 'Round 3',
//     seeds: [...new Array(1)].fill({
//       id: 1,
//       date: new Date().toDateString(),
//       teams: [
//         { id: 1, name: 'The Leons', score: 2 },
//         { id: 3, name: 'Kitties', score: 6 },
//       ],
//     }),
//   },
// ];
// const losing = [
//   {
//     title: 'Round 1',
//     seeds: [
//       {id:0, teams:[]},
//       {
//         id: 1,
//         date: new Date().toDateString(),
//         teams: [
//           { id: 1, name: 'The Leons', score: 2 },
//           // { id: 3, name: 'Kitties', score: 6 },
//         ],
//       },
//     ],
//   },
//   {
//     title: 'Round 2',
//     seeds: [
//       {
//         id: 1,
//         date: new Date().toDateString(),
//         teams: [
//           { id: 1, name: 'The Leons', score: 2 },
//           // { id: 3, name: 'Kitties', score: 6 },
//         ],
//       },
//     ],
//   },
//   {
//     title: 'Round 3',
//     seeds: [
//       {
//         id: 1,
//         date: new Date().toDateString(),
//         teams: [
//           { id: 1, name: 'The Leons', score: 2 },
//           // { id: 3, name: 'Kitties', score: 6 },
//         ],
//       },
//     ],
//   },
//   {
//     title: 'Round 4',
//     seeds: [
//       {
//         id: 1,
//         date: new Date().toDateString(),
//         teams: [
//           { id: 1, name: 'The Leons', score: 2 },
//           // { id: 3, name: 'Kitties', score: 6 },
//         ],
//       },
//     ],
//   },
// ];
  
//     return (
//         <BracketWrapper>
//             <Bracket rounds={wining} />

//             <div style={{ height: 50 }}></div>

//             <Bracket rounds={losing} />
//         </BracketWrapper>
//   )
// };

//   export default DoubleElimination;

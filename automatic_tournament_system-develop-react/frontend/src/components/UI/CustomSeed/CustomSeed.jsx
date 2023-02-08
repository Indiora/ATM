import { Bracket, RoundProps, Seed, SeedItem, SeedTeam, RenderSeedProps } from 'react-brackets';
import classes from "./CustomSeed.module.css";
import React from 'react';


const CustomSeed = ({seed, title, breakpoint, roundIndex, seedIndex, data}) => {

    const hoverOnMatch = (id) => {
        console.log('on')
        const elements = document.querySelectorAll(`[id=${id}]`);
        for (let elem of elements) {
            elem.classList.remove(classes.side);
            elem.classList.add(classes.hoverSide);
        }
      
    }

    const hoverOffMatch = (id) => {
      console.log('off')
        const elements = document.querySelectorAll(`[id=${id}]`);
        for (let elem of elements) {
            elem.classList.remove(classes.hoverSide);
            elem.classList.add(classes.side);
        }
    }

    return (
      <Seed 
      mobileBreakpoint={breakpoint} style={{ fontSize: 12 }}>
        <div>{data}</div>
        <SeedItem > 
            
            <div id={`id${seed.teams[0]?.id}`}
                onMouseEnter={(e)=>{hoverOnMatch(`id${seed.teams[0]?.id}`)}} 
                onMouseLeave={(e)=>{hoverOffMatch(`id${seed.teams[0]?.id}`)}}>
                  <SeedTeam>
                      {seed.teams[0]?.participant || 'NO TEAM '}
                      <span>{seed.teams[0].score}</span>
                  </SeedTeam>
            </div>
            <div id={`id${seed.teams[1]?.id}`}
                onMouseEnter={(e)=>{hoverOnMatch(`id${seed.teams[1]?.id}`)}} 
                onMouseLeave={(e)=>{hoverOffMatch(`id${seed.teams[1]?.id}`)}}>
                <SeedTeam>
                  {seed.teams[1]?.participant || 'NO TEAM '} 
                  <span>{seed.teams[1].score}</span>
                </SeedTeam>
            </div>
            
        </SeedItem>
        <button >dd</button>  
        
        
      </Seed>
    
    );
  };

export default CustomSeed;
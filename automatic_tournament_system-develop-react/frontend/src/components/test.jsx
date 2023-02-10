import React, { useEffect, useState, Fragment } from "react";
import BracketWrapper from "./UI/BracketWrapper/BracketWrapper";
import { Bracket, SeedsList, Round } from "./rounds";
import { Seed, SeedItem, SeedTeam, SeedTime, SingleLineSeed } from "./UI/seed";
import MyMatch from "./UI/MyMatch/MyMatch";


const SomeFun = ({bracket, id, owner}) => {
      
    return (
        <Bracket mobileBreakpoint={992}>
            <Round mobileBreakpoint={992}>
                <SeedsList>
                    <SingleLineSeed 
                    mobileBreakpoint={992} style={{ fontSize: 14 }}>
                        <SeedItem > 
                                <SeedTeam>
                                    aboba
                                    <span>0</span>
                                </SeedTeam>
                                <SeedTeam>
                                    aboba
                                    <span>0</span>
                                </SeedTeam>
                        </SeedItem>
                    </SingleLineSeed>
                    <SingleLineSeed 
                    mobileBreakpoint={992} style={{ fontSize: 14 }}>
                        <SeedItem > 
                                <SeedTeam>
                                    aboba
                                    <span>0</span>
                                </SeedTeam>
                                <SeedTeam>
                                    aboba
                                    <span>0</span>
                                </SeedTeam>
                        </SeedItem>
                    </SingleLineSeed>
                   
                    </SeedsList>
            </Round>
            <Round mobileBreakpoint={992}>
                <SeedsList>
                    <Seed 
                    mobileBreakpoint={992} style={{ fontSize: 14 }}>
                        <SeedItem > 
                                <SeedTeam>
                                    aboba
                                    <span>0</span>
                                </SeedTeam>
                                <SeedTeam>
                                    aboba
                                    <span>0</span>
                                </SeedTeam>
                        </SeedItem>
                    </Seed>
                    <Seed 
                    mobileBreakpoint={992} style={{ fontSize: 14 }}>
                        <SeedItem > 
                                <SeedTeam>
                                    aboba
                                    <span>0</span>
                                </SeedTeam>
                                <SeedTeam>
                                    aboba
                                    <span>0</span>
                                </SeedTeam>
                        </SeedItem>
                    </Seed>
                </SeedsList>
            </Round>
            <Round mobileBreakpoint={992}>
                <SeedsList>
                    <SingleLineSeed 
                    mobileBreakpoint={992} style={{ fontSize: 14 }}>
                        <SeedItem > 
                                <SeedTeam>
                                    aboba
                                    <span>0</span>
                                </SeedTeam>
                                <SeedTeam>
                                    aboba
                                    <span>0</span>
                                </SeedTeam>
                        </SeedItem>
                    </SingleLineSeed>
                </SeedsList>
            </Round>
        </Bracket>
    )};


  export default SomeFun;

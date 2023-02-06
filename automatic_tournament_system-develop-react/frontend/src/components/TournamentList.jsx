import React from 'react';
import def_tour from "../assets/img/d_t.png" 
import test from '../assets/img/frogBACK.png'
import aaa from '../assets/img/try.jpeg'

const TournamentList = ({tournaments}) => {

    if (!tournaments.length) {
        return (
            <h1 style={{textAlign: 'center'}}>
                Турниры не найдены!
            </h1>
        )
    }

    return (

            <div className="row">
                {tournaments.map((post) =>
                    <div className="col-lg-3 col-md-6 mt-4" key={post.slug}>
                        <div className="card tournament_card">
                        <a href={`/tournament/${post.slug}`}>
                            <img src={aaa} className="card-img-top" alt="card text"/>
                            <div className="card-body tournaments_card_body">
                                <h5 className="card-title">{post.title}</h5>
                                <p className="card-text">Game: {post.game}</p>
                                <p className="card-text">Prize: {post.prize}</p>
                            </div>
                        </a>
                        </div>
                    </div>
                )} 
            </div>
          
    );
};

export default TournamentList;
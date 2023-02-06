import React, { useState, useEffect } from 'react'
import TableBody from './TableBody';
import TableHead from './TableHead';
import { useSortableTable } from '../../../hooks/useSortableTable';


const MySortebleTable = ({table}) => {

  // const data = ([{participant: "aboba", match_w_l: [0, 0], win: 1, loose: 1, draw: 1, scores: 4 },
  //                 { participant: "ibib", match_w_l: [1, 2], win: 1, loose: 2, scores: 2 },
  //                 { participant: "lulu", match_w_l: [3, 0], win: 1, loose: 0,  scores: 5 },
  //               ]);
  
  const columns = [
    { label: "Participant", accessor: "participant", sortable: true },
    { label: "Match W-L", accessor: "match_w_l", sortable: false },
    { label: "Set win", accessor: "win", sortable: true },
    { label: "Set loose", accessor: "loose", sortable: true },
    { label: "Set draw", accessor: "draw", sortable: true },
    { label: "Scores", accessor: "scores", sortable: true, sortbyOrder: "desc" },
  ];

  const [tableData, handleSorting] = useSortableTable(table, columns);

  return (
    <>
      <table className="table">
        <TableHead {...{ columns, handleSorting }} />
        <TableBody {...{ columns, tableData }} />
      </table>
    </>
  );
};

export default MySortebleTable
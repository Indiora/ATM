import MyRoundRobinMatch from "./UI/MyRoundRobinMatch/MyRoundRobinMatch";
import MySortebleTable from "./UI/MySortebleTable/MySortebleTable";
import React,   { useState, useEffect, useCallback, useRef } from "react";
import MyModal from "./UI/ MyModal/MyModal";
import Modal from 'react-bootstrap/Modal';
import { TransformWrapper, TransformComponent } from "react-zoom-pan-pinch"; 
import { toPng, toJpeg, toSvg } from 'html-to-image'
import MyButton from "./UI/button/MyButton";


const RoundRobin = ({id, bracket}) => {
    const ref = useRef(null)
    const [bracketAll, setBracketAll] = useState(bracket)
    const [modalShow, setModalShow] = useState(false);
    const [table, setTable] = useState(bracket.table)
    const filter = (node) => {
      const exclusionClasses = ['tools', ''];
      return !exclusionClasses.some((classname) => node.classList?.contains(classname));
    }

    const onButtonClickPng = useCallback(() => {
      if (ref.current === null) {
        return
      }

      toPng(ref.current, { filter:filter, cacheBust: true, })
        .then((dataUrl) => {
          const link = document.createElement('a')
          link.download = 'bracket.png'
          link.href = dataUrl
          link.click()
          setModalShow(false)
        })
        .catch((err) => {
          console.log(err)
        })
    }, [ref])

    const onButtonClickJPEG = useCallback(() => {
      if (ref.current === null) {
        return
      }

      toJpeg(ref.current, { filter:filter, cacheBust: true, })
        .then((dataUrl) => {
          const link = document.createElement('a')
          link.download = 'bracket.png'
          link.href = dataUrl
          link.click()
          setModalShow(false)
        })
        .catch((err) => {
          console.log(err)
        })
    }, [ref])

    const onButtonClickSVG = useCallback(() => {
      if (ref.current === null) {
        return
      }

      toSvg(ref.current, { filter:filter, cacheBust: true, })
        .then((dataUrl) => {
          const link = document.createElement('a')
          link.download = 'bracket.png'
          link.href = dataUrl
          link.click()
          setModalShow(false)
        })
        .catch((err) => {
          console.log(err)
        })
    }, [ref])

    const handleBracketChange = (data) => {
      setBracketAll(data)
      setTable(data.table)
    }
    
    // useEffect(() => {
    //   console.log(bracketAll.table)
    //   setB(bracketAll.table)

    // }, [bracketAll.table])
  
    return (
      <div ref={ref} style={{padding: '0.5em'}}>
      <TransformWrapper performance={true}>
        <React.Fragment>
          <div className="tools">
            <button style={{border: 'none'}} data-tooltip="Download bracket" onClick={() => setModalShow(true)}> 
              <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="15"
                  height="15"
                  fill="#000"
                  version="1.1"
                  viewBox="0 0 24 24"
                  xmlSpace="preserve"
                  className="toolsSvg"
              >
                  <path d="M24 24H0v-8h2v6h20v-6h2v8zm-12-5.6l-7.7-7.7 1.4-1.4 5.3 5.3V0h2v14.6l5.3-5.3 1.4 1.4-7.7 7.7z"></path>
              </svg>
            </button>
          </div>
          <TransformComponent wrapperClass={'someText'}>
            <div style={{minWidth: '80rem'}}>  
              {bracketAll.rounds.map((round, i) =>
                    <div  className="row mb-3" key={i}>
                    {round.map((match) => 
                      <MyRoundRobinMatch id={id} match={match} key={match.id} onPatch={handleBracketChange}/>
                    )}
                      
                  </div> 
              )} 
            </div>
            <MySortebleTable table={ table }/>
          
          </TransformComponent>
          </React.Fragment>
      </TransformWrapper>
      <MyModal 
          show={modalShow}
          onHide={() => setModalShow(false)}>
          <Modal.Header className="myModalHeader" closeButton >
            Download Bracket
          </Modal.Header>
          <Modal.Body className="myModalBody">
            <div className='d-grid'>
              <MyButton additionalCl={'btn-md'} onClick={onButtonClickPng}>Png</MyButton>
              <MyButton additionalCl={'btn-md'} onClick={onButtonClickJPEG}>Jpeg</MyButton>
              <MyButton additionalCl={'btn-md'} onClick={onButtonClickSVG}>SVG</MyButton>
            </div>
          </Modal.Body>
      </MyModal>
      </div>
  )
};

  export default RoundRobin;

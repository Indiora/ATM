import MyRoundRobinMatch from "./UI/MyRoundRobinMatch/MyRoundRobinMatch";
import MySortebleTable from "./UI/MySortebleTable/MySortebleTable";
import React,   { useState, useCallback, useRef } from "react";
import MyModal from "./UI/ MyModal/MyModal";
import Modal from 'react-bootstrap/Modal';
import { TransformWrapper, TransformComponent } from "react-zoom-pan-pinch"; 
import { toPng, toJpeg, toSvg } from 'html-to-image'

const RoundRobin = ({id, bracket}) => {
    const ref = useRef(null)
    const [bracketAll, setBracketAll] = useState(bracket)
    const [modalShow, setModalShow] = useState(false);

    const onButtonClickPng = useCallback(() => {
      if (ref.current === null) {
        return
      }

      toPng(ref.current, { cacheBust: true, })
        .then((dataUrl) => {
          const link = document.createElement('a')
          link.download = 'my-image-name.png'
          link.href = dataUrl
          link.click()
        })
        .catch((err) => {
          console.log(err)
        })
    }, [ref])

    const onButtonClickJPEG = useCallback(() => {
      if (ref.current === null) {
        return
      }

      toJpeg(ref.current, { cacheBust: true, })
        .then((dataUrl) => {
          const link = document.createElement('a')
          link.download = 'my-image-name.png'
          link.href = dataUrl
          link.click()
        })
        .catch((err) => {
          console.log(err)
        })
    }, [ref])

    const onButtonClickSVG = useCallback(() => {
      if (ref.current === null) {
        return
      }

      toSvg(ref.current, { cacheBust: true, })
        .then((dataUrl) => {
          const link = document.createElement('a')
          link.download = 'my-image-name.png'
          link.href = dataUrl
          link.click()
        })
        .catch((err) => {
          console.log(err)
        })
    }, [ref])

    const handleBracketChange = (data) => {
      setBracketAll(data)
    }

  
    return (
      <div ref={ref}>
      <TransformWrapper performance={true}>
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
          <MySortebleTable table={bracketAll.table}/>
          
          </TransformComponent>
      </TransformWrapper>
      <MyModal 
          show={modalShow}
          onHide={() => setModalShow(false)}>
          <Modal.Header closeButton >
          </Modal.Header>
          <Modal.Body >
            <button onClick={onButtonClickPng}>Png</button>
            <button onClick={onButtonClickJPEG}>Jpeg</button>
            <button onClick={onButtonClickSVG}>SVG</button>
          </Modal.Body>
      </MyModal>
      <button onClick={() => setModalShow(true)}> 
          <svg
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="20"
              
              viewBox="0 0 100 100"
          >
              <path d="M61.9 62.3c-.4 0-.8-.1-1.1-.4L34.1 35.2c-.2-.2-.4-.5-.4-.8l-2.1-13.1c-.1-.5.1-1 .4-1.3.3-.3.8-.5 1.3-.4l13.1 2.1c.3 0 .6.2.8.4L74 48.9c.3.3.4.7.4 1.1s-.2.8-.4 1.1l-11 11c-.3.1-.7.2-1.1.2zM36.6 33.4l25.3 25.3 8.9-8.9-25.4-25.3-10.5-1.7 1.7 10.6zm28 42.2c-.3 0-.6-.1-.9-.3l-9.2-6.7c-.4-.3-.6-.7-.6-1.1 0-.4.1-.9.4-1.2l24.1-24.1c.3-.3.7-.5 1.2-.4.4 0 .8.3 1.1.6l6.7 9.2c.4.6.4 1.4-.2 1.9L65.7 75.1c-.3.3-.7.5-1.1.5zm-6.9-8.4l6.8 4.9 19.7-19.7-4.9-6.8-21.6 21.6zm21.8 8.5c-.4 0-.8-.1-1.1-.4l-7.5-7.5c-.3-.3-.4-.7-.4-1.1s.2-.8.4-1.1l6.7-6.7c.3-.3.7-.4 1.1-.4.4 0 .8.2 1.1.4l7.5 7.5c.6.6.6 1.5 0 2.1l-6.7 6.7c-.3.3-.7.5-1.1.5zm-5.4-9l5.4 5.4 4.6-4.6-5.4-5.4-4.6 4.6zm10.2 13.8c-.4 0-.8-.1-1.1-.4l-4.8-4.8c-.6-.6-.6-1.5 0-2.1l6.7-6.7c.6-.6 1.5-.6 2.1 0l4.8 4.8c.6.6.6 1.5 0 2.1L85.3 80c-.3.3-.6.5-1 .5zm-2.7-6.3l2.7 2.7 4.6-4.6-2.7-2.7-4.6 4.6zM38.1 62.3c-.4 0-.8-.1-1.1-.4l-11-11c-.3-.3-.4-.7-.4-1.1s.2-.8.4-1.1l12-11.8c.6-.6 1.5-.6 2.1 0l11 11c.6.6.6 1.5 0 2.1L39.2 61.9c-.3.3-.7.4-1.1.4zm-8.9-12.4l8.9 8.9 9.8-9.8-8.9-8.9-9.8 9.8zM61 39.5c-.4 0-.8-.1-1.1-.4l-11-11c-.6-.6-.6-1.5 0-2.1l3.9-3.9c.2-.2.5-.4.8-.4l13.1-2.1c.5-.1 1 .1 1.3.4.3.3.5.8.4 1.3l-2.1 13.1c0 .3-.2.6-.4.8L62 39c-.3.3-.6.5-1 .5zM52.1 27l8.9 8.9 2.5-2.5 1.7-10.5-10.5 1.7-2.6 2.4zM35.4 75.6c-.4 0-.8-.1-1.1-.4L12.9 53.6c-.5-.5-.6-1.3-.2-1.9l6.7-9.2c.3-.4.7-.6 1.1-.6.4 0 .9.1 1.2.4l24.1 24.1c.3.3.5.7.4 1.2 0 .4-.3.8-.6 1.1l-9.2 6.7c-.4.1-.7.2-1 .2zM15.9 52.4l19.7 19.7 6.8-4.9-21.6-21.6-4.9 6.8zm4.6 23.3c-.4 0-.8-.1-1.1-.4l-6.7-6.7c-.6-.6-.6-1.5 0-2.1l7.5-7.5c.3-.3.7-.4 1.1-.4.4 0 .8.2 1.1.4l6.7 6.7c.3.3.4.7.4 1.1s-.2.8-.4 1.1l-7.5 7.5c-.3.1-.7.3-1.1.3zm-4.6-8.2l4.6 4.6 5.4-5.4-4.6-4.6-5.4 5.4zm-.2 13c-.4 0-.8-.1-1.1-.4l-6.7-6.7c-.6-.6-.6-1.5 0-2.1l4.8-4.8c.6-.6 1.5-.6 2.1 0l6.7 6.7c.6.6.6 1.5 0 2.1L16.8 80c-.3.3-.7.5-1.1.5zm-4.6-8.3l4.6 4.6 2.7-2.7-4.6-4.6-2.7 2.7z"></path>
          </svg>
      </button>
      
      </div>
  )
};

  export default RoundRobin;

import React,   { useState, useCallback, useRef } from "react";
import MyModal from "../ MyModal/MyModal";
import MyButton from "../button/MyButton";
import Modal from 'react-bootstrap/Modal';
import { TransformWrapper, TransformComponent } from "react-zoom-pan-pinch"; 
import { toPng, toJpeg, toSvg } from 'html-to-image'
import { FullScreen, useFullScreenHandle } from "react-full-screen";


const BracketWrapper = ({children}) => {
  const ref = useRef(null)
  const handleFullScreen = useFullScreenHandle();
  const [modalShow, setModalShow] = useState(false);

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


  return (
    <FullScreen handle={handleFullScreen}>
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
              <button onClick={handleFullScreen.enter} style={{border: 'none' }} className="px-2">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                viewBox="0 0 20 20"
                className="toolsSvg"
              >
                <path fill="none" d="M0 0H20V20H0z"></path>
                <path d="M7 2H2v5l1.8-1.8L6.5 8 8 6.5 5.2 3.8 7 2zm6 0l1.8 1.8L12 6.5 13.5 8l2.7-2.7L18 7V2h-5zm.5 10L12 13.5l2.7 2.7L13 18h5v-5l-1.8 1.8-2.7-2.8zm-7 0l-2.7 2.7L2 13v5h5l-1.8-1.8L8 13.5 6.5 12z"></path>
              </svg>
              </button>
            </div>
            <TransformComponent wrapperClass={'someText'}>

            {children}

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
    </FullScreen>
)
};
export default BracketWrapper;
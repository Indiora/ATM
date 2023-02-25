import React from 'react'
import MyButton from '../components/UI/button/MyButton';
import '../styles/App.css';


const Home = () => {
  return (
    <section className="">
      <div className="container-fluid home-div">
        <div className="row ">
          <div className="col-lg-2"></div>
          <div className="col-lg-8 col-md-12">
            <div className="row">
              <div className="col position-absolute top-50 start-0 translate-middle-y">
                <a href="/create_tournament" className='m-5 main-link'><big>Create Tournament</big></a>
                <a href="/create_bracket" className='main-link'><big>Try Bracket Generator</big></a>
              </div>
            </div>
          </div>
          <div className="col-lg-2"></div>
        </div>
      </div>
      <div className="container text-center mb-5">
          <h2 className='mb-5 pt-5'>Enjoy your game, we'll handle the rest</h2>
          <div className="row pb-5">
              <div className="col-lg-4 col-md-6">
                <div className="card">
                  <div className="card-body">
                    <h5 className="card-title">Multi stage tournaments</h5>
                    <svg
                    className='my_svg'
                    xmlns="http://www.w3.org/2000/svg"
                    width="90"
                    height="90"
                    viewBox="0 0 24 24"
                  >
                    <path d="M3.5 12c.015 0 .028-.004.042-.004l.94 4.226a2.497 2.497 0 103.345 3.173l7.182 1.197a2.491 2.491 0 103.527-2.36l1.902-8.238c.021 0 .04.006.062.006a2.5 2.5 0 10-2.03-3.95l-4.53-2.012a2.5 2.5 0 10-4.692.528L5.151 7.637A2.495 2.495 0 103.5 12zm1.018-.222a2.51 2.51 0 001.26-1.26l4.226.94c0 .014-.004.027-.004.042a2.484 2.484 0 00.416 1.377l-3.54 3.54A2.483 2.483 0 005.5 16c-.014 0-.028.004-.042.004zm7.184-2.635a2.501 2.501 0 00-1.48 1.339l-4.226-.94c0-.014.004-.027.004-.042a2.472 2.472 0 00-.247-1.065l4.096-3.072a2.477 2.477 0 001.457.617zM14 11v1a1 1 0 01-1 1h-1a1 1 0 01-1-1v-1a1 1 0 011-1h1a1 1 0 011 1zm1.173 8.605L7.99 18.408a2.483 2.483 0 00-.407-1.285l3.54-3.54a2.405 2.405 0 002.123.29l2.632 4.74a2.494 2.494 0 00-.706.992zM6 20H5a1 1 0 01-1-1v-1a1 1 0 011-1h1a1 1 0 011 1v1a1 1 0 01-1 1zm13 0v1a1 1 0 01-1 1h-1a1 1 0 01-1-1v-1a1 1 0 011-1h1a1 1 0 011 1zm-1.438-1.994c-.02 0-.04-.006-.062-.006a2.466 2.466 0 00-.747.127l-2.632-4.74a2.411 2.411 0 00.784-2.53l3.638-1.82a2.502 2.502 0 00.92.731zM20 6h1a1 1 0 011 1v1a1 1 0 01-1 1h-1a1 1 0 01-1-1V7a1 1 0 011-1zm-1.939.963a2.301 2.301 0 00.034 1.18l-3.638 1.82a2.483 2.483 0 00-1.763-.943l-.396-3.163a2.499 2.499 0 001.231-.908zM10 4V3a1 1 0 011-1h1a1 1 0 011 1v1a1 1 0 01-1 1h-1a1 1 0 01-1-1zM2 9a1 1 0 011-1h1a1 1 0 011 1v1a1 1 0 01-1 1H3a1 1 0 01-1-1z"></path>
                    <path fill="none" d="M0 0h24v24H0z"></path>
                  </svg>
                  </div>
                </div>
              </div>
              <div className="col-lg-4 col-md-6">
                <div className="card">
                  <div className="card-body">
                    <h5>Export to image</h5>
                    <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="90"
                    height="90"
                    className='my_svg'
                    viewBox="0 0 24 24"
                  >
                    <path d="M23 13H13v10h10zm-9 9v-5h5v2h-2v1h2v2zm8 0h-2v-5h2zm0-6h-8v-2h8zM11 1H1v10h10zm-.519 7.085l-.1-.008c-.133-.01-.252-.039-.381-.056V10H5.956c.019.067.043.13.058.2H4.981c-.023-.071-.062-.131-.089-.2H2V7.266a3.707 3.707 0 00-.108-.046l-.093-.035-.166-1.129.367.138V2h2.053a7.315 7.315 0 01-.094-.422l-.016-.1.989-.155.015.1c.007.04.042.254.126.577H10v5.014c.152.024.299.054.46.067l.1.008zm-.021-1.004l.1.008-.079.996-.1-.008c-.133-.01-.252-.039-.381-.056C5.759 7.455 4.385 3.332 4.053 2a7.315 7.315 0 01-.094-.422l-.016-.1.989-.155.015.1c.007.04.042.254.126.577C5.42 3.328 6.603 6.488 10 7.014c.152.024.299.054.46.067zM5.956 10c.019.067.043.13.058.2H4.981c-.023-.071-.062-.131-.089-.2A5.654 5.654 0 002 7.266a3.707 3.707 0 00-.108-.046l-.093-.035-.166-1.129.611.229c.14.052 2.995 1.168 3.712 3.715zM23 9V1H13v10h10zm-1-7v6h-4V7h2V5h1V2zm-3 3v1h-5V4h3v1zm1-3v2h-2V2zm-6 0h3v1h-3zm0 8V7h3v2h5v1zM1 23h10V13H1zm1-1v-1.614A4.076 4.076 0 003.313 20a2.44 2.44 0 00.6-1.413c.125-1.22.36-1.595 1.65-1.586a1.976 1.976 0 011.8 1.003c1.01.879 1.552 1.282 2.292 1.048a3.123 3.123 0 01.345-.08V22zm8-8v3.937a9.113 9.113 0 00-.646.161c-.501.159-.765-.247-1.528-.99a2.738 2.738 0 00-2.224-1.066 2.538 2.538 0 00-2.39 1.045c-.306.453.01 1.248-.5 2.038a1.199 1.199 0 01-.712.192V14z"></path>
                    <path fill="none" d="M0 0h24v24H0z"></path>
                  </svg>
                  </div>
                </div>
              </div>
              <div className="col-lg-4 col-md-6">
                <div className="card">
                  <div className="card-body">
                    <h5>Time managment</h5>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="90"
                      height="90"
                      className='my_svg'
                      viewBox="0 0 24 24"
                    >
                      <path d="M12 1.282a10.712 10.712 0 019 4.917V2h1v6h-6V7h4.508a9.862 9.862 0 101.373 5h.838A10.719 10.719 0 1112 1.282zM16 13h-4V7h-1v7h5z"></path>
                      <path fill="none" d="M0 0h24v24H0z"></path>
                    </svg>
                  </div>
                </div>
              </div>
          </div>
      </div>

      <div className="container text-center">
          <h2 className='mb-5'>Support various types of tournaments</h2>
          <div className="row pb-5">
              <div className="col"></div>
              <div className="col-lg-3 col-md-6">
                <div className="card">
                  <div className="card-body">
                    <h5>Single Elimination</h5>
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="90"
                        height="90"
                        className='my_svg'
                        viewBox="0 0 32 32"
                      >
                        <path d="M27.738 26.227l-2.758-3.235-2.519-.338-5.669-6.707 5.412-6.259-.604-.523-5.102 5.9V5.681h-.799v8.972l-4.711-5.572-.61.516 5.321 6.294v.098L9.98 22.602l-2.732.367-2.768 3.246 1.719.759-.585.677.604.523.602-.696 1.042 1.624 2.768-3.246-.052-2.723 5.121-5.922v5.74l-1.922 2.168v4.43l1.922-.581v1.154h.799v-1.139l1.896.567v-4.43l-1.896-2.114v-6.169l5.169 6.115-.056 2.916 2.758 3.235 1.078-1.679.71.839.61-.516-.671-.794zM9.44 10.664l-.589-3.165 3.06 1.083 1.445-.634L7.4 5.84l1.155 6.205zm14.223 1.38l1.155-6.205-5.956 2.109 1.492.655 3.119-1.104-.613 3.294zm-7.577-8.546l1.4 2.422 1.759.53L16.083.98l-3.149 5.47 1.759-.532z"></path>
                    </svg>
                  </div>
                </div>
              </div>
              <div className="col-lg-3 col-md-6">
                <div className="card">
                  <div className="card-body">
                    <h5>Round Robin</h5>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="90"
                      height="90"
                      className='my_svg'
                      viewBox="0 0 32 32"
                    >
                      <path d="M10.566 26.765a3.317 3.317 0 01-3.773 2.495l-1.177 1.759h6.421l1.18-4.402a2.284 2.284 0 01-1.43.501c-.449 0-.867-.129-1.221-.352zm9.779-6.455a5.5 5.5 0 00.569-.641l9.962 6.702v-6.457l-8.959-2.419a5.6 5.6 0 00.117-.856l4.744.33a1.749 1.749 0 112.656.184l1.441.1v-5.357l-9.192 2.445c-.1-.264-.22-.519-.357-.762l9.549-4.698V1.04h-.213l-2.548 2.548a2.077 2.077 0 11-2.579 2.579L21.402 10.3a1.95 1.95 0 01-.476 2.671 5.56 5.56 0 00-3.049-2.041 1.956 1.956 0 012.585-1.373l5.729-8.516h-6.457l-2.641 9.746a5.561 5.561 0 00-.608-.033l-.07.001.658-9.714h-5.357l.515 1.929a3.061 3.061 0 011.486 5.56l.701 2.622a5.498 5.498 0 00-.596.281l-1.188-2.427a3.057 3.057 0 01-3.728-2.987c0-.95.432-1.798 1.111-2.36L8.736 1.041H.895v.213l11.403 11.403a5.517 5.517 0 00-.378.484L.895 5.724v6.457l2.556.688a2.077 2.077 0 113.742 1.007l3.907 1.052c-.051.2-.091.404-.12.611L.894 14.84v5.357L11.055 17.5c.045.205.101.406.167.602L.894 23.141v7.876h.213l3.367-3.359a3.316 3.316 0 014.542-4.53l3.231-3.223c.147.173.305.338.473.492l-1.465 2.188a2.296 2.296 0 012.665 1.394l.657-2.45c.236.086.479.156.729.21l-.647 9.276h5.357l-2.444-9.258a5.47 5.47 0 00.798-.222l2.498 5.119a2.077 2.077 0 111.533 3.142l.595 1.219h7.876v-.177L20.34 20.306z"></path>
                    </svg>
                  </div>
                </div>
              </div>
              <div className="col-lg-3 col-md-6">
                <div className="card">
                  <div className="card-body">
                    <h5 className="card-title">Double Elimination</h5>
                    <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="90"
                    height="90"
                    className='my_svg'
                    viewBox="0 0 32 32"
                  >
                    <path d="M.545 3.105zm15.26 12.06l3.865 3.865 3.891 3.839 3.813 3.865 3.863 3.812v-4.548L13.314 8.075l2.66-2.66-1.726-1.726L9.937 8a15.13 15.13 0 01-3.825-2.774A14.633 14.633 0 013.007.645C1.777 1.015.943 1.819.546 3.106c3.101 1.327 5.817 3.902 7.357 6.93l-4.212 4.212 1.726 1.726 2.687-2.687 17.595 17.595h1.73l-.286-.05-.593-3.273-3.272-.593-.567-3.247-3.273-.593-.593-3.272-3.273-.593-.592-3.273-3.247-.567-.773-4.278 1.134.206-.026.026 3.736 3.788z"></path>
                  </svg>
                  </div>
                </div>
              </div>
              <div className="col"></div>
          </div>
      </div>
      <div className="container text-center mb-5">
        <div className="row pb-5">
        <div className="col"></div>
            <div className="col-lg-3 col-md-6">
                  <div className="card">
                    <div className="card-body">
                      <h5 className="card-title">Swiss</h5>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="90"
                        height="90"
                        className='my_svg'
                        viewBox="0 0 32 32"
                      >
                        <path d="M29.723 10.691l.77-.771-6.823-6.823-.77.77 1.849 2.994-1.593 1.593 1.291 1.291-2.045-.537-.687.687 1.313 1.313-2.08-.546-.674.674 1.334 1.335-2.114-.555-3.551 3.551-8.824-8.824 1.867-2.976-.77-.77L1.393 9.92l.77.771 2.994-1.849 1.475 1.475 1.31-1.31-.544 2.075.676.676 1.332-1.332-.554 2.11.663.663 1.354-1.353-.563 2.144 3.657 3.657L5.49 26.12l-1.345 3.332L7.471 28.1l8.473-8.473 8.474 8.474 3.332 1.345-1.352-3.326-8.474-8.474 8.824-8.824z"></path>
                      </svg>
                    </div>
                  </div>
            </div>
        <div className="col"></div>
        </div>
      </div>

      <div className="container text-center mb-5">
          <h2>Providing the right tools for the gaming community</h2>
          <p>
            We aim to keep things simple, but there's plenty more to explore in your website.
          </p> 
          <MyButton className='btn pb-5'><a href="/register"><h5>Sign up</h5></a></MyButton>
      </div>
    </section>
  )
}

export default Home
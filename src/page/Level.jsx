import React from 'react'
import MyClick from "../sound/click.wav"
import "../App.css"
import { useNavigate } from 'react-router-dom'

function Level() {
    const navigate=useNavigate()
    const click=new Audio(MyClick);

    const music = require("../sound/music.mp3");
    const Hard=(()=>{
      click.play();
        navigate("/main",{state:8})
    })
    const Normal=(()=>{
      click.play();
        navigate("/main",{state:4})
    })
    const wh=window.screen.height;
    const reScale=wh-30;
    const winHight=`${reScale}px`
  return (
    <>
    <div style={{height:winHight}} id="level-box-main">
    <audio src={music}  autoPlay />
        <div className="level-box">
          <input
            className="normal"
            type="button"
            value="Normal"
            onClick={()=>Normal()}
          ></input>
          <input
            className="hard"
            type="button"
            value="Hard"
            onClick={()=>Hard()}
          ></input>
        </div>
      </div>
    </>
  )
}

export default Level
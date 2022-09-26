import React,{useState,useEffect} from "react";
import { useNavigate } from "react-router-dom";
import {Typography} from '@mui/material'
import MyClick from "../sound/click.wav"
import "../App.css"

function StartGame() {
    const navigate=useNavigate()

    const click=new Audio(MyClick);
    const music = require("../sound/music.mp3");


  const Play = () => {
    
    click.play();
    navigate("./level")
  };
  const wh=window.screen.height;
  const reScale=wh-30;
  const winHight=`${reScale}px`
  return (
    <>
      <div style={{height:winHight}} id="play-box-main">
      <audio src={music}  autoPlay />
        <div className="startgame-logo-wrapper">
          <img className="snack-img-01" alt="snack-img" src="./pngegg.png"></img>
          
        </div>
        
        <div className="play-box">
          <input
            className="showPlay"
            type="button"
            onClick={() => Play()}
            value="Play"
          ></input>
        </div>
      </div>
    </>
  );
}

export default StartGame;

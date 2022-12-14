import React from "react";
import ArrowDropUpIcon from "@mui/icons-material/ArrowDropUp";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import ArrowLeftIcon from "@mui/icons-material/ArrowLeft";
import ArrowRightIcon from "@mui/icons-material/ArrowRight";
import { useLocation } from "react-router-dom";
import { Button, Typography } from "@mui/material";
import Sbite from "../sound/bite.mp3";
import MyStart from "../sound/start.wav";
import "../App.css";

function Main() {
  const data = useLocation();
  console.log(data.state);
  let bite = new Audio(Sbite);
  let gameStart = new Audio(MyStart);
  var higestScore = localStorage.getItem("Myscore");
  var score = 0;
  let inputDir = { x: 0, y: 0 };
  let lastPaintTime = 0;
  let snackAry = [{ x: 2, y: 2 }];
  let food = { x: 5, y: 10 };
  gameStart.play();
  function main(ctime) {
    window.requestAnimationFrame(main);
    if ((ctime - lastPaintTime) / 1000 < 1 / data.state) {
      return;
    }
    lastPaintTime = ctime;
    gameEngine();
  }

  //Collide code
  /* function isCollide(snack){
    for (let i = 1; i < snackAry.length; i++) {
      if(snack[i].x===snack[0].x ||snack[i].y===snack[0].y){
        return true;
      }
    }*/

  //Game Logical code
  function gameEngine() {
    /* if(snackAry[0].x>=18 ||snackAry[0].x<=0 || snackAry[0].y>=18 ||snackAry[0].y<=0){
      inputDir = { x: 0, y: 0 };
      window.alert("Game Over");
      snackAry = [{ x: 13, y: 15 }];
      score=0;
    } */

    //Eaten food code and Increament snack val
    var scoreBord = document.getElementById("score-main");
    scoreBord.innerHTML = `Score:${score}`;
    if (snackAry[0].y === food.y && snackAry[0].x === food.x) {
      bite.play();
      snackAry.unshift({
        x: snackAry[0].x + inputDir.x,
        y: snackAry[0].y + inputDir.y,
      });
      let a = 1;
      let b = 17;
      score = score + 1;

      food = {
        x: Math.round(a + (b - a) * Math.random()),
        y: Math.round(a + (b - a) * Math.random()),
      };
      localStorage.setItem("Myscore", score);
      scoreBord.innerHTML = `Score:${score}`;
    }
    //Moving snack logic
    for (let i = snackAry.length - 2; i >= 0; i--) {
      snackAry[i + 1] = { ...snackAry[i] };
    }
    snackAry[0].x += inputDir.x;
    snackAry[0].y += inputDir.y;

    var bord = document.getElementById("bord");
    bord.innerHTML = "";

    //Head part

    snackAry.forEach((h, i) => {
      var snackElement = document.createElement("div");
      snackElement.style.gridRowStart = h.y;
      snackElement.style.gridColumnStart = h.x;

      if (i === 0) {
        if (inputDir.y === -1) {
          snackElement.classList.add("up");
        } else if (inputDir.y === 1) {
          snackElement.classList.add("down");
        } else if (inputDir.x === 1) {
          snackElement.classList.add("right");
        } else if (inputDir.x === -1) {
          snackElement.classList.add("left");
        } else {
          snackElement.classList.add("head");
        }
      } else {
        snackElement.classList.add("snack");
      }
      bord.appendChild(snackElement);
    });

    //Food part

    var foodElement = document.createElement("div");
    foodElement.style.gridRowStart = food.y;
    foodElement.style.gridColumnStart = food.x;

    foodElement.classList.add("food");
    bord.appendChild(foodElement);
  }
  window.requestAnimationFrame(main);

  window.addEventListener("keydown", (e) => {
    inputDir = { x: 0, y: 1 }; //start game

    switch (e.key) {
      case "ArrowUp":
        inputDir.x = 0;
        inputDir.y = -1;
        break;
      case "ArrowDown":
        inputDir.x = 0;
        inputDir.y = 1;
        break;
      case "ArrowRight":
        inputDir.x = 1;
        inputDir.y = 0;
        break;
      case "ArrowLeft":
        inputDir.x = -1;
        inputDir.y = 0;
        break;
      default:
        break;
    }
  });

  const Top = () => {
    inputDir.x = 0;
    inputDir.y = -1;
  };
  const Down = () => {
    inputDir.x = 0;
    inputDir.y = 1;
  };
  const Right = () => {
    inputDir.x = 1;
    inputDir.y = 0;
  };
  const Left = () => {
    inputDir.x = -1;
    inputDir.y = 0;
  };
  const wh = window.screen.height;
  const reScale = wh-30;
  const winHight = `${reScale}px`;
  return (
    <>
      <div style={{ height: winHight }} className="main">
        <div id="highest-score">Highest Score:{higestScore}</div>
        <div id="score-main"></div>
        <div id="bord" className="main-contain"></div>
        <div>
          <img className="snack-img" alt="snack-img" src="./pngegg.png"></img>
        </div>
        <div className="mobile-btn">
          <div className="left-right-top-btn">
            <div className="top-btn-main">
              <Button onClick={() => Top()} id="top-btn">
                <ArrowDropUpIcon
                  sx={{
                    backgroundColor: "rgba(15, 15, 15,.5)",
                    border: "2px solid grey",
                    fontSize: "60px",
                  }}
                />
              </Button>
            </div>
            <div className="left-right-btn">
              <Button onClick={() => Left()} id="top-btn">
                <ArrowLeftIcon
                  sx={{
                    backgroundColor: "rgba(15, 15, 15,.5)",
                    border: "2px solid grey",
                    fontSize: "60px",
                  }}
                />
              </Button>
              <Button onClick={() => Right()} id="top-btn">
                <ArrowRightIcon
                  sx={{
                    backgroundColor: "rgba(15, 15, 15,.5)",
                    border: "2px solid grey",
                    fontSize: "60px",
                  }}
                />
              </Button>
            </div>
          </div>
          <div className="top-down-btn">
            <div className="down-btn-main">
              <Button onClick={() => Down()} id="top-btn">
                <ArrowDropDownIcon
                  sx={{
                    backgroundColor: "rgba(15, 15, 15,.5)",
                    border: "2px solid grey",
                    fontSize: "60px",
                  }}
                />
              </Button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Main;

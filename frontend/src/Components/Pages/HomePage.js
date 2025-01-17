/* eslint-disable import/named */
/* eslint-disable no-console */
/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable import/no-unresolved */
/* eslint-disable no-plusplus */
/* eslint-disable prefer-const */
/* eslint-disable no-unused-vars */
/* eslint-disable import/newline-after-import */
import { gsap } from 'gsap';
import Navigate from '../Router/Navigate';
import { clearPage ,makeOverflowAuto} from '../../utils/render';
import {  isAuthenticated } from '../../utils/auths';
import { setTypeGame } from '../../utils/games';
import { readUsersScore } from '../../models/games';

const main = document.querySelector('main');
const div = document.createElement('div');
const div2 = document.createElement('div');
const div3 = document.createElement('div');
const div4 = document.createElement('div');
const div5 = document.createElement('div');
const divScoreTable = document.createElement('div');

const HomePage = () => {
  clearPage();
  makeOverflowAuto()
  getHomePage();
  animation();
};

/**
* function that display the HomePage
*/
async function getHomePage() {
    // If the user is disconnected
    if (!isAuthenticated()) {
      divScoreTable.style.display = 'none';
      div.id = 'divHome';
      div2.id = 'divHome2';
      div3.id = 'divHome2';
      div4.id = 'divHome2';
      div5.id = 'divHome2';

      // Ranked game button
      div.innerHTML = `       
            <button type="submit" id="buttonGame" class="buttonClass Class btn btn-primary  ">
            Ranked Game? <u> Log in </u>
            </button> `;
      div.addEventListener('click', () => {
            Navigate('/login');
      }); 
    }else{
        div.id = 'divHomeConnected';
        div.className = 'anim';
        div2.id = 'divHomeConnected';
        div3.id = 'divHomeConnected';
        div4.id = 'divHomeConnected';
        div5.id = 'divHomeConnected';

        // Ranked game button
        div.innerHTML = `       
        <button type="submit" id="buttonGame" class="buttonClass Class btn btn-primary  ">
        Ranked Game
        </button> `;

        div.addEventListener('click', () => {
            setTypeGame('competition');
            Navigate('/game');
        });
        
        // Top Score table
        const usersScore = await readUsersScore();
        const table = getScoreTable(usersScore);
        
        divScoreTable.id = 'divScoreTable';
        divScoreTable.className = 'anim';
        divScoreTable.innerHTML = table;
        divScoreTable.style.display = '';

        main.appendChild(divScoreTable)
    }

    // Quick game button
    div2.innerHTML = `
    <button type="submit" id="buttonGame" class="buttonClass Class btn btn-primary  ">
    Quick Game
    </button>`

    div2.addEventListener('click', () => {
        setTypeGame('quick');
        Navigate('/game');
    });

    // Troll game button
    div4.innerHTML = `
        <button type="submit" id="buttonGame" class="buttonClass Class btn btn-primary  ">
        Troll Game
        </button>`;
    div4.addEventListener('click', () => {
        setTypeGame('troll');
        Navigate('/game');
    });

    // Tutorial button
    div3.innerHTML = `
        <button type="submit" id="buttonTutorial" class="buttonClass Class btn btn-primary  ">
        Tutorial
        </button>`;
    div3.addEventListener('click', () => {
      Navigate('/tutoriel');
    });

    main.appendChild(div);
    div5.appendChild(div2);
    div5.appendChild(div4);
    main.appendChild(div5);
    main.appendChild(div3);
  
}

/*
**function that display the top score table
*/
function getScoreTable(playersScore) {
  let numPlayer = 1;
  let scoreTable = `
          <table class="table table-striped">
          <thead class="table-dark">
            <tr>
              <th colspan="3" style="text-align: center;">Top Score</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <th>N°</th>
              <th>Player</th>
              <th>Score</th>
            </tr>`;
  playersScore.forEach((element) => {
    scoreTable += `
              <tr>
                <td> ${numPlayer}</td>
                <td>${element.username}</td>
                <td>${element.best_score}</td>
              </tr>`;
    numPlayer++;
  });
  return scoreTable;
}


/*
**function that do the button animation in the home page no connected
*/
function animation() { 

  gsap.from('#divHome', {
    opacity: 0.1,
    x: 600,
    duration: 2,
  });
  gsap.from('#divHome2', {
    opacity: 0.1,
    x: -200,
    duration: 2,
  });

 
}
export default HomePage;

/* eslint-disable no-plusplus */
/* eslint-disable prefer-const */
/* eslint-disable no-unused-vars */
/* eslint-disable import/newline-after-import */
import Navigate from '../Router/Navigate';
import { clearPage } from '../../utils/render';
import { isAuthenticated } from '../../utils/auths';
import { setTypeGame } from '../../utils/games';
import readUsersScore from '../../models/games';

const main = document.querySelector('main');
const divAll = document.createElement("div");
const div = document.createElement("div");
const div2 = document.createElement("div");
const div3 = document.createElement("div");
const divScoreTable = document.createElement('div');



const HomePage = async () => {
  clearPage();

  if (!isAuthenticated()) {
    const usersScore = await readUsersScore();
    const table = getScoreTable(usersScore);
    divScoreTable.id = 'divScoreTable';
    divScoreTable.innerHTML = table;
    divAll.appendChild(divScoreTable);
    main.appendChild(divAll);
    getHomePageConnected();
  }

  else {
    getHomePageDisconnected();
  }
  
};



// If the user is disconnected
function getHomePageDisconnected() {

  divScoreTable.style.display = 'none';
  div.id = 'divHome';
  div2.id = 'divHome2';
  div3.id = 'divHome3';


  // Ranked game button
  div.innerHTML = `       
  <button type="submit" id="buttonGame" class="buttonClass Class btn btn-primary  ">
  Ranked Game
  </button> `;
  div.addEventListener('click', () => {
    if (isAuthenticated()) {
      Navigate('/game');
    } else {
      setTypeGame("competition");
      Navigate('/game');
    }
  });


  // Quick game button
  div2.innerHTML = `
  <button type="submit" id="buttonGame" class="buttonClass Class btn btn-primary  ">
  Quick Game
  </button>`
  div2.addEventListener('click', () => {
    setTypeGame("quick")
    Navigate('/game');
  });


  // Tutorial button
  div3.innerHTML = `
    <button type="submit" id="buttonTutorial" class="buttonClass Class btn btn-primary  ">
    Tutorial
    </button>`
  div3.addEventListener('click', () => {
    Navigate('/tutoriel');
  });

  main.appendChild(div);
  main.appendChild(div2);
  main.appendChild(div3);
};


// If the user is connected
function getHomePageConnected() {

  // 'div' with the game buttons and the score table
  divAll.id = 'divAll';

  // Ranked game button
  div.id = 'divHomeConnected';
  div.innerHTML = `       
      <button type="submit" id="buttonGame" class="buttonClass Class btn btn-primary  ">
      Ranked Game
      </button> `;
  div.addEventListener('click', () => {
    if (isAuthenticated()) {
      Navigate('/game');
    } else {
      setTypeGame("competition")
      Navigate('/game');
    }

  });
  divAll.appendChild(div);



  // Quick game button
  div2.id = 'divHomeConnected'
  div2.innerHTML = `
      <button type="submit" id="buttonGame" class="buttonClass Class btn btn-primary  ">
      Quick Game
      </button>`
  div2.addEventListener('click', () => {
    setTypeGame("quick")
    Navigate('/game');
  });
  divAll.appendChild(div2);


  // Tutorial button
  div3.id = 'divHomeConnected'
  div3.innerHTML = `
        <button type="submit" id="buttonTutorial" class="buttonClass Class btn btn-primary  ">
        Tutorial
        </button>`
  div3.addEventListener('click', () => {
    Navigate('/tutoriel');
  });
  divAll.appendChild(div3);
/** 
  divScoreTable.id = 'divScoreTable';
  divScoreTable.innerHTML = scoreTable;
  divAll.appendChild(divScoreTable);
  main.appendChild(divAll);
*/
};

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
              </tr>`
              numPlayer ++;
            });
    return scoreTable;
};

export default HomePage;

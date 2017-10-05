<template>
  <div id="app">
    <section class="row">
      <div >
        <h1 class="text-center">High Score: {{highScore}}</h1>
        <h2 class = "text-center">Money: {{money}}</h2>
        <div class="wins">
          <!-- displays a bar in proportion to what the current score is compare to what the high score is-->
          <div class="wins text-center" style="background-color: green; margin: 0; color: white;" :style="{width: displayBar+'%'}">
            {{money}}/{{highScore}}
          </div>
        </div>
      </div>
    </section>
    <template>
      <section class="row controls" v-if="startScreen">
        <div class="small-12 columns" >
          <button id="start-game" @click = "restart()">START NEW GAME</button>
        </div>
      </section>
      <section class="row controls" v-else>
        <div class="small-12 columns" >
          <button id="rock" @click = "compare('Rock')">ROCK</button>
          <button id="paper" @click="compare('Paper')">PAPER</button>
          <button id="scissors" @click="compare('Scissors')">SCISSORS </button>
          <button id="restart" @click="restart()">RESTART</button>
        </div>
        <br>
        <div>
          Bet: {{bet}}
          <br>
          <!-- slider bar that the player uses to choose their bet value-->
          <input type="range" step="1" v-model.number="bet" :min="minimumBet" :max="money">
        </div>
      </section>
    </template>
    <section class="row log" v-if="results.length != 0">
      <div class="small-12 columns">

        <ul>
          <li v-for="values in results" :class="values.winner + '-turn'">
            {{values.text}}
          </li>
        </ul>
      </div>
    </section>
  </div>
</template>

<script>
export default {
  name: 'app',
  data() {
    return{
      startScreen: true,    //if true it will display the start game button
      results:[],           //array of the results of each round, is filled with objects that have the outputted sentence and the winner
      money: 100,           //money used for betting
      bet: 1,               //current bet
      highScore: 100,       //current highscore
      minimumBet: 1,        //minimum value the player can bet
      computerChoices: [],   //array that is filled with the computers predertimined choices
      displayBar: 100       //used for the bar diplaying the players current money in proportion to the high score, use it so the bar won't go past 100

    }

  },
  computed:{
    //---------------------------------------------
    //This function runs when the game ends. It checks to see if there was
    //a new high score and handles it. It then sets the startScreen to true
    //---------------------------------------------
    endGame: function(){
      if(this.money > this.highScore){
        this.highScore = this.money;
        alert("You got a new high score!\nHigh Score: " + this.money);
      }
      else if(this.money <= 0){
        alert("You ran out of money!");
      }
      else{
        alert("Good try!\nScore: " + this.money);
      }
      this.startScreen = true;



    },
    //-----------------------------------------------
    //The populates the computer choices. It picks a random choice (rock, paper, or scissors)
    //and checks if that choice hasn't been choosen 3 times already. If it hasn't it adds it
    //to the array
    //-----------------------------------------------
    computerChoose: function(){
      var rand = Math.floor((Math.random() * 3));
      var rocks = 3;
      var papers = 3;
      var scissors = 3;
      var counter = 8;

      while(counter >= 0){
        rand = Math.floor(Math.random() * 3);

        if(rand === 0 && rocks > 0){
          this.computerChoices.push("Rock");
          counter--;
          rocks--;
        }
        else if(rand === 1 && papers>0){
          this.computerChoices.push("Paper");
          counter--;
          papers--;
        }
        else if(rand === 2 && scissors >0){
          this.computerChoices.push("Scissors");
          counter--;
          scissors--;
        }
      }


    },

    //-----------------------------------------
    //Resets all of the global variables to their default values
    //-----------------------------------------
    restart: function(){
      this.startScreen = false;
      this.results = [];
      this.money = 100;
      this.bet = 1;
      this.minimumBet = 1;
      this.computerChoices = [];
      this.computerChoose();
      this.displayBar = (100/this.highScore) *100
    }

  },
  methods: {
    //--------------------------------------------
    //This method is called when the player clicks the rock, paper, or scissors buttons.
    //It then pops the next value from the computerChoices array and compares it with the
    //players choice. It determines who won and stores the text that should be displayed and
    //who the winner was in the results array. It then checks if the game is over
    //--------------------------------------------
    compare: function(player){

      var computer = this.computerChoices.pop();
      var outcome = {};

      if((player === "Rock" && computer === "Scissors") || (player === "Paper" && computer === "Rock") || (player === "Scissors" && computer === "Paper")){
        outcome.text = player + " beats " + computer + "| Player point!";
        outcome.winner = 'player';
        this.playerScore++;
        this.money += this.bet;
        this.minimumBet = 1;

      }
      else if((player === "Rock" && computer === "Paper") || (player === "Paper" && computer === "Scissors") || (player === "Scissors" && computer === "Rock")) {
        outcome.text = computer + " beats " + player + " | Computer point!";
        outcome.winner = 'computer';
        this.computerScore++;
        this.money -= this.bet;
        this.minimumBet = 1;
      }
      else{
        outcome.text = "You Tie!";
        outcome.winner = 'tie';
        this.bet = this.bet * 2;
        this.minimumBet = this.bet;
      }

      if(this.minimumBet > this.money){
        this.minimumBet = this.money;
      }
      if(this.bet > this.money){
        this.bet = this.money;
      }

      outcome.text = "The computer chose " + computer + " | " + outcome.text;

      this.results.unshift(outcome);



      if(this.money < this.highScore){
        this.displayBar = (this.money/this.highScore) * 100;
      }
      else{
        this.displayBar = 100;
      }

      if(this.computerChoices.length === 0 || this.money <= 0) {
        this.endGame();
      }
    }

  }
}
</script>

<style lang="scss">
  .text-center {
    text-align: center;
  }

  .wins {
    width: 80%;
    color: black;
    height: 40px;
    background-color: #eee;
    margin: auto;
    transition: width 1000ms;
  }

  .controls, .log {
    margin-top: 30px;
    text-align: center;
    padding: 10px;
    border: 1px solid #ccc;
    box-shadow: 0px 3px 6px #ccc;
  }

  .turn {
    margin-top: 20px;
    margin-bottom: 20px;
    font-weight: bold;
    font-size: 22px;
  }

  .log ul {
    list-style: none;
    font-weight: bold;
    text-transform: uppercase;
  }

  .log ul li {
    margin: 5px;
  }

  .log ul .player-turn {
    color: green;
    background-color: #aaffb0;
  }

  .log ul .computer-turn {
    color: red;
    background-color: #ffc0c1;
  }

  .log ul .tie-turn {
    color: blue;
    background-color: #e4e8ff;
  }

  button {
    font-size: 20px;
    background-color: #eee;
    padding: 12px;
    box-shadow: 0 1px 1px black;
    margin: 10px;
  }

  #start-game {
    background-color: #e4e8ff;
  }

  #start-game:hover {
    background-color: #687eff;
  }

  #rock {
    background-color: #ff7367;
  }

  #rock:hover {
    background-color: #ff3f43;
  }

  #paper {
    background-color: #ffaf4f;
  }

  #paper:hover {
    background-color: #ff9a2b;
  }

  #scissors {
    background-color: #aaffb0;
  }

  #scissors:hover {
    background-color: #76ff7e;
  }

  #restart {
    background-color: #ffffff;
  }

  #restart:hover {
    background-color: #c7c7c7;
  }
</style>

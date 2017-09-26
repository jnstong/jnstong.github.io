new Vue({
  el: '#app',
  data: {
      first: true,
      results:[],
      playerScore: 0,
      computerScore: 0,
      money: 100,
      bet: 1,



  },
  computed:{

  },
  methods: {
      compare: function(player){

          var computer = this.computerChoose();

          var outcome = {};

          if((player === "Rock" && computer === "Scissors") || (player === "Paper" && computer === "Rock") || (player === "Scissors" && computer === "Paper")){
              outcome.text = player + " beats " + computer + "| Player point!";
              outcome.winner = 'player';
              this.playerScore++;
              this.money += this.bet;

          }
          else if((player === "Rock" && computer === "Paper") || (player === "Paper" && computer === "Scissors") || (player === "Scissors" && computer === "Rock")) {
              outcome.text = computer + " beats " + player + " | Computer point!";
              outcome.winner = 'computer';
              this.computerScore++;
              this.money -= this.bet;
          }
          else{
              outcome.text = "You Tie!";
              outcome.winner = 'tie';
              this.bet = this.bet * 2;
          }

          outcome.text = "The computer chose " + computer + " | " + outcome.text;

          this.results.unshift(outcome);

          if(this.playerScore === 10){
              if(confirm("You win!\nDo you want to start a new game?")){
                  this.restart();
              }
              else{
                  this.first = true;
              }
          }
          else if(this.computerScore === 10){
              if(confirm("Computer wins!\nDo you want to start a new game?")){
                  this.restart();
              }
              else{
                  this.first = true;
              }


          }
      },

      computerChoose: function(){
          switch(Math.floor((Math.random() * 3) + 1)){
              case 1:
                  return "Rock";
                  break;
              case 2:
                  return "Paper";
                  break;
              case 3:
                  return "Scissors";
                  break;
              default:
                  return "Error";

          }
      },

      restart: function(){
          this.first = false;
          this.playerScore = 0;
          this.computerScore = 0;
          this.results = [];
          console.log("restarting");
      }
  }
});
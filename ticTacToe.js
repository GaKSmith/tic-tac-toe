var ticTacArray = [0,0,0,0,0,0,0,0,0];
var ticTacToeMatrix = [['-','-','-'],
                           ['-','-','-'],
                           ['-','-','-']];
var playersTurn = "player1";

$(function() {
    console.log("test");
    var gameOver = false;
    var playAgainstComputer = prompt("Play against another playAgainstComputer?");


    $(".tic-tac-toe").click(function()
    {   if ($(this).text()!=="X" && $(this).text()!=="O" && gameOver === false)
        {
            var row = $(this).data("row");
            var col = $(this).data("column");

            underlinePlayer(playersTurn);
            if (playersTurn === "player1")
            {
                var playersChoice = 'X';
                $(this).css("color","red");
                playersTurn = "player2";
                monger = "Mongerrrrrrrr!!!";
            }
            else if (playersTurn === "player2")
            {
                if (playAgainstComputer === "no")
                {
                    var playersChoice = 'O';
                    $(this).css("color","blue");
                    playersTurn = "player1";  
                }                             
            }
            ticTacToeMatrix[col][row] = playersChoice;
            $(this).text(playersChoice);
            checkIfThreeInARow();
            if(playAgainstComputer === 'yes')
            {
                ai($(this));
            }
        }
    });

    function updateBoard(col,row,playersChoice,thiss)
    {
        ticTacToeMatrix[col][row] = playersChoice;
        $(thiss).text(playersChoice);
        checkIfThreeInARow();
    }
    function underlinePlayer(player)
    {
        if (player === 'player1')
        {
            $(".player1").css("text-decoration","underline");
            $(".player2").css("text-decoration","none");                        
        }
        else if(player === 'player2')
        {
            $(".player2").css("text-decoration","underline");
            $(".player1").css("text-decoration","none");                  
        }
    }
    function makeMatrix(array)
    {
        // make function that takes in a number and returns where its x y position is
    }
    function gameFinished(player)
    {
        gameOver = true;
        var color = {"1" : "red","2": "blue"};
        $(".player").css("visibility","hidden");
        $(".winner").css("color", color[player]);
        $(".winner").text("Player " + player + " is the winner!!");
    }
    function checkIfThreeInARow()
    {
        checkVerticalThree();
        checkHorizontalThree();
        checkDiagonalThree();

        function checkVerticalThree()
        {
            ticTacToeMatrix.forEach(function(value,index){
                checkColumn(index);
            });

            function checkColumn(index)
            {
                function testIfTrue(playerMove)
                {
                    return (playerMove === ticTacToeMatrix[index][0] && playerMove === ticTacToeMatrix[index][1] && playerMove === ticTacToeMatrix[index][2]);
                }
                if (testIfTrue('X') || testIfTrue('O'))
                {
                    if (ticTacToeMatrix[index][0] === 'X')
                    {
                        gameFinished(1);
                    }
                    else if(ticTacToeMatrix[index][0] === 'O')
                    {
                        gameFinished(2);
                    }
                } 
            }
        }
        function checkHorizontalThree()
        {
            ticTacToeMatrix[0].forEach(function(value,index){
                checkRow(index);
            })
            function checkRow(index)
            {
                function testIfTrue(playerMove)
                {
                    return (playerMove === ticTacToeMatrix[0][index] && playerMove === ticTacToeMatrix[1][index] && playerMove === ticTacToeMatrix[2][index])
                }
                if (testIfTrue('X') || testIfTrue('O'))
                {
                    if  (ticTacToeMatrix[0][index] === 'X')
                    {
                        gameFinished(1);
                    }
                    else if (ticTacToeMatrix[0][index] ==='O')
                    {
                        gameFinished(2);
                    }
                }
            }
        }
        function checkDiagonalThree()
        {
            checkDiagonal1();
            checkDiagonal2();

            function checkDiagonal1()
            {
                function testIfTrue(playerMove)
                {
                    return (playerMove === ticTacToeMatrix[0][0] && playerMove === ticTacToeMatrix[1][1] && playerMove === ticTacToeMatrix[2][2])
                }
                if(testIfTrue('X'))
                {
                    gameFinished(1);
                }
                else if (testIfTrue('O'))
                {
                    gameFinished(2);
                }
            }
            function checkDiagonal2()
            {
                function testIfTrue(playerMove)
                {
                    return (playerMove === ticTacToeMatrix[2][0] && playerMove === ticTacToeMatrix[1][1] && playerMove === ticTacToeMatrix[0][2])
                }
                if(testIfTrue('X'))
                {
                    gameFinished(1);
                }
                else if (testIfTrue('O'))
                {
                    gameFinished(2);
                }
            }
        }
    }
    function ai(thiss)
    {
        var ply = howManyPlys(ticTacToeMatrix);
        var compPiece = 'O';
        if (ply === 1)
        {
            ticTacToeMatrix[1][1] = compPiece;
            $(".five").text("O");
            $(".five").css("color","blue");
            playersTurn = "player1";
        }
        else
        {
            console.log("Ply move is " + ply);
            var possibleArray = checkTwoInARow();

            if (typeof(possibleArray) === 'object')
            {
                var x = possibleArray[0];
                var y = possibleArray[1];
                ticTacToeMatrix[x][y] = compPiece;
               thiss.text("O");
               thiss.css("color","blue");
                playersTurn = "player1";     
            }
        }
    }
    function checkTwoInARow()
    {
        if (ticTacToeMatrix[0][0] === 'X' && ticTacToeMatrix [1][0] ==='X' && ticTacToeMatrix[2][0] !=='O')
        {
            console.log("(2,0) needs an 'O' otherwise player 1 wins!!");
            return [2,0];
        }
        // //checkRow();
        // function checkRow()
        // {
        //      if (case1() === true)
        //      {
        //         return true;
        //      }
        //     function case1()
        //     {
        //         if (ticTacToeMatrix[0][0] = 'X' && ticTacToeMatrix [1][0] ='X')
        //         {
        //             return true;

        //         }
        //     }
        // }

    }

});
   function howManyPlys(matrix)
    {
        var howMany = 0;
         matrix.forEach(function(subMatrix){
             subMatrix.forEach(function(move){
                if (move === "X" || (move === "O"))
                {
                    howMany ++;
                }
            });
         });
        return howMany;
    }
var ticTacArray = [0,0,0,0,0,0,0,0,0];
var ticTacToeMatrix = [['-','-','-'],
                           ['-','-','-'],
                           ['-','-','-']];
var playersTurn = "player1";
var gameOver = false;
$(function() {
    console.log("test");

    var playAgainstComputer = prompt("Play against the Computer?");


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
            isCatsGame(ticTacToeMatrix);    
            if(playAgainstComputer === 'yes')
            {
                ai($(this));
            }
        }
    });

    function underlinePlayer(player)
    {
        if (player === 'player1')
        {
            $(".player2").css("text-decoration","underline");
            $(".player1").css("text-decoration","none");                        
        }
        else if(player === 'player2')
        {
            $(".player1").css("text-decoration","underline");
            $(".player2").css("text-decoration","none");                  
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
            updateBoard(1,1,"blue","O",".five");
            playersTurn = "player1";
            console.log("ply is one");
        }
        else if (!gameOver)
        {
            console.log("Ply move is " + ply);
            var possibleArray = checkTwoInARow();

            if (typeof(possibleArray) === 'object')
            {
                var x = possibleArray[0];
                var y = possibleArray[1];
                ticTacToeMatrix[x][y] = compPiece;
                console.log("This is what should be changed ",x,y);
                var display = findCorrespondingElement(x,y);
                display.text("O");
                display.css("color","blue");
                playersTurn = "player1";    
            }
            else if (typeof(possibleArray) ==='undefined')
            {
                playersTurn = "player1";
                console.log("Ply wasn't one");
                if (ticTacToeMatrix[0][0] !== 'X' && ticTacToeMatrix[0][0] !== 'O')
                {
                    updateBoard(0,0,"blue",'O',".one");
                    console.log("0 0 should be changed");
                }
                else if (ticTacToeMatrix[2][0] !== 'X' && ticTacToeMatrix[2][0] !== 'O')
                {
                    updateBoard(2,0,"blue",'O',".three");
                    console.log("2 0 should be changed");
                }
                else if (ticTacToeMatrix[2][2] !== 'X' && ticTacToeMatrix[2][2] !== 'O')
                {
                    updateBoard(2,2,"blue",'O',".nine");
                    console.log("2 2 should be changed");
                }
                else if (ticTacToeMatrix[0][2] !== 'X' && ticTacToeMatrix[0][2] !== 'O')
                {
                    ticTacToeMatrix[0][2] = 'O';
                    $(".seven").text('O');
                    $(".seven").css("color","blue");
                    // updateBoard(0,2,"blue",".seven");
                }                 
                else
                {
                    playersTurn = "player2";
                }
            }
        }
    }
    function updateBoard(col,row,color,playersChoice,thiss)
    {
        console.log("column: ",col,"row: ",row, "playersChoice");
        ticTacToeMatrix[col][row] = playersChoice;
        $(thiss).text(playersChoice);
        $(thiss).css("color",color);
        checkIfThreeInARow();
    }
    function checkTwoInARow()
    {
        var checkRowResult0 = checkRow(0,0,1,2);
        var checkRowResult1 = checkRow(0,0,2,1);//
        var checkRowResult2 = checkRow(0,1,2,0);
        var checkRowResult3 = checkRow(1,0,1,2);
        var checkRowResult4 = checkRow(1,0,2,1); //
        var checkRowResult5 = checkRow(1,1,2,0);
        var checkRowResult6 = checkRow(2,0,1,2);
        var checkRowResult7 = checkRow(2,0,2,1);
        var checkRowResult8 = checkRow(2,1,2,0);

        //index 0-2, 

        if (checkRowResult0)
        {
            console.log("0");
            return checkRowResult0;
        }
        else if (checkRowResult1)
        {
            console.log("1");
            return checkRowResult1;
        }
        else if (checkRowResult2)
        {
            console.log("2");
            return checkRowResult2;
        }
        else if (checkRowResult3)
        {
            console.log("3");
            return checkRowResult3;
        }
        else if (checkRowResult4)
        {
            console.log("4");
            return checkRowResult4;
        }
        else if (checkRowResult5)
        {
            console.log("5");
            return checkRowResult5;
        }
        else if (checkRowResult6)
        {
            console.log("6");
            return checkRowResult6;
        }
        else if (checkRowResult7)
        {
            console.log("7");
            return checkRowResult7;
        }
        else if (checkRowResult8)
        {
            console.log("8");
            return checkRowResult8;
        }

        function checkRow(index,subIndex1,subIndex2,subIndex3)
        {
            if (ticTacToeMatrix[subIndex1][index] === 'X' && ticTacToeMatrix [subIndex2][index] ==='X' && ticTacToeMatrix[subIndex3][index] !=='O')
            {
                return [subIndex3,index];
            }
        }
    }
    function isCatsGame(matrix)
    {
        if (howManyPlys(matrix) === 9)
        {
            $(".winner").text("There is no winner");
            $(".player").css("visibility","hidden");
        }

    }
    function findCorrespondingElement(col,row)
    {
//         var returny;
//         var rowArray = $("*[data-row]");
//         rowArray.each(function(index,element){
//             var newArray = $(element);
//             if (newArray.data("row") === row && newArray.data("column") === col)
//             {
//                 // return newArray;
//                 returny = newArray;
//             }
//         });
//         return returny;
//     }   
// });
//    function howManyPlys(matrix)
//     {
//         var howMany = 0;
//          matrix.forEach(function(subMatrix){
//              subMatrix.forEach(function(move){
//                 if (move === "X" || (move === "O"))
//                 {
//                     howMany ++;
//                 }
//             });
//          });
//         return howMany;
    }
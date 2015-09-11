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
            if(playAgainstComputer === 'yes')
            {
                ai($(this));
            }
            checkIfThreeInARow();
            isCatsGame(ticTacToeMatrix);    
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
            if($(".five").text()!=='X')
            {
                updateBoard(1,1,"blue","O",".five");
                // updateBoard(0,1,"blue","O",".four");
            }
            else
            {
                updateBoard(0,0,"blue","O",".one");                
            }
            playersTurn = "player1";  
        }
        else if (ply === 3 && ((ticTacToeMatrix[0][0] === 'X' && ticTacToeMatrix[2][2] === 'X') || (ticTacToeMatrix[2][0] === 'X' && ticTacToeMatrix[0][2] === 'X')))
        {
            console.log("sdfsdf");
            updateBoard(1,2,"blue","O",".eight");
            playersTurn = "player1";

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
                // console.log("This is what should be changed ",x,y);
                var display = findCorrespondingElement(x,y);
                display.text("O");
                display.css("color","blue");
                playersTurn = "player1";    
            }
            else if (typeof(possibleArray) ==='undefined')
            {
                playersTurn = "player1";
                if (ticTacToeMatrix[0][0] !== 'X' && ticTacToeMatrix[0][0] !== 'O')
                {
                    updateBoard(0,0,"blue",'O',".one");
                }
                else if (ticTacToeMatrix[2][0] !== 'X' && ticTacToeMatrix[2][0] !== 'O')
                {
                    updateBoard(2,0,"blue",'O',".three");
                }
                else if (ticTacToeMatrix[2][2] !== 'X' && ticTacToeMatrix[2][2] !== 'O')
                {
                    updateBoard(2,2,"blue",'O',".nine");
                }
                else if (ticTacToeMatrix[0][2] !== 'X' && ticTacToeMatrix[0][2] !== 'O')
                {
                    updateBoard(0,2,"blue",'O',".seven");
                }
                else if (ticTacToeMatrix[1][2] !== 'X' && ticTacToeMatrix[1][2] !== 'O')
                {
                    updateBoard(1,2,"blue",'O',".eight");
                }
                else if (ticTacToeMatrix[1][0] !== 'X' && ticTacToeMatrix[1][0] !== 'O')
                {
                    updateBoard(1,0,"blue",'O',".two");
                }
                else if (ticTacToeMatrix[2][1] !== 'X' && ticTacToeMatrix[2][1] !== 'O')
                {
                    updateBoard(2,1,"blue",'O',".six");
                }
                else if (ticTacToeMatrix[0][1] !== 'X' && ticTacToeMatrix[0][1] !== 'O')
                {
                    updateBoard(0,1,"blue",'O',".four");
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
        for(var i = 0; i < 3; i ++)
        {
            var checkRowResult3 = checkRow(i,0,1,2,'O','X');
            var checkRowResult4 = checkRow(i,0,2,1,'O','X');
            var checkRowResult5 = checkRow(i,1,2,0,'O','X');
            var checkColumnResult3 = checkColumn(i,0,1,2,'O','X');
            var checkColumnResult4 = checkColumn(i,0,2,1,'O','X');
            var checkColumnResult5 = checkColumn(i,1,2,0,'O','X');
            var checkDiagonalResult6 = checkDiagonal(0,0,1,1,2,2,'O','X');
            var checkDiagonalResult7 = checkDiagonal(2,0,1,1,0,2,'O','X');
            var checkDiagonalResult8 = checkDiagonal(0,0,2,2,1,1,'O','X');
            var checkDiagonalResult9 = checkDiagonal(2,0,0,2,1,1,'O','X');
            var checkDiagonalResult10 = checkDiagonal(1,1,2,2,0,0,'O','X');
            var checkDiagonalResult11 = checkDiagonal(1,1,0,2,2,0,'O','X');

            if (checkRowResult3)
            {
                console.log("10");
                return checkRowResult3;
            }
            else if (checkRowResult4)
            {
                console.log("11");
                return checkRowResult4;
            }
            else if (checkRowResult5)
            {
                console.log("12");
                return checkRowResult5;
            }
            else if (checkColumnResult3)
            {
                console.log("13");
                return checkColumnResult3;
            }
            else if (checkColumnResult4)
            {
                console.log("14");
                return checkColumnResult4;
            }
            else if (checkColumnResult5)
            {
                console.log("15");
                return checkColumnResult5;
            }
            else if (checkDiagonalResult6)
            {
                console.log("16");
                return checkDiagonalResult6;
            }
            else if (checkDiagonalResult7)
            {
                console.log("17");
                return checkDiagonalResult7;
            }
            else if (checkDiagonalResult8)
            {
                console.log("18");
                return checkDiagonalResult8;
            }
        }
        for(var i = 0; i < 3; i ++)
        {
            var checkRowResult0 = checkRow(i,0,1,2,'X','O');
            var checkRowResult1 = checkRow(i,0,2,1,'X','O');
            var checkRowResult2 = checkRow(i,1,2,0,'X','O');

            var checkColumnResult0 = checkColumn(i,0,1,2,'X','O');
            var checkColumnResult1 = checkColumn(i,0,2,1,'X','O');
            var checkColumnResult2 = checkColumn(i,1,2,0,'X','O');
            var checkDiagonalResult0 = checkDiagonal(0,0,1,1,2,2,'X','O');
            var checkDiagonalResult1 = checkDiagonal(2,0,1,1,0,2,'X','O');
            var checkDiagonalResult2 = checkDiagonal(0,0,2,2,1,1,'X','O');
            var checkDiagonalResult3 = checkDiagonal(2,0,0,2,1,1,'X','O');
            var checkDiagonalResult4 = checkDiagonal(1,1,2,2,0,0,'X','O');
            var checkDiagonalResult5 = checkDiagonal(1,1,0,2,2,0,'X','O');
           
            if (checkDiagonalResult9)
            {
                console.log("8");
                return checkDiagonalResult3;
            }
            else if (checkDiagonalResult9)
            {
                console.log("19");
                return checkDiagonalResult9;
            }
            else if (checkDiagonalResult10)
            {
                console.log("20");
                return checkDiagonalResult10;
            }
            else if (checkRowResult0)
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
            else if (checkColumnResult0)
            {
                console.log("3");
                return checkColumnResult0;
            }
            else if (checkColumnResult1)
            {
                console.log("4");
                return checkColumnResult1;
            }
            else if (checkColumnResult2)
            {
                console.log("5");
                return checkColumnResult2;
            }
            else if (checkDiagonalResult0)
            {
                console.log("6");
                return checkDiagonalResult0;
            }
            else if (checkDiagonalResult1)
            {
                console.log("7");
                return checkDiagonalResult1;
            }
            else if (checkDiagonalResult2)
            {
                console.log("7");
                return checkDiagonalResult2;
            }
            else if (checkDiagonalResult3)
            {
                console.log("8");
                return checkDiagonalResult3;
            }
            else if (checkDiagonalResult4)
            {
                console.log("9");
                return checkDiagonalResult4;
            }
            else if (checkDiagonalResult5)
            {
                console.log("9");
                return checkDiagonalResult4;
            }
        }

        function checkRow(index,subIndex1,subIndex2,subIndex3,choice1,choice2)
        {
            if (ticTacToeMatrix[subIndex1][index] === choice1 && ticTacToeMatrix [subIndex2][index] === choice1 && ticTacToeMatrix[subIndex3][index] !== choice2)
            {
                return [subIndex3,index];
            }
        }

        function checkColumn(index,subIndex1,subIndex2,subIndex3,choice1,choice2)
        {
            if (ticTacToeMatrix[index][subIndex1] === choice1 && ticTacToeMatrix [index][subIndex2] ===choice1 && ticTacToeMatrix[index][subIndex3] !== choice2)
            {
                return [index,subIndex3];
            }
        }
        function checkDiagonal(index1,index2,index3,index4,index5,index6)
        {
            if (ticTacToeMatrix[index1][index2] === 'X' && ticTacToeMatrix [index3][index4] ==='X' && ticTacToeMatrix[index5][index6] !=='O')
            {
                return [index5,index6];
            }
        }
        function checkDiagonal(index1,index2,index3,index4,index5,index6,choice1,choice2)
        {
            if (ticTacToeMatrix[index1][index2] === choice1 && ticTacToeMatrix [index3][index4] === choice1 && ticTacToeMatrix[index5][index6] !== choice2)
            {
                return [index5,index6];
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
        var returny;
        var rowArray = $("*[data-row]");
        rowArray.each(function(index,element){
            var newArray = $(element);
            if (newArray.data("row") === row && newArray.data("column") === col)
            {
                // return newArray;
                returny = newArray;
            }
        });
        return returny;
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
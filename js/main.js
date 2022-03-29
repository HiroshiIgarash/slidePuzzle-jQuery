let SIZE = 3; //盤面一列のタイル数
let CELL_SIZE = 600 / SIZE; //タイル１辺の長さ
let SPEED = 50; //タイル移動のスピード
let SHUFFLE = SIZE ** 2 ; //最初のシャッフル数

let counter=0; //移動数
let isShuffle=false;
let clearFlag=true;

let NtoP = [];
let PtoN = [];

function setOption(){
    SIZE = Number($("#size").val()); //盤面一列のタイル数
    CELL_SIZE = 600 / SIZE; //タイル１辺の長さ
    SHUFFLE = SIZE ** 2 * 8; //最初のシャッフル数
    counter=0;
    $(".box-data").html(`移動数：${counter}`) //移動数０を反映
    $(".clear").css("color","#fff");
}


function setBord() {
    for (let i = 1; i <= SIZE * SIZE - 1; i++) {
        $(".slideBox").append(`<div class="cell num${i}">${i}</div>`);
        let cellX = (i - 1) % SIZE;//セルの横番号
        let cellY = Math.floor((i - 1) / SIZE); //セルの縦番号
        let cellTop = cellY * CELL_SIZE;//セルの縦位置
        let cellLeft = cellX * CELL_SIZE; //セルの横位置

        $(`.num${i}`).css('top', cellTop);
        $(`.num${i}`).css('left', cellLeft);
        $(`.num${i}`).css('width', CELL_SIZE + "px");
        $(`.num${i}`).css('height', CELL_SIZE + "px");
        $(`.num${i}`).css('line-height', CELL_SIZE-22 + "px"); //22はボーダーサイズ
        $(`.num${i}`).css('font-size', CELL_SIZE / 2 + "px");
        NtoP[i] = i;
        PtoN[i] = i;
    }
    PtoN[SIZE * SIZE] = 0;
    NtoP[0] = SIZE * SIZE;
}

function cellUp(n) {
    if (n > SIZE) {
        return PtoN[n - SIZE];
    } else {
        return -1;
    }
}
function cellDown(n) {
    if (n + SIZE <= SIZE * SIZE) {
        return PtoN[n + SIZE];
    } else {
        return -1;
    }
}
function cellLeft(n) {
    if (n % SIZE != 1) {
        return PtoN[n - 1];
    } else {
        return -1;
    }
}
function cellRight(n) {
    if (n % SIZE != 0) {
        return PtoN[n + 1];
    } else {
        return -1;
    }
}

setBord();

$(document).on('click', ".cell", function () {
    cellMove(Number($(this).html()));
})

function countup(){
    counter++;
    $(".box-data").html(`移動数：${counter}`)
}


function cellMove(n) {
    if(clearFlag) return;
    let targetN = n;
    let targetP = NtoP[targetN];

    if (cellUp(targetP) == 0) {
        if(!isShuffle) countup();
        PtoN[targetP] = 0;
        PtoN[targetP - SIZE] = targetN;
        NtoP[0] = targetP;
        NtoP[targetN] = targetP - SIZE
        $(`.num${targetN}`).animate({ "top": `-=${CELL_SIZE}` }, SPEED);
    } else if (cellDown(targetP) == 0) {
        if(!isShuffle) countup();
        PtoN[targetP] = 0;
        PtoN[targetP + SIZE] = targetN;
        NtoP[0] = targetP;
        NtoP[targetN] = targetP + SIZE
        $(`.num${targetN}`).animate({ "top": `+=${CELL_SIZE}` }, SPEED);
    } else if (cellLeft(targetP) == 0) {
        if(!isShuffle) countup();
        PtoN[targetP] = 0;
        PtoN[targetP - 1] = targetN;
        NtoP[0] = targetP;
        NtoP[targetN] = targetP - 1;
        $(`.num${targetN}`).animate({ "left": `-=${CELL_SIZE}` }, SPEED);
    } else if (cellRight(targetP) == 0) {
        if(!isShuffle) countup();
        PtoN[targetP] = 0;
        PtoN[targetP + 1] = targetN;
        NtoP[0] = targetP;
        NtoP[targetN] = targetP + 1
        $(`.num${targetN}`).animate({ "left": `+=${CELL_SIZE}` }, SPEED);
    }

    //タイルの位置が合っている場合、文字色を黒に
    if (NtoP[targetN] == targetN) {
        $(`.num${targetN}`).css("color", "black");
        if(isClear()){
            $(".clear").css("color","red");
        };
    } else {
        $(`.num${targetN}`).css("color", "#607d8b");
    }
}

function isClear(){
    for(let i=1;i<SIZE*SIZE;i++){
        if (NtoP[i] !== i) {
            return false;
        }
    }
    clearFlag=true;
    return true;
}

let rand = Math.floor(Math.random() * (SIZE * SIZE) + 1);
let movedN;
function cellMoveRand() {
    rand = Math.floor(Math.random() * (SIZE * SIZE) + 1);
    while (cellUp(rand) * cellDown(rand) * cellLeft(rand) * cellRight(rand) != 0 || PtoN[rand] == movedN) {
        rand = Math.floor(Math.random() * (SIZE * SIZE - 1) + 1);
    }
    movedN = PtoN[rand];
    cellMove(PtoN[rand]);
}

function shuffle() {
    isShuffle=true;
    timer = setInterval(function(){
        cellMoveRand();
    }, SPEED)
    setTimeout(() => {
        clearInterval(timer);
        isShuffle=false;
    }, SPEED * SHUFFLE)

}


function MoveUp() {
    if (cellDown(NtoP[0]) != -1) {
        cellMove(cellDown(NtoP[0]));
       // countup();
    } else {
        return 0;
    }
}
function MoveDown() {
    if (cellUp(NtoP[0]) != -1) {
        cellMove(cellUp(NtoP[0]));
        //countup();
    } else {
        return 0;
    }
}
function MoveLeft() {
    if (cellRight(NtoP[0]) != -1) {
        cellMove(cellRight(NtoP[0]));
       // countup();
    } else {
        return 0;
    }
}
function MoveRight() {
    if (cellLeft(NtoP[0]) != -1) {
        cellMove(cellLeft(NtoP[0]));
      //  countup();
    } else {
        return 0;
    }
}


$(window).keydown(function (e) {
    switch (e.key) {
        case "ArrowDown":
            MoveDown();            
            e.preventDefault();
            break;
        case "ArrowUp":
            MoveUp();            
            e.preventDefault();
            break;
        case "ArrowLeft":
            MoveLeft();            
            e.preventDefault();
            break;
        case "ArrowRight":
            MoveRight();            
            e.preventDefault();
            break;
        default:
            
    }
});

$(document).on("click",".btn-play a",function(e){
    if(isShuffle) return;
    clearFlag=false;
    $(".slideBox").empty();
    setOption();
    setBord();
    shuffle();

    e.preventDefault();
})

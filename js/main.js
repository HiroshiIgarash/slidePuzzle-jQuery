const SIZE = 6;
const CELL_SIZE = 600 / SIZE;
const SPEED=50;

let NtoP = [];
let PtoN = [];
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
    $(`.num${i}`).css('line-height', CELL_SIZE + "px");
    $(`.num${i}`).css('font-size', CELL_SIZE / 2 + "px");
    NtoP[i] = i;
    PtoN[i] = i;
}
PtoN[SIZE * SIZE] = 0;
NtoP[0] = SIZE * SIZE;

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

$(".cell").on('click', function () {
    cellMove(Number($(this).html()));
})


function cellMove(n) {
    let targetN = n;
    let targetP = NtoP[targetN];

    //前後左右に空白があるかチェック
    // if(cellUp(targetP)*cellDown(targetP)*cellLeft(targetP)*cellRight(targetP)>0){
    //     return 0;
    // }else 
    if (cellUp(targetP) == 0) {
        PtoN[targetP] = 0;
        PtoN[targetP - SIZE] = targetN;
        NtoP[0] = targetP;
        NtoP[targetN] = targetP - SIZE
        $(`.num${targetN}`).animate({ "top": `-=${CELL_SIZE}` }, SPEED);
    } else if (cellDown(targetP) == 0) {
        PtoN[targetP] = 0;
        PtoN[targetP + SIZE] = targetN;
        NtoP[0] = targetP;
        NtoP[targetN] = targetP + SIZE
        $(`.num${targetN}`).animate({ "top": `+=${CELL_SIZE}` }, SPEED);
    } else if (cellLeft(targetP) == 0) {
        PtoN[targetP] = 0;
        PtoN[targetP - 1] = targetN;
        NtoP[0] = targetP;
        NtoP[targetN] = targetP - 1;
        $(`.num${targetN}`).animate({ "left": `-=${CELL_SIZE}` }, SPEED);
    } else if (cellRight(targetP) == 0) {
        PtoN[targetP] = 0;
        PtoN[targetP + 1] = targetN;
        NtoP[0] = targetP;
        NtoP[targetN] = targetP + 1
        $(`.num${targetN}`).animate({ "left": `+=${CELL_SIZE}` }, SPEED);
    }
    if(NtoP[targetN]==targetN){
        $(`.num${targetN}`).css("color","black");
    }else {
        $(`.num${targetN}`).css("color","#607d8b");
    }
}

//let timer = setInterval(cellMoveRand, 100);
let rand = Math.floor(Math.random() * (SIZE * SIZE)+1);
let movedN;
function cellMoveRand() {
    rand = Math.floor(Math.random() * (SIZE * SIZE) + 1);
    while (cellUp(rand) * cellDown(rand) * cellLeft(rand) * cellRight(rand) != 0 || PtoN[rand]==movedN) {
        rand = Math.floor(Math.random() * (SIZE * SIZE - 1) + 1);
    }
    movedN=PtoN[rand];
    cellMove(PtoN[rand]);
}


for (i=1;i<5000;i++){
    cellMoveRand();
}

function MoveUp() {
    if (cellDown(NtoP[0]) != -1) {
        cellMove(cellDown(NtoP[0]));
    } else {
        return 0;
    }
}
function MoveDown() {
    if (cellUp(NtoP[0]) != -1) {
        cellMove(cellUp(NtoP[0]));
    } else {
        return 0;
    }
}
function MoveLeft() {
    if (cellRight(NtoP[0]) != -1) {
        cellMove(cellRight(NtoP[0]));
    } else {
        return 0;
    }
}
function MoveRight() {
    if (cellLeft(NtoP[0]) != -1) {
        cellMove(cellLeft(NtoP[0]));
    } else {
        return 0;
    }
}


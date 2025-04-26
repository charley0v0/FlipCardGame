const imgArr = ['003', '009', '012', '019', '031', '038', '053', '086', '093'];
let newArr = [];
let imgStr = '';
let checkUrl = '';
let Start = false;
let thinkCount = 5;
let lastTime = 30;
let score = 0;
let startCountTime = null;
let startThinkCount = null;
let leftClick = 0;
let rightClick = 0;


$(function () {
    //開始遊戲
    $('#start').click(function () {
        $(this).text('重新開始')
        $('.left-mask').hide();
        $('.right-mask').hide();
        $('#mask').show();
        $(document).find(".card").flip(false);
        StartGame();
    });

    //點擊卡片
    $('.card_area').on('flip:done', '.card', function () {
        if (Start) {
            if (checkUrl === '') {
                //第一次翻開卡片
                checkUrl = $(this).find('img').attr('src');
            } else {
                //第二次翻開卡片
                if ($(this).find('img').attr('src') === checkUrl) {
                    score++;
                    $('.left-mask').hide();
                    $('.right-mask').hide();
                    if (score == 9) {
                        clearInterval(startCountTime);
                        alert(`恭喜過關！總共花費${30 - lastTime}秒`);
                    }
                } else {
                    $(this).flip(false);
                    $(`img[src="${checkUrl}"]`).parents('.card').flip(false);
                    $('.left-mask').hide();
                    $('.right-mask').hide();
                }
                checkUrl = '';
            }
        }
    });

    //無法連續選擇同一側卡片
    $('#leftArea').on('click', '.card', function () {
        $('.left-mask').show();
        $('.right-mask').hide();
    });

    $('#rightArea').on('click', '.card', function () {
        $('.left-mask').hide();
        $('.right-mask').show();
    });
});


//重新排序
function reSort() {
    newArr = imgArr.sort(() => Math.random() - 0.5);
    imgStr = '';
    newArr.forEach((x) => {
        imgStr += `<div class="card">
                        <div class="front"></div>
                        <div class="back">
                            <img src="img/${x}.png">
                        </div>
                    </div>`;
    });
}


function StartGame() {
    lastTime = 30;
    score = 0;
    Start = false;

    checkUrl = '';
    //帶入左方原圖
    reSort();
    $('#leftArea').html(imgStr);

    //帶入左方原圖
    reSort();
    $('#rightArea').html(imgStr);

    $('.card_area').css('display', 'flex');

    $(document).find(".card").flip();

    let startShow = setTimeout(function () {
        $(document).find(".card").flip(true);

        if (startThinkCount) {
            clearInterval(startThinkCount);
        }
        startThinkCount = setInterval(() => {
            thinkTime();
        }, 1000);

    }, 100);
}

function timeCount() {
    lastTime--;

    if (lastTime < 0) {
        clearInterval(startCountTime);
        lastTime = 30;
        $('.left-mask').show();
        $('.right-mask').show();
        alert('時間到');
        start = false;
        $(document).find(".card").flip(false);
    }
    $('#last-time').text(lastTime);
    $('#last-time').css('color', lastTime > 5 ? 'black' : 'red');
}

function thinkTime() {
    thinkCount--;

    if (thinkCount == 0) {
        clearInterval(startThinkCount);
        $('#mask').hide();
        thinkCount = 5;
        $(document).find(".card").flip(false);
        Start = true;

        if (startCountTime) {
            clearInterval(startCountTime);
        }
        startCountTime = setInterval(() => {
            timeCount();
        }, 1000);
    }
    $('#think-count').text(thinkCount);
}


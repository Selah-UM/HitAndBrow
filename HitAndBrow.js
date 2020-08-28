const what = document.getElementById('what');
const how = document.getElementById('how');
const HitAndBlowButton = document.getElementById('HitAndBlow');
const answerColumnArea = document.getElementById('answerColumn');
const answerDisplayArea = document.getElementById('answerDisplay');
const showHints = document.getElementById('showHints');
const clearDisplay = document.getElementById('clearDisplay');

//ボタン押したら実行
HitAndBlowButton.onclick = () =>{
    //初期表示を終了
    HitAndBlowButton.remove();
    what.remove();
    how.style.display = 'none';

    //遊び方確認
    const howB = document.createElement('button');
    howB.setAttribute('id', 'howB');
    howB.className = 'howB'; 
    howB.innerText = "遊び方を確認する"; 
    answerColumnArea.appendChild(howB);
    howB.onclick = () =>{
        howToPlay();
    }
    
    const text = document.createElement('h4');
  　text.className = 'start';
    text.innerHTML += "ゲームスタート！";
    answerColumnArea.appendChild(text);

    choseNumbers();
   
    game();
    
}

//遊び方表示
function howToPlay(){
	if(how.style.display == 'block'){
		// noneで非表示
		how.style.display = 'none';
	}else{
		// blockで表示
		how.style.display = 'block';
	}
}

//答えを作る
function choseNumbers(){

    const numbers = [1,2,3,4,5,6,7,8,9];

    //数字Aを代入
    numberA = numbers [Math.floor (Math.random()*numbers.length)];

    //数字Bに数字Aではない数字を代入
    do{
        numberB = numbers [Math.floor (Math.random()*numbers.length)];
    }while(numberA === numberB);

    //数字Cに数字Aでも数字Bでもない数を代入
    do{
        numberC = numbers [Math.floor (Math.random()*numbers.length)];
    }while((numberA === numberC) || (numberB === numberC));

    //動作確認のため配列で表示
    const number = [numberA,numberB,numberC];
    console.log(number);
}

//ゲーム動作
function game(){
    //回答欄作成
    
    for(i = 0; i < 3; i++){
        const answerInput = document.createElement('input');
        answerInput.setAttribute('type', 'text'); 
        answerInput.setAttribute('id',`answerInput${i}`); 
        answerInput.setAttribute('maxlength', '1');
        answerInput.setAttribute('value', "");
        answerInput.className = 'input';
        answerColumn.appendChild(answerInput);

    }

    const answerInput0 = document.getElementById('answerInput0');
    const answerInput1 = document.getElementById('answerInput1');
    const answerInput2 = document.getElementById('answerInput2');
    
    const checkButton = document.createElement('button');
    checkButton.setAttribute('id', 'check');
    checkButton.className = 'check'; 
    checkButton.innerText = "チェック"; 
    answerColumnArea.appendChild(checkButton);

    var countCheck = null;

    //回答に対応

    //どこにカーソルがあってもEnterでチェック
    answerInput0.onkeydown = event =>{
        if(event.key ===  'Enter'){
            checkButton.onclick();
        }
    }
    answerInput1.onkeydown = event =>{
        if(event.key ===  'Enter'){
            checkButton.onclick();
        }
    }
    answerInput2.onkeydown = event =>{
        if(event.key ===  'Enter'){
            checkButton.onclick();
        }
    }

    checkButton.onclick = () =>{
        const number = [numberA,numberB,numberC];
        const answer = [answerInput0.value,answerInput1.value,answerInput2.value];
        // countCheck += 1;
        var countHit = 0;
        var countBrow = 0;

        //HitとBrowをカウントする
        for(i = 0; i < answer.length; i++){
            answer[i] = Number(answer[i]);
            if(isNaN(answer[i]) || answer[i] === 0){
                const text = document.createElement('p');
                text.className = 'error';
                text.innerHTML = "1~9の半角数字を入力してください。<br>";
                answerDisplayArea.appendChild(text);
                return;
            }else if(answer[i] === number[i]){
                countHit++;
            }else if((answer[i] === number[0]) || (answer[i] === number[1]) || (answer[i] === number[2])){
                countBrow++;
            }
        }

        //同じ数字はエラー
        if((answer[0] === answer[1]) || (answer[0] === answer[2]) || (answer[1] === answer[2])){
            const text = document.createElement('p');
            text.className = 'error';
            text.innerHTML = "数字は重ならないように入力してください。<br>";
            answerDisplayArea.appendChild(text);
            return;
        }

        //HitとBrowを表示、もしくはゲームクリアでゲームを終了させる
        if(countHit === 3){
            countCheck += 1;
            gameClear();
        }else{
            answerDisplay = ((answer[0] * 100) + (answer[1] * 10) + answer[2]);
            const text = document.createElement('h4');
            const showCounts = answerDisplay + "は…" + countHit + "ヒット、" + countBrow + "ブローです。";
            text.innerHTML += showCounts;
            showHints.appendChild(text);
            countCheck += 1;
        }
        var element = document.documentElement;
        var bottom = element.scrollHeight - element.clientHeight;
        window.scroll(0, bottom)
    }

    //クリア画面の作成
    function gameClear(){
        answerColumnArea.remove();
        const text1 = document.createElement('h2');
        text1.className = 'hit';
        text1.innerHTML = "おめでとうございます！<br>3ヒットです！";
        clearDisplay.appendChild(text1);

        const text2 = document.createElement('h3');
        text2.className = 'next';
        text2.innerHTML += "今回は" + countCheck + "回で3ヒットにたどり着くことができました！";
        if(countCheck <= 3){
            text2.innerHTML += "<br>すごい！";
        }else if(countCheck > 3){
            text2.innerHTML += "<br>次回はもっと少ない回数で3ヒットを出せるかも！";
        }
        text2.innerHTML += "<br>もう一回チャレンジしてみる？";
        clearDisplay.appendChild(text2);

        const anchor = document.createElement('a');
        anchor.href = 'https://selah-um.github.io/HitAndBrow/';
        anchor.className = 'challenge';
        anchor.innerText = "チャレンジ！";
        clearDisplay.appendChild(anchor);
    }
}

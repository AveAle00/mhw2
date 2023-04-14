const CHECK_IMAGE ='images/checked.png'
const UNCHECK_IMAGE ='images/unchecked.png'


function restartQuiz(event){
    const restartButton=event.currentTarget;
    const answer=restartButton.parentNode
    const article=answer.parentNode
    const listBoxes=article.querySelectorAll('.choice-grid div')
    for (const box of listBoxes){
        box.addEventListener('click', selectedItem)
        box.querySelector('.checkbox').src = UNCHECK_IMAGE
        box.classList.remove('selected')
        box.classList.remove('unselected')
    }
    for(let i=0 ; i <choices.length; i++){
        choices[i]=null
    }
    answer.remove()   
}
function contentAnswer(choice){
    console.log(choice)
    const article=document.querySelector('article')
    
    const answer=document.createElement('div') //div risposta
    answer.setAttribute('data-answer', 'container')

    const title_ans = document.createElement('h1') //titolo
    title_ans.textContent=RESULTS_MAP[choice].title
    title_ans.setAttribute('data-answer', 'title')

    const content_ans=document.createElement('p') // descrizione
    content_ans.textContent =RESULTS_MAP[choice].contents
    content_ans.setAttribute('data-answer', 'content')

 
    const restartButton=document.createElement('button') //pulsante reset
    restartButton.textContent ='Ricomincia il quiz'
    restartButton.setAttribute('data-answer', 'button')
    restartButton.addEventListener('click', restartQuiz)

    article.appendChild(answer)
    answer.appendChild(title_ans)
    answer.appendChild(content_ans)
    answer.appendChild(restartButton)


}
function addAnswer(){
     
        if (choices[0]===choices[1] ||  choices[0]===choices[2] || (choices[0]!==choices[1] &&  choices[1]!==choices[2])){
            contentAnswer(choices[0]);
        }  else{
            contentAnswer(choices[1]); // siamo nel caso choices[1]=choices[2]
        }
    }

function isOver(){
    if(choices[0] !== null && choices[1] !== null && choices[2] !== null){
        const boxes=document.querySelectorAll('.choice-grid div')
        for (const box of boxes){
    box.removeEventListener('click', selectedItem)
    }
    addAnswer()
}
}    
function takenChoises(questionId,choiceId){  
    if (questionId === "one"){
        choices[0]=choiceId
    }else if (questionId === "two")  {
        choices[1]=choiceId
    }else {choices[2]= choiceId}
    console.log(choices)
    isOver()
}
function unselectedItem(selectedBox){
    const question=selectedBox.parentNode
    const boxes = question.querySelectorAll('.choice-grid div')
    for(const box of boxes){
        if(box!==selectedBox){
            box.querySelector('.checkbox').src = UNCHECK_IMAGE
            box.classList.remove('selected')
            box.classList.add('unselected')
            }else {
                box.classList.remove('unselected')            
            }
    }
}
function selectedItem(event){
    const box= event.currentTarget;
    const checkImg=box.querySelector('.checkbox');
    checkImg.src= CHECK_IMAGE
    box.classList.add('selected')
    unselectedItem(box)
    takenChoises(box.dataset.questionId, box.dataset.choiceId)

}
const choices=[];
for(let i=0; i<3; i++) {
    choices[i]=null;
}
const boxes=document.querySelectorAll('.choice-grid div')
for (const box of boxes)
{
    box.addEventListener('click', selectedItem)
}





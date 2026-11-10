// js apply on tic tac toe

// boxes me click karu ya x ayega ya 0 ayega 
// boxes (children) par event lgane ki jagah hum parent par event lga dete hain
// toh event delegation follow hogi jo by default event bubbling ko follow karti hain 


// X aur 0 ko display krana hain uske liye kuch logic lgate hain 
// initially hum set kar denge pehle baar me X hi type hoga uske baad 0.
let turn = 'X';

// winner decide karne ka logic likhte hain
// jitni possiblities hain winner ko decide karne ki unko array me daal denge 
const array = [ 
    [0,1,2],[3,4,5],[6,7,8],
    [0,3,6],[1,4,7],[2,5,8],
    [0,4,8],[2,4,6]
];
// ek array lete hain 9 size ka usse pta krenge winner ka 
// ye array track rkhega ki kis children(box) me kya dalla hain x ya 0
let array2 = new Array(9);
array2.fill('E');

// parent ka aceess lete hein jiske uppar event listner lgana hain 
const parent = document.getElementById('parent');


// event listner lgate hain parent par


let fun = (event)=>{
    // id ki help se children ka access mil gya hain toh x ya o daal skte hain 
  const element =  event.target;
    let index = element.id;

    if(index === 'parent'){ // ab gap me click karne par tic tac toe gayab ni hone ka 
// gap par click mtlb parent par click hme gap me click nahi karna hain toh hum condition 
// likh denge element ki id mtlb gap ki id gap parent ke andhar gap par click parent par click
// toh agr index me parent ki id aa gyi toh return ho jana hain parent ki id parent hi hain 
      return;
    }

  if(turn === 'X'){ // initially turn X hi hain pehle x chlega uske baad 0 chlega 
    if(array2[index] === '0'|| array2[index] === 'X'){ // agr 0 persent hain toh m x ni daal skta 
      // aur agr X persent hain toh m override ni kar skta
// mtlb ek baar x ya 0 daal gya toh m kuch ni daal skta jo h vahi rhega **override ni ho skta**  
        return; // return mtlb aga jana ki jrurat ni hain 
    }
    array2[index] = 'X';
    element.innerHTML = "X";
    // x ke baad 0 ayega 
    turn = '0';
    // **image ko chhota bda karne ka logic**

    // X ki image bada hone se pehle 0 ki image ko apne original size me ana pdega 
    // pehle 0 wale child ki image ko uski original form me le ata hain 
  const elementB = document.getElementById('pic3');
    elementB.style.transform= 'scale(1)';

    // pic1 ko access krenge jo firstbox ki hain usme scale krenge jese hi X print hoga div me 
    const elementA = document.getElementById('pic1');
    elementA.style.transform= 'scale(2)';
    
  }
  else{
    // agr pehle se hi X hain
    if(array2[index] === 'X' || array2[index] === '0'){ // agr x persent hain toh m 0 ni daal skta 
        return;
    }
    array2[index] = '0';
     element.innerHTML = "0";
  //  0 ke baad ab X ayega 
  turn = 'X';
    // pehle X wale child ki image ko uski original form me le ata hain 
     const elementA = document.getElementById('pic1');
    elementA.style.transform= 'scale(1)';
    // pic3 ko access krenge jo thirdbox ki hain usme scale krenge jese hi 0 print hoga div me 
    const elementB = document.getElementById('pic3');
    elementB.style.transform= 'scale(2)';
    
  }

  // check karte hain ***winner decide karte hain***
  let winner = 0;
array.forEach(([index1,index2,index3])=>{
  // jab 3ino me E nhi hoga toh tab ye condition chlegi 
    if(array2[index1]!='E'){ //teeno me E ni hone chahiye ,agr 3ino E ho gye toh answer E aa jayega 
    if(array2[index1]=== array2[index2] && array2[index2] === array2[index3]){
        const last = document.getElementById('last');
        last.innerHTML = `Winner is ${array2[index1]}`;
        winner=1; // ye indicate kar raha hain ki winner mil gya hain 
        // agr koi winner mil gya toh uske baad koi click ni kar skta 
        // mtlb event listner ko stop kar denge 
        parent.removeEventListener('click',fun); // callbackfunction ka reference de denge 
    }
}
})

// jab koi winner na ho mtlb match tied ho 
let count = 0;
array2.forEach((data)=>{
  if(data !='E'){
    count ++; 
  }
})
if(count == 9){
  if(winner==1){ // agr winner mil gya hain uske baad tie wala nahi chlega **kyuki 9th click par winner mil skta hain**
    return;
  }
     const last = document.getElementById('last');
      last.innerHTML = `Match is Tied`;
// jab match tied ho jayega toh hum event listner ko remove kar denge taki koi click na ho
// game over hone par listener ko  remove karna better habbit  hai. lekin jrurat ni hain 
}

};


parent.addEventListener('click',fun); // yaha se code start hoga 
// function ka reference de denge jiske andhar callback function hain 



// restart game ke liye , sab kuch shuru se start karo 

const buttonelement = document.getElementById('buttonelement');

buttonelement.addEventListener('click',(event)=>{
  // jese restart karu sab kuch nva ban ja 
  // jitne bi 9 children hain vo khalli ho ja unke andhar kuch ni rehna chahiye 

  const children = document.getElementsByClassName('same'); // HtmlCollecion de ga yo 
  const array3 = Array.from(children); // HtmlCollecion ko array me convert kar diya 

  array3.forEach((value)=>{
    value.innerHTML = " ";
    
  })
// turn ko x bna dete hain kyuki restart se sab kuch nva ban jaga aur shuru me jab hum
// type karte hain toh pehle x hi ata hain 
  turn = 'X';
  // jis array me store kar rahe hain children me kya dlla hain usko fir se E se initalize kar dengeb 
  array2.fill('E');

  // restart karne par bi winner is x/0 likha aa raha hain toh vaha par empty daal denge 
    const last = document.getElementById('last');
    last.innerHTML = ` `; 

  // restart ke baad shuru se event lag jayega mtlb hum click kra aur X ya 0 daal ja 
  // shuru me toh parent par event listner lagta hain hy
  parent.addEventListener('click',fun);

  // jab restart kar rah ahu toh dono images apni original form me rahe 
  // X walo
const elementA = document.getElementById('pic1');
    elementA.style.transform= 'scale(1)';

// 0 wali
 const elementB = document.getElementById('pic3');
    elementB.style.transform= 'scale(1)';
})

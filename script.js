const input = document.querySelector("#url")
const url = `*****`;
const urlCustomVisionAI = `*****`
const apiKey = "*****";
const title = document.querySelector("#title")
const placar = document.querySelector("#placar")
const penDrive = "D:"

const searchParams = new URLSearchParams(window.location.search);
const firstTime = localStorage.getItem("firstTime") || true

const logos = ["Nike", "Adidas", "Linkedin", "Apple", "Etec"]
let i = parseInt(localStorage.getItem("quest")) || 0

let getMin = parseInt(localStorage.getItem("min"))
let getSec = parseInt(localStorage.getItem("sec"))

let min;
let sec;

if(!!getMin || getMin == 0){

    min = getMin

}else{

    min = 3

}

if(!!getSec){

    sec = getSec

}else{

    sec = 1

}

if(i > (logos.length-1)){

    document.querySelector("#content").innerHTML = `
    
        <h1 style="color: #fff; margin-bottom: 15px"> Você ganhou<strong style="color: #3EBDFF">!!<strong> </h1>
        <h2 style="color: #fff"> Chame um organizador </h2>

    `

}


if(firstTime == "false"){

    start()

}

const uploadImage = async () => {

    if (document.querySelector("#image").files[0]) {
        const formData = new FormData();
        formData.append("image", document.querySelector("#image").files[0]);

        // Faça a solicitação HTTP
        const xhr = new XMLHttpRequest();
        xhr.open("POST", url);
        xhr.setRequestHeader("Authorization", `Client-ID ${apiKey}`);
        xhr.send(formData);

        // Processe a resposta
        xhr.onload = async function () {

            document.querySelector(".content-box").innerHTML = `
            
        <h2 style="color: #fff; font-weight: bold;"> <strong style="color: #3EBDFF">Qual</strong> é esse <strong style="color: #3EBDFF">time</strong>? </h2>

        <div class="input-box">

            <input class='input-url' style="background-color: #fff; margin: 05px 0" type="file" id="image">
            <img src="" id="img" style="width: 100%; border-radius: 10px; margin: 5px 0;">
            <button class="input-button" onclick="uploadImage()">Upload</button>

        </div>
        
        <div class='card'>  
        
            <h4> Carregando... </h4>

        </div>

        `

            if (xhr.status === 200) {
                // Obtenha o link para a imagem
                const link = JSON.parse(xhr.responseText).data.link;
                const img = link
                let data = await fetch(
                    urlCustomVisionAI,
                    {

                        method: "POST",
                        headers: {
                            "Prediction-Key": "*****",
                            "Content-Type": "application/json",
                        },
                        body: JSON.stringify({

                            url: link,

                        }),

                    }
                ).then(res =>

                    res.json()

                ).catch(err => {

                    document.querySelector(".content-box").innerHTML = `
            
                <h2 style="color: #fff; font-weight: bold;"> <strong style="color: #3EBDFF">Qual</strong> é esse <strong style="color: #3EBDFF">time</strong>? </h2>
    
                <div class="input-box">

                    <input class='input-url' style="background-color: #fff; margin: 05px 0" type="file" id="image">
                    <img src="" id="img" style="width: 100%; border-radius: 10px; margin: 5px 0;">
                    <button class="input-button" onclick="uploadImage()">Upload</button>
    
                </div>
                
                <div class='card'>  
                
                    <h4 style='color: #fff'> <strong style='color: red'> Error</strong>.<strong style='color: red'>.</strong>. Formato Inválido </h4>
        
                </div>
        
                `

                })

                let correctImage = false
                data.predictions.map(predict => {

                    console.log(predict.probability)
                    if (predict.probability >= 0.5 && predict.tagName == logos[i]) {

                        correctImage = true
                        i++;

                    }

                })

                if (correctImage) {

                    alert("Parabéns!!")
                    localStorage.setItem("quest", i)
                    localStorage.setItem("firstTime", false)
                    window.location.reload()

                } else {

                    alert("Erro ao identificar!")
                    localStorage.setItem("quest", i)
                    localStorage.setItem("firstTime", false)
                    window.location.reload()

                }

            } else {
                // Erro ao fazer upload da imagem
                console.log("Erro ao fazer upload da imagem: " + xhr.status);
            }
        };

    }

}

async function start() {

    min = 3
    sec = 0
    localStorage.setItem("min", min)
    localStorage.setItem("sec", sec)
    document.querySelector("#intro").style.display = "none"
    document.querySelector("#content").style.display = "flex"

    console.log(`Procure por "${logos[i]}"`)
    title.innerHTML = `Procure por <strong style='color: #3EBDFF'>${logos[i]}</strong>`
    placar.innerHTML = `<strong style="color: #3EBDFF">${i+1}</strong>/${logos.length}`

    const interval = setInterval(() => {

        updateTimeSub()
        if(min == 0 && sec == 0){

            clearInterval(interval)
            document.querySelector("#content").innerHTML = `
    
            <h1 style="color: #fff; margin-bottom: 15px"> Você perdeu<strong style="color: #3EBDFF">!!<strong> </h1>
    
        `

        }

        if(i+1 > logos.length-1){

            clearInterval(interval)

        }

    }, 1000)

}

function updateTimeSub(){

    sec--

    if(sec <= 0 && min <= 0){

        alert("Fim de tempo!!")
        localStorage.setItem("min", 3)
        localStorage.setItem("sec", 0)
        return `00:00`

    }

    if(sec <= -1){
        
        min--
        sec = 59
        
    }

    localStorage.setItem("min", min)
    localStorage.setItem("sec", sec)

    console.log(`${min < 10? "0"+min: min}:${sec < 10? "0"+sec: sec}`)

    document.querySelector("#timer").innerHTML=`${min < 10? "0"+min: min}:${sec < 10? "0"+sec: sec}`

}

function clear(){

    localStorage.clear()

}

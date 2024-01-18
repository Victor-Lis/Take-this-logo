
# Take this logo

Esse é um dos projetos mais importantes para mim, mesmo sendo simples, foi um dos que mais mudou meus pensamentos, pois foi ele o projeto que me deu vontade de montar a apresentação que realizei para o E.P.A (Etec de Portas Abertas) na Etec na qual estudo, tem um post falando só disso no meu Linkedin: [Victor-Lis](https://www.linkedin.com/posts/victor-lis-bronzo-b39310273_fala-galera-no-%C3%BAltimo-fim-de-semana-eu-activity-7114273614425694208-dQTX?utm_source=share&utm_medium=member_desktop)

Esse foi um dos meus primeiros projetos utiliziando IA ou Computação em Nuvem então se tornou muito marcante.

## Desafios

Acredito que meus principais desafios nesse projeto foram:
- Utilizar um modelo novo de IA, o modelo de Pesquisa Visual Computacional de Classificação de Objetos.

## Aprendizados

Por final aprendi algumas coisas interessantes como: 

#### Usando a API [IMGUR](https://imgur.com/)
Tive muitas dificuldades de enviar uma imagem diretamente para a IA, então por fim mandei a imagem para API do [IMGUR](https://imgur.com/) e 
```javascript
if (document.querySelector("#image").files[0]) {
    const formData = new FormData();
    formData.append("image", document.querySelector("#image").files[0]);

    const xhr = new XMLHttpRequest();
    xhr.open("POST", url);
    xhr.setRequestHeader("Authorization", `Client-ID ${apiKey}`);
    xhr.send(formData);

    xhr.onload = async function () {...}
}
```

### Trabalhando com Probabilidades
```javascript
data.predictions.map(predict => {

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
```
## Autores

- [@Victor-Lis](https://github.com/Victor-Lis)


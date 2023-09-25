//https://teachablemachine.withgoogle.com/models/_eXZB_5qM/
prediction1 = ""
prediction2 = ""
Webcam.set({
    width: 350,
    height: 300,
    imageFormat: "png",
    pngQuality: 90
})
camera = document.getElementById("camera")
Webcam.attach("#camera")
function takesnapshot() {
    Webcam.snap(function (data_uri) {
        document.getElementById("result").innerHTML = '<img id = "captured_image" src = "' + data_uri + '">'
    })
}
console.log("version", ml5.version)
classifier = ml5.imageClassifier("https://storage.googleapis.com/tm-model/_eXZB_5qM/model.json", modelLoaded)
function modelLoaded() {
    console.log("modelo foi carregado")
}
function speak() {
    var synth = window.speechSynthesis
    speakdata1 = "a primeira previsão é:" + prediction1
    speakdata2 = "a segunda previsão é:" + prediction2
    var utterThis = new SpeechSynthesisUtterance(speakdata1 + speakdata2)
}
function check() {
    img = document.getElementById('captured_image');
    classifier.classify(img, gotResult)
}
function gotResult(error, results) {
    if (error) {
        console.log(error)
    } else {
        console.log(results)
        document.getElementById("resultEmotionName").innerHTML = results[0].label
        document.getElementById("resultEmotionName2").innerHTML = results[1].label
        prediction1 = results[0].label
        prediction2 = results[1].label
        speak()
        if (results[0].label == "Feliz") {
            document.getElementById("updateEmoji").innerHTML = "&#128514;"
        }
        if (results[0].label == "Triste") {
            document.getElementById("updateEmoji").innerHTML = "&#128557;"
        }
        if (results[0].label == "Irritado") {
            document.getElementById("updateEmoji").innerHTML = "&#128545;"
        }
        if (results[0].label == "Confuso") {
            document.getElementById("updateEmoji").innerHTML = "&#128565;"
        }

        if (results[1].label == "Feliz") {
            document.getElementById("updateEmoji2").innerHTML = "&#128514;"
        }
        if (results[1].label == "Triste") {
            document.getElementById("updateEmoji2").innerHTML = "&#128557;"
        }
        if (results[1].label == "Irritado") {
            document.getElementById("updateEmoji2").innerHTML = "&#128545;"
        }
        if (results[1].label == "Confuso") {
            document.getElementById("updateEmoji2").innerHTML = "&#128565;"
        }
    }
}

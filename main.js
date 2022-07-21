Webcam.set({
    width : 350,
    height: 300,
    imageFormat: 'png',
    pngQuality: 90
});

camera = document.getElementById("camera");

Webcam.attach("#camera");

function takeSnapshot () {
    Webcam.snap(function(data_uri){
        document.getElementById("result").innerHTML = '<img id="captured_image" src="'+data_uri+'"/>';
    });
}

console.log('ml5 version', ml5.version);
classifier = ml5.imageClassifier('https://teachablemachine.withgoogle.com/models/82XCEggG7/model.json', modelLoaded);
function modelLoaded () {
    console.log('model Loaded');
}

function speak () {
    var synth = window.speechSynthesis;
    speak_data = toSpeak;
    var utterThis = new SpeechSynthesisUtterance(speakData);
    synth.speak(utterThis);
}

function check () {
    img = document.getElementById("captured_image");
    classifier.classify(img, gotResult);
}

function gotResult (error, results) {
    if (error) {
        console.error(error);
    }
    else {
        console.log(results);

        document.getElementById("atualizarEmoji").innerHTML = results[0].label;

        gesture = results[0].label;

        toSpeak = "";

        if(gesture== "Gesto Estranho")
        {
            toSpeak = "Isso me parece tranquilo!";
            document.getElementById("updateEmoji").innerHTML = "&#129305;";
        }
}
}
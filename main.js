Webcam.set({
    width:350,
    height:300,
    image_format : 'png',
    png_quality:90
});


Webcam.attach('#webcam');

function take_snapshot() {
    Webcam.snap(function(data_uri){
        document.getElementById("snapshot").innerHTML = '<img id="capture_image" src="'+data_uri+'"/>';
    });
}
console.log('ml5 version:', ml5.version);
classifier = ml5.imageClassifier('https://teachablemachine.withgoogle.com/models/5ox0D8hPK/model.json', modelLoaded);
function modelLoaded() {
    console.log('Model Loaded!');
}
function speak() {
    var synth = window.speechSynthesis;
    speak_data_1 = "The first prediction is "+prediction_1;
    speak_data_2 = "And the second prediction is " + prediction_2;
    var utterThis = new SpeechSynthesisUtterance(speak_data_1+speak_data_2);
    synth.speak(utterThis);
}
function check(){
    console.log('check');
    img=document.getElementById("capture_image");
    classifier.classify(img, gotResult);
}
function gotResult(error, results) {
    console.log(results);
    prediction_1 = results[0].label;
    prediction_2 = results[1].label;
    document.getElementById("p1").innerHTML=prediction_1;
    document.getElementById("p2").innerHTML=prediction_2;
    if (prediction_1 == 'Happy') {
        emoji1 = '&#128522;';
    } else if (prediction_1 == 'Sad') {
        emoji1 = '&#128532;';
    } else if (prediction_1 == 'Angry'){
        emoji1 = '&#128548;';
    }
    if (prediction_2 == 'Happy') {
        emoji2 = '&#128522;';
    } else if (prediction_2 == 'Sad') {
        emoji2 = '&#128532;';
    } else if (prediction_2 == 'Angry'){
        emoji2 = '&#128548;';
    }
    document.getElementById("p1emoji").innerHTML = emoji1;
    document.getElementById("p2emoji").innerHTML = emoji2;
}
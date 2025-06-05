function changeMood(){
    const colors = ["orange", "brown", "yellow", "blue", "red", "green", "grey"]
    const randColor = colors[Math.floor(Math.random()* colors.length)]
    document.body.style.backgroundColor = randColor
}

function detectMood(){
    const mood = document.getElementById("moodInput").value.toLowerCase()
    const output = document.getElementById("moodOutput")

    let message = ""
    let color = ""

    if(mood === "happy"){
        message = "you're feeling happy 😊"
        color = "green"
    } else if(mood === "sad"){
        message = "you're feeling sad 😢"
        color = "#e0ffff"
    } else if(mood === "angry"){
        message = "you're feeling angry 😠"
        color = "red"
    } else if(mood === "tired"){
        message = "you're feeling tired 😴"
        color = "khaki"
    } else if(mood === "excited"){
        message = "you're feeling excited 🤩"
        color = "gold"
    } else{
        message = "Hmm... I don't recognize that mood 😶";
        color = "#f0f0f0"
    }
    output.textContent = message
    document.body.style.backgroundColor = color
}
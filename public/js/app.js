// alert("Hello i am Js CLient Side")

const form = document.querySelector("form")
const input = document.querySelector("input")
const messageOne = document.querySelector("#message-1")
const messageTwo = document.querySelector("#message-2")
form.addEventListener("submit", (e) => {
    e.preventDefault()
    messageOne.textContent = "Loading...."
    messageTwo.textContent = ""
    const location = input.value
    fetch(`/weather?address=${location}`).then((response) => {
        response.json().then((data) => {
            if (data.error) {
                messageOne.textContent = data.error
            } else {
                console.log(data);
                messageOne.textContent = data.location
                messageTwo.textContent = data.forecast
            }
        })

    })
})


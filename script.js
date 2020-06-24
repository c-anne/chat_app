const socket = io('http://localhost:3030')
const messageBox = document.getElementById('message-box')
const messageForm = document.getElementById('send-message')
const messageInput = document.getElementById('message-input')

const name = prompt('What is your name?')
appendMessage('Welcome to Chatter Box')
socket.emit('new-user', name)

socket.on('chat-message', data =>{
    appendMessage(`${data.name}: ${data.message}`)
})

socket.on('user-connected', name =>{
    appendMessage(`${name} connected`)
})

socket.on('user-disconnected', name =>{
    appendMessage(`${name} disconnected`)
})

messageForm.addEventListener('submit', e =>{
    e.preventDefault()
    const message = messageInput.value
    appendMessage(`You: ${message}`)
    socket.emit('send-chat-message', message)
    messageInput.value = ''
})

function appendMessage(message){
    const messageElement = document.createElement('div')
    messageElement.innerText = message
    messageBox.append(messageElement)
}
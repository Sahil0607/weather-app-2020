console.log('Client side js file is loaded');



const weatherform = document.querySelector('form');

weatherform.addEventListener('submit', e => {
    e.preventDefault()
    let location = document.querySelector('input').value;

    fetch('http://localhost:3000/weather?search=' + location +"'").then((response) => {
    response.json().then(res => {
        if (res.error) {
            console.log(res.error);
        } else {
            document.getElementById("location").innerHTML = res.location;
            document.getElementById("forecast").innerHTML = res.forecast;
        }
        
    })
});
})

// Connect to the server socket
const socket = io();

// Listen to 'number' event
socket.on('number', (msg) => {
  console.log('Random number:', msg);
  document.getElementById('number').innerText = msg;
});


const cardList = [
    {
        title: "Saving Private Ryan",
        image: "https://m.media-amazon.com/images/M/MV5BZGZhZGQ1ZWUtZTZjYS00MDJhLWFkYjctN2ZlYjE5NWYwZDM2XkEyXkFqcGc@._V1_FMjpg_UX1000_.jpg",
        link: "About Movie",
        desciption: " Release date: 19 November 1998 (Australia) Director: Steven Spielberg Budget: 70 million USD Awards: Academy Award for Best Directing, MORE Distributed by: Paramount Pictures, DreamWorks Pictures, FilmFlex Box office: $482.3 million"
    },
    {
        title: "Independence Day",
        image: "https://upload.wikimedia.org/wikipedia/en/thumb/b/bb/Independence_day_movieposter.jpg/220px-Independence_day_movieposter.jpg",
        link: "About Movie",
        desciption: "Director: Roland Emmerich Sequel: Independence Day: Resurgence Budget: 75 million USD Awards: MTV Movie & TV Award for Best Kiss, MOREDistributed by: 20th Century Studios"
    }
]

 
const submitForm = () => {
    let formData = {};
    formData.first_name = $('#first_name').val();
    formData.last_name = $('#last_name').val();
    formData.password = $('#password').val();
    formData.email = $('#email').val();
 
    console.log("Form Data Submitted: ", formData);

    fetch('/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ first_name:formData.first_name, last_name: formData.last_name, email:formData.email, password:formData.password }) // Send data as JSON
    })
    .then(response => response.json()) // Convert response to JSON
    .then(data => {
        document.getElementById('status').innerText = ` ${data.message}`;
        
    })
    .catch(error => {
        console.error('Error:', error);
    });
}
 
const addCards = (items) => {
    items.forEach(item => {
        let itemToAppend = '<div class="col s4 center-align">'+
    '<div class="card medium"><div class="card-image waves-effect waves-block waves-light"><img class="activator" src="'+item.image+'">'+
    '</div><div class="card-content">'+
    '<span class="card-title activator grey-text text-darken-4">'+item.title+'<i class="material-icons right">more_vert</i></span><p><a href="#">'+item.link+'</a></p></div>'+
    '<div class="card-reveal">'+
        '<span class="card-title grey-text text-darken-4">'+item.title+'<i class="material-icons right">close</i></span>'+
        '<p class="card-text grey-text text-darken-4">'+item.desciption+'</p>'+
      '</div></div></div>';
      $("#card-section").append(itemToAppend)
    });
}

 
 
 
$(document).ready(function(){
    $('.materialboxed').materialbox();
    $('#formSubmit').click(()=>{
        submitForm();
        setTimeout(() => {
            $('#modal1').modal('close'); // Close modal after form submission
        }, 500);
    })
    addCards(cardList);
    $('.modal').modal();
  });
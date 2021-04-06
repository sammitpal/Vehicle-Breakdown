const sname = document.getElementById('sname');
const owner = document.getElementById('owner');
const loc = document.getElementById('location');
const latitude = document.getElementById('latitude');
const longitude = document.getElementById('longitude');

const submit = document.getElementById('submit');

submit.addEventListener('click',(e)=>{
    e.preventDefault();
    const SNAME =sname.value;
    const OWNER =owner.value;
    const LOCATION =loc.value;
    const LATITUDE =latitude.value;
    const LONGITUDE =longitude.value;

    formData(SNAME,OWNER, LOCATION, LATITUDE, LONGITUDE)
})
async function formData(sname, owner, location, latitude, longitude){
    const formdata = {
        Sname: sname,
        Owner: owner,
        Location: location,
        Lat: latitude,
        Lan: longitude
    }
    const options = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(formdata)
    }
    const response = await fetch('/services', options);
    const data = await response.json();
    console.log(data);
}
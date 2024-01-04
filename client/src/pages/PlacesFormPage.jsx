import PhotosUploader from "../PhotosUploader";
import Perks from "../Perks";
import { useState } from "react";
import axios from "axios";
import AccountNav from "../AccountNav";
import { Navigate } from "react-router-dom";
export default function PlacesFormPage(){
    const [title,setTitle]= useState('');
    const[address,setAddress]=useState('');
    const [addedPhotos , setAddedPhotos] = useState('');
    const [description , setDescription] = useState('');
    const [perks , setPerks]= useState([]);
    const [extraInfo, setExtraInfo] = useState('');
    const [checkIn , setCheckIn] = useState('');
    const [ checkOut , setCheckOut] = useState('');
    const [maxGuests , setMaxGuests] = useState(1);
    const [redirect,setRedirect] = useState(false)
    function inputHeader(text){
        return (
          <h2 className="text-2xl mt-4">{text}</h2>
        )
      }
      function inputDescription(text){
        return (
          <p className="text-gray-500 text-sm">
          {text}
        </p>
        )
      }
      function preInput (header, description){
        return(
          <div>
          {inputHeader(header)}
          {inputDescription(description)}
          </div>
        )
      }
      
      async function addNewPlace(ev){
        ev.preventDefault();
       await axios.post('/places',{
          title , address , addedPhotos , 
          description , perks , extraInfo , 
          checkIn , checkOut ,maxGuests
        });   
        setRedirect(true);
    }
    if(redirect){
        return <Navigate to={'/account/places'}/>
    }
    return (
        <div>
        <AccountNav/>
        <form onSubmit={addNewPlace}>
        {preInput('Title','Title for your place, should be shot and catchy as in advertisement' )}
          <input type="text" value={title} onChange={ev =>setTitle(ev.target.value)} placeholder="title, for example:My lovely appartment"/>
          {preInput('Address','Address to this place')}
          <input type="text" value={address} onChange={ev=>setAddress(ev.target.value)} placeholder="address" />
          {preInput('Photos' ,'More = Better')}
          <PhotosUploader addedPhotos={addedPhotos} onChange={setAddedPhotos}/>
          
          {preInput('Description' ,'Description of the place')}
          <textarea className="w-full h-full border border-gray-300 rounded-2xl" value={description} onChange={ev=>setDescription(ev.target.value)}/>
          {preInput('Perks' ,'Select all the perks of your place')}

          <div className="grid mt-2 gap-2 grid-cols-2 md:grid-cols-3 lg:grid-cols-6">
           <Perks selected={perks} onChange={setPerks}/>
          
          </div>
          
          
          {preInput('Extra Info','House rules etc')}
          <textarea className="w-full h-full border border-gray-300 rounded-2xl" value={extraInfo} onChange={ev => setExtraInfo(ev.target.value)}/>
          {preInput('Check In & Out Time' ,'Add Check In And Out Times , remember to have some time window for cleaning the room between guests')}
          
          <div className="grid gap-2 sm:grid-cols-3">
          <div>
          <h3 className="mt-2 -mb-1">Check In Time</h3>
          <input value={checkIn} onChange={ev=>setCheckIn(ev.target.value)} type="text" placeholder="14:00"/>
          </div>
          <div>
          <h3 className="mt-2 -mb-1">Check Out Time</h3>
          <input value={checkOut} onChange={ev=> setCheckOut(ev.target.value)} type="text" placeholder="11"/>
          </div>
          <div>
          <h3 className="mt-2 -mb-1">Max Number Of Guests</h3>
          <input value={maxGuests} onChange={ev=>setMaxGuests(ev.target.value)} type="number"/></div>
          </div>

              <button className="primary my-4 ">Save</button>
  
        </form>
       
      </div>
    );
}

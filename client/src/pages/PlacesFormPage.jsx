import PhotosUploader from "../PhotosUploader";
import Perks from "../Perks";
import { useEffect, useState } from "react";
import axios from "axios";
import AccountNav from "../AccountNav";
import { Navigate, useParams } from "react-router-dom";

export default function PlacesFormPage(){
   const {id} = useParams();
    const [title,setTitle]= useState('');
    const[address,setAddress]=useState('');
    const [addedPhotos , setAddedPhotos] = useState('');
    const [description , setDescription] = useState('');
    const [perks , setPerks]= useState([]);
    const [extraInfo, setExtraInfo] = useState('');
    const [checkIn , setCheckIn] = useState('');
    const [ checkOut , setCheckOut] = useState('');
    const [maxGuests , setMaxGuests] = useState(1);
    const [redirect,setRedirect] = useState(false);
    const [price, setPrice] =useState(100);
    useEffect(()=>{
      if(!id){
        return;
      }
      axios.get('/places/'+id).then(response =>{
        const {data} = response;
        setTitle(data.title);
        setAddress(data.address);
        setAddedPhotos(data.photos);
        setDescription(data.description);
        setPerks(data.perks);
        setExtraInfo(data.extraInfo);
        setCheckOut(data.checkOut);
        setCheckIn(data.checkIn);
        setMaxGuests(data.maxGuests);
        setPrice(data.price);
      })
    },[id])
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
      
      async function savePlace(ev){
        ev.preventDefault();
        const placeData ={ title , address , addedPhotos , 
          description , perks , extraInfo , 
          checkIn , checkOut ,maxGuests , price}
        if(id){
          //update
          await axios.put('/places',{
            id,...placeData
          });   
          setRedirect(true);
        }
        else{
          await axios.post('/places',placeData);   
          setRedirect(true);
        }
       
    }
    if(redirect){
        return <Navigate to={'/account/places'}/>
    }
    return (
        <div>
        <AccountNav/>
        <form onSubmit={savePlace}>
        {preInput('Title','Title for your place, should be shot and catchy as in advertisement' )}
          <input type="text" value={title} onChange={ev =>setTitle(ev.target.value)} placeholder="title, for example:My lovely appartment"/>
          {preInput('Address','Address to this place')}
          <input type="text" value={address} onChange={ev=>setAddress(ev.target.value)} placeholder="address" />
          {preInput('Photos' ,'More = Better')}
          <PhotosUploader addedPhotos={addedPhotos} onChange={setAddedPhotos}/>
          
          {preInput('Description' ,'Description of the place')}
          <textarea className=" pl-2 height:140px w-full h-full border border-gray-300 rounded-2xl " value={description} onChange={ev=>setDescription(ev.target.value)}/>
          {preInput('Perks' ,'Select all the perks of your place')}

          <div className="grid mt-2 gap-2 grid-cols-2 md:grid-cols-3 lg:grid-cols-6">
           <Perks selected={perks} onChange={setPerks}/>
          
          </div>
          
          
          {preInput('Extra Info','House rules etc')}
          <textarea className=" pl-2 w-full h-full border border-gray-300 rounded-2xl height:140px" value={extraInfo} onChange={ev => setExtraInfo(ev.target.value)}/>
          {preInput('Check In & Out Time' ,'Add Check In And Out Times , remember to have some time window for cleaning the room between guests')}
          
          <div className="grid gap-2 grid-cols-2 md:grid-cols-4">
          <div>
          <h3 className="mt-2 -mb-1">Check In Time</h3>
          <input className="border-gray-400" value={checkIn} onChange={ev=>setCheckIn(ev.target.value)} type="text" placeholder="14:00"/>
          </div>
          <div>
          <h3 className="mt-2 -mb-1">Check Out Time</h3>
          <input className="border-gray-400" value={checkOut} onChange={ev=> setCheckOut(ev.target.value)} type="text" placeholder="11"/>
          </div>
          <div>
          <h3 className="mt-2 -mb-1">Max Number Of Guests</h3>
          <input  className=" pl-2 mt-2 border border-gray-400 rounded-xl" value={maxGuests} onChange={ev=>setMaxGuests(ev.target.value)} type="number"/>
          </div>
          <div >
          <h3 className="mt-2 -mb-1">Price per Night</h3>
          <input className="pl-2 mt-2 border border-gray-400 rounded-xl" value={price} onChange={ev=>setPrice(ev.target.value)} type="number"/>
          </div>
          </div>
              <button className="primary my-4 ">Save</button>
  
        </form>
       
      </div>
    );
}

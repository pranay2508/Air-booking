/* eslint-disable react/prop-types */
import { useContext, useEffect, useState } from "react";
import { differenceInCalendarDays } from "date-fns";
import axios from "axios";
import {UserContext} from "./UserContext";
import { Navigate } from "react-router-dom";
export default function BookingWidget({ place }) {
  const [checkIn, setCheckIn] = useState("");
  const [checkOut, setCheckOut] = useState("");
  const [numberOfGuests, setNumberOfGuests] = useState(1);
  const [name, setName] = useState("");
  const [phone, setphone] = useState("");
  const [redirect , setRedirect] = useState('');
  const {user} = useContext(UserContext);
  useEffect(()=>{
    if(user){
      setName(user.name);
    }
  },[user])
  let numberofNights = 0;
  if (checkIn && checkOut) {
    // eslint-disable-next-line no-unused-vars
    numberofNights = differenceInCalendarDays(
      new Date(checkOut),
      new Date(checkIn)
    );
  }

  async function bookedThisPlace() {
  
   const response = await axios.post("/bookings",{
    checkIn,
    checkOut,
    numberOfGuests,
    name,
    phone,
    place: place._id,
    price: numberofNights * place.price
  });
  const bookingId = response.data._id;
  setRedirect(`/account/bookings/${bookingId}`);
  }

  if(redirect){
    return <Navigate to={redirect}/>
  }

  return (
    <div>
      <div className="bg-white shadow p-4 rounded-2xl">
        <div className="text-2xl text-center">
          Price: ${place.price} / per night
        </div>
        <div className="border rounded-2xl mt-4">
          <div className="flex">
            <div className="py-3 px-4 ">
              <label>Check in:</label>
              <input
                type="date"
                value={checkIn}
                onChange={(ev) => setCheckIn(ev.target.value)}
              />
            </div>

            <div className="py-3 px-4 border-l">
              <label>Check Out:</label>
              <input
                type="date"
                value={checkOut}
                onChange={(ev) => setCheckOut(ev.target.value)}
              />
            </div>
          </div>
          <div className="py-3 px-4 border-t">
            <label>Number of Guests:</label>
            <input
              type="number"
              value={numberOfGuests}
              onChange={(ev) => setNumberOfGuests(ev.target.value)}
            />
          </div>
          {numberofNights > 0 && (
            <div className="py-3 px-4 border-t">
              <label>Your full Name</label>
              <input
                type="text"
                value={name}
                onChange={(ev) => setName(ev.target.value)}
              />

              <label>Phone number</label>
              <input
                type="tel"
                value={phone}
                onChange={(ev) => setphone(ev.target.value)}
              />
            </div>
          )}
        </div>
        <button onClick={bookedThisPlace} className="primary mt-4">
          Book this Place
          {numberofNights > 0 && (
            <span className="pl-2">${numberofNights * place.price}</span>
          )}
        </button>
      </div>
    </div>
  );
}

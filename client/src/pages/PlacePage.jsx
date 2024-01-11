import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import BookingWidget from "../BookingWidget";
import PlaceGallery from "../PlaceGallery";
import AddressLink from "../AddressLink";
export default function PlacesPage() {
  const { id } = useParams();

  const [place, setPlace] = useState(null);

  useEffect(() => {
    if (!id) {
      return;
    }
    axios
      .get(`/places/${id}`)
      .then((response) => {
        console.log(response);
        setPlace(response.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [id]);

  if (!place) return "";

  return (
    <div className="mt-4 bg-gray-100 -mx-8 px-8 pt-8">
      <h1 className="text-3xl">{place.title} </h1>
      <AddressLink>{place.address}</AddressLink>

      <PlaceGallery place={place} />

      <div className="mt-8 mb-8 grid gap-8 grid-cols-1 sm:grid-cols-[2fr_1fr]">
        <div>
          <div className="my-1">
            <h2 className="font-semibold text-2xl">Description</h2>
            {place.description}
          </div>
          Check-in: {place.checkIn}
          <br />
          Check-out: {place.checkOut}
          <br />
          Max number of guests: {place.maxGuests}
        </div>
        <div>
          <BookingWidget place={place} />
        </div>
      </div>
      <div className="bg-white mt-2 -mx-8 px-8 py-8 border-t rounded-xl">
        <h2 className="font-semibold text-2xl">Extra Info</h2>
        <div className=" pb-3 mb-4 mt-2 text-sm text-gray-700 leading-5">
          {place.extraInfo}
        </div>
      </div>
    </div>
  );
}

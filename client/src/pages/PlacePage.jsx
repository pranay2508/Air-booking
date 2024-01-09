import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
export default function PlacesPage(){
    const {id}= useParams();

    const [place , setPlace]=useState(null);
    useEffect(()=>{
        if(!id){
            return;
        }
        axios.get(`/places/${id}`).then(response =>{
            console.log(response);
            setPlace(response.data);
        }).catch((err)=> {
            console.log(err);
        })
    },[id]);
    
    if(!place) return '';
    return (
        <div className="mt-4 bg-gray-100 -mx-8 px-8 py-8">
        <h1 className="text-3xl">{place.title} </h1>
        <a className="my-2 block font-semibold underline" target="_blank" href={`https://maps.gooogle.com/?=${place.address}`} rel="noreferrer">{place.address}</a>
        <div className="grid gap-2  grid-cols-[2fr_1fr]">
            <div>
                {place.photos?.[0] && (
                   <div > <img src={'http://localhost:4000/uploads/'+place.photos[0]}/> </div>
                )}
            </div>
            <div className="grid">
            {place.photos?.[1] && (
                    <img  src={'http://localhost:4000/uploads/'+place.photos[1]}/>
                )}
                <div className="overflow-hidden">
                {place.photos?.[2] && (
                    <img className=" relative top-2" src={'http://localhost:4000/uploads/'+place.photos[2]}/>
                )}
                </div>
            
            </div>
        </div>
        </div> 
    );
}

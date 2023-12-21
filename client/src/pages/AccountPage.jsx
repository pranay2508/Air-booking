import { useContext} from "react";
import { UserContext } from "../UserContext";
import { Link, Navigate, useParams } from "react-router-dom";
export default function AccountPage(){
   const {ready, user} =useContext(UserContext);
   let {subpage}=useParams();
  
   if(!ready) {
      return 'Loading....'
   }
   if(ready && !user){
      return <Navigate to={'/login'}/>
      
   }

   

     return (
      <div>
  <nav className="w-full max-w-screen-lg mx-auto flex justify-center mt-8 gap-2">
    <Link className={`py-3 px-8 ${subpage === undefined ? 'bg-primary text-white rounded-full' : 'bg-secondary text-black rounded-full'} transition duration-300 ease-in-out hover:bg-gray-200 hover:text-black`} to="/account">My Profile</Link>
    <Link className={`py-3 px-8 ${subpage === "bookings" ? 'bg-primary text-white rounded-full' : 'bg-secondary text-black rounded-full'} transition duration-300 ease-in-out hover:bg-gray-200 hover:text-black`} to={'/account/bookings'}>My bookings</Link>
    <Link className={`py-3 px-8 ${subpage === "places" ? 'bg-primary text-white rounded-full' : 'bg-secondary text-black rounded-full'} transition duration-300 ease-in-out hover:bg-gray-200 hover:text-black`} to={'/account/places'}>My account</Link>
  </nav>
</div>

     );
}


// this file has problems from 2:01:03 video from youtube 














// <div>
// <nav className="w-full flex justify-center mt-8 gap-2">
// <Link className="py-2 px-6 bg-primary text-white rounded-full" to={'/account'}>My Profile</Link>
// <Link className="py-2 px-6" to={'/account/bookings'}>My bookings</Link>
// <Link className="py-2 px-6" to={'/account'}>My account</Link>
// </nav>
// </div>
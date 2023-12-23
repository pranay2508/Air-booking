import { useContext, useState} from "react";
import { UserContext } from "../UserContext";
import { Link, Navigate, useParams } from "react-router-dom";
import axios from "axios";
export default function AccountPage(){
   const [redirect, setRedirect] = useState(null);
   const {ready, user,setUser} =useContext(UserContext);
   let {subpage}=useParams();
  
   async function logout(){
      await axios.post('/logout');
     setRedirect('/');
   setUser(null);
   }
   if(!ready) {
      return 'Loading....'
   }
   if(ready && !user && !redirect){
      return <Navigate to={'/login'}/>
      
   }
   if(redirect){
      return <Navigate to={redirect}/>
   }
     return (
      <div>
  <nav className="w-full max-w-screen-lg mx-auto flex justify-center mt-8 gap-2 mb-8">
    <Link className={`py-3 px-8 ${subpage === undefined ? 'bg-primary text-white rounded-full' : 'bg-secondary text-black rounded-full'} transition duration-300 ease-in-out hover:bg-gray-200 hover:text-black`} to="/account">My Profile</Link>
    <Link className={`py-3 px-8 ${subpage === "bookings" ? 'bg-primary text-white rounded-full' : 'bg-secondary text-black rounded-full'} transition duration-300 ease-in-out hover:bg-gray-200 hover:text-black`} to={'/account/bookings'}>My bookings</Link>
    <Link className={`py-3 px-8 ${subpage === "places" ? 'bg-primary text-white rounded-full' : 'bg-secondary text-black rounded-full'} transition duration-300 ease-in-out hover:bg-gray-200 hover:text-black`} to={'/account/places'}>My account</Link>
  </nav>
  {subpage ===undefined && (
   <div className="text-center max-w-lg mx-auto">
      Logged in as {user.name} ({user.email})<br/>
      <button onClick={logout} className="primary max-w-sm mt-2">Logout</button>
   </div>
  )}
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
"use client"
import { LockKeyhole, LogOut } from "lucide-react"
import { useRouter } from "next/navigation"
import { useEffect, useState } from "react";
import Link from "next/link";
import axios from "axios";
import { BASE_URL } from "@/constant";
import toast, { Toaster } from 'react-hot-toast';

const Sidebar = () => {
    const router = useRouter();
    const [userName, setuserName] = useState(null); 
    const [userEmail, setuserEmail] = useState(null);
    const [activeSection, setActiveSection] = useState('dashboard');
    
        const handlelogout = async()=>{
          try {
            const response = await axios.post(`${BASE_URL}/logout`,{},{withCredentials:true});
            toast.success("Logout Successfull");
            console.log("Response is : ",response);
            
            router.push('/');
          } catch (error) {
            console.error("Api failed: ",error.message);   
          }
    }

    useEffect(() => {
        const getUserProfileData = async()=>{
            try {
                const response = await axios.get(`${BASE_URL}/profile`,{withCredentials:true});
                console.log(response.data["User: "]);
                setuserName(response.data["User: "].name);
                setuserEmail(response.data["User: "].email);
            } catch (error) {
                console.error("Api failed: ",error); 
            }
        };
        getUserProfileData();
    }, [])
    

    useEffect(() => {
        toast.dismiss(); // Clears any previous toasts when the component loads
      }, []);

  return (
    <div>
    <Toaster />
    <aside className="flex flex-col w-64 px-4 py-8  border-r rtl:border-r-0 rtl:border-l dark:bg-gray-900 dark:border-gray-700">
  <a href="/user/profile" className="mx-auto">
      <img className="w-auto h-6 sm:h-7" src="https://merakiui.com/images/full-logo.svg" alt=""/>
  </a>

  <div className="flex flex-col items-center mt-6 -mx-2">
      <img className="object-cover w-24 h-24 mx-2 rounded-full" src="https://images.unsplash.com/photo-1531427186611-ecfd6d936c79?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=634&q=80" alt="avatar"/>
      <h4 className="mx-2 mt-2 font-medium text-gray-800 dark:text-gray-200">{userName}</h4>
      <p className="mx-2 mt-1 text-sm font-medium text-gray-600 dark:text-gray-400">{userEmail}</p>
  </div>

  <div className="flex flex-col justify-between flex-1 mt-6">
  <nav>
            <Link 
                href="/user/dashboard" 
                className={`flex items-center hover:bg-gray-300 hover:text-gray-600 px-4 py-3 ${activeSection === 'dashboard' ? 'bg-gray-300' : 'text-gray-600'} rounded-lg dark:${activeSection === 'dashboard' ? 'bg-gray-800' : 'text-gray-400'} hover:text-gray-700`}
                onClick={() => setActiveSection('dashboard')}
            >
                <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M19 11H5M19 11C20.1046 11 21 11.8954 21 13V19C21 20.1046 20.1046 21 19 21H5C3.89543 21 3 20.1046 3 19V13C3 11.8954 3.89543 11 5 11M19 11V9C19 7.89543 18.1046 7 17 7M5 11V9C5 7.89543 5.89543 7 7 7M7 7V5C7 3.89543 7.89543 3 9 3H15C16.1046 3 17 3.89543 17 5V7M7 7H17" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
                <span className="mx-4 font-medium">Dashboard</span>
            </Link>

            <Link 
                href="/user/profile" 
                className={`flex items-center hover:bg-gray-300 hover:text-gray-600 px-4 py-3 mt-2 ${activeSection === 'profile' ? 'bg-gray-300' : 'text-gray-600'} transition-colors duration-300 transform rounded-lg dark:${activeSection === 'profile' ? 'bg-gray-800' : 'text-gray-400'} hover:text-gray-700`}
                onClick={() => setActiveSection('profile')}
            >
                <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M16 7C16 9.20914 14.2091 11 12 11C9.79086 11 8 9.20914 8 7C8 4.79086 9.79086 3 12 3C14.2091 3 16 4.79086 16 7Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                    <path d="M12 14C8.13401 14 5 17.134 5 21H19C19 17.134 15.866 14 12 14Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
                <span className="mx-4 font-medium">Profile</span>
            </Link>

            <Link 
                href ="/user/changePassword" 
                className={`flex items-center hover:bg-gray-300 hover:text-gray-600  px-4 py-3 mt-2 ${activeSection === 'change-password' ? 'bg-gray-300' : 'text-gray-600'} transition-colors duration-300 transform rounded-lg dark:${activeSection === 'change-password' ? 'bg-gray-800' : 'text-gray-400'} hover:text-gray-700`}
                onClick={() => setActiveSection('change-password')}
            >
                <LockKeyhole size={20} />
                <span className="mx-4 font-medium">Change Password</span>
            </Link>

            <div 
                className={`flex items-center hover:bg-gray-300 hover:text-gray-600 px-4 py-3 mt-2 ${activeSection === 'logout' ? 'bg-gray-300' : 'text-gray-600'} cursor-pointer transition-colors duration-300 transform rounded-lg dark:${activeSection === 'logout' ? 'bg-gray-800' : 'text-gray-400'} hover:text-gray-700`} 
                onClick={() => {
                    handlelogout();
                    setActiveSection('logout');
                }}
            >
                <LogOut size={20} />
                <span className="mx-4 font-medium">Logout</span>
            </div>
        </nav>
  </div>
</aside>
  </div>
  )
}

export default Sidebar;
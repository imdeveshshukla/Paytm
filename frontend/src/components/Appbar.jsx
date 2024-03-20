import { useNavigate } from "react-router-dom";
import Button from "./Button"
export const Appbar = ({ name }) => {
    const navigate = useNavigate();

    
    return <div className="shadow h-14 flex justify-between">
        <div className="flex flex-col justify-center h-full ml-4">
            PayTM App
        </div>
        <div className="flex">
            <div className="flex flex-col justify-center h-full mr-4">
                Hello, { name }
            </div>
            <button
            onClick={()=>{
                localStorage.removeItem("token");
                navigate("../signin");
            }}
             className=" text-black bg-white hover:text-gray-900 focus:outline-none focus:ring-4 font-medium rounded-lg text-sm px-2 py-1 mx-2">LogOut</button>
        </div>
    </div>
}
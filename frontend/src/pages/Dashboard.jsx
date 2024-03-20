import { useState,useEffect } from "react";
import { Appbar } from "../components/Appbar";
import { Balance } from "../components/Balance";
import { Users } from "../components/Users";
import axios from "axios";

function Dashboard(){
    const [bal,setBal] = useState(0);
    useEffect(()=>{
        axios.get("http://localhost:3000/api/v1/account/bal",{
            headers:{
                authorization: "Bearer "+localStorage.getItem("token")
            }
        })
        .then((val)=>{
            setBal(val.data.balance)
        })
    },[])
    return (
        <div >
            <Appbar/>
            <div className="m-2">
                <Balance value={bal}/>
            </div>
            <div className="p-5 m-2 border rounded-sm">
                <Users/>
            </div>
        </div>
    )
}

export default Dashboard;
import { useEffect, useState } from "react"
import { Button } from "./Button"
import axios from "axios";
import { useNavigate } from "react-router-dom";

export const Users = () => {
    // Replace with backend call
    const [users, setUsers] = useState([]);
    const [filter,setFilter] = useState("");
    const navi = useNavigate();

    //debouncing 
    useEffect(()=>{
        axios.get("http://localhost:3000/api/v1/user/bulk?filter="+filter,{
            headers:{
                authorization: "Bearer "+localStorage.getItem("token")
            }
        }).then((res)=>{
            setUsers(res.data);
        })
        .catch((err)=>{
            console.log(err);
        })
        // console.log(res.data);
    },[filter])

    return <>
        <div className="font-bold mt-6 text-lg">
            Users
        </div>
        <div className="my-2">
            <input type="text"
            onChange={(e)=>{
                setFilter(e.target.value)
            }}
             placeholder="Search users..." className="w-full px-2 py-1 border rounded border-slate-200"></input>
        </div>
        <div>
            {users.map(user => <User user={user} />)}
        </div>
    </>
}

function User({user}) {
    return <div className="flex justify-between">
        <div className="flex">
            <div className="rounded-full h-12 w-12 bg-slate-200 flex justify-center mt-1 mr-2">
                <div className="flex flex-col justify-center h-full text-xl">
                    {user.name[0]}
                </div>
            </div>
            <div className="flex flex-col justify-center h-ful">
                <div>
                    {user.name}
                </div>
            </div>
        </div>

        <div className="flex flex-col justify-center h-ful">
            <Button onClick={()=>{
                // history.pushState(null,null,"/send?id="+user.id+"&name="+user.name)
                window.location = `/send?id=${user.id}&name=${user.name}`
            }} label={"Send Money"} />
        </div>
    </div>
}
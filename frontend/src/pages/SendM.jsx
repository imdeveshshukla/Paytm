import axios from "axios";
import { useState } from "react";
import { useParams, useSearchParams } from "react-router-dom";
import Loader from "../components/Loader";
import logo from "../assets/done.gif"


const SendM = () => {
    const [amt,setamount] = useState();

    const [param] = useSearchParams();
    const id = param.get("id");
    const name = param.get("name");

    const [loading,setLoading] = useState(false);
    const [paymentDone,setPayment] = useState(false);
    return <div class="flex justify-center h-screen bg-gray-100">
        <div className="h-full flex flex-col justify-center">
        
            <div
                class="border h-min text-card-foreground max-w-md p-4 space-y-8 w-96 bg-white shadow-lg rounded-lg"
            >
                <div class="flex flex-col space-y-1.5 p-6">
                <h2 class="text-3xl font-bold text-center">Send Money</h2>
                </div>
                {paymentDone?<img src={logo} alt="done" className="w-32 h-32 p-5 m-auto"/>:
                <div class="p-6">
                <div class="flex items-center space-x-4">
                    <div class="w-12 h-12 rounded-full bg-green-500 flex items-center justify-center">
                    <span class="text-2xl text-white">{name[0]}</span>
                    </div>
                    <h3 class="text-2xl font-semibold">{name}</h3>
                </div>
                <div class="space-y-4">
                    <div class="space-y-2">
                    <label
                        class="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                        for="amount"
                    >
                        Amount (in Rs)
                    </label>
                    <input
                        type="number"
                        class="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                        id="amount"
                        onChange={(e)=>setamount(e.target.value)}
                        placeholder="Enter amount"
                    />
                    </div>
                    <button onClick={async()=>{
                        setLoading(true);
                        const res = await axios.post("http://localhost:3000/api/v1/account/transfer",{
                            to:id,
                            amount:amt
                        },{
                            headers:{
                                authorization:"Bearer "+localStorage.getItem("token")
                            }
                        })
                        setLoading(false);
                        if(res.data.message == 'Transfer successful')
                            setPayment(true);
                    }} class="justify-center rounded-md text-sm font-medium ring-offset-background transition-colors h-10 px-4 py-2 w-full bg-green-500 text-white">
                        {loading?<Loader />:"Initiate Transfer"}
                        
                    </button>
                </div>
                </div>
                }
        </div>
      </div>
    </div>
}

export default SendM;
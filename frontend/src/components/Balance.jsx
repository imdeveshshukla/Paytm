import { useEffect } from "react"

export const Balance = ({ value }) => {
    

    return <div className="flex">
        <div className="font-semibold text-lg">
            Your balance : Rs
        </div>
        <div className="font-bold ml-4 text-lg">
            {value}
        </div>
    </div>
}
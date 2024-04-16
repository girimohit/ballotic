"use client";
import { useState } from "react";

const VoterList = () => {
    const [voterlist, setVoterlist] = useState<any[]>([]);

    const fetchVoterData = async () => {
        try {
            const response = await fetch('/api/admin/voterList');
            const data = await response.json();
            setVoterlist(data.voterList);
        } catch (error) {
            console.log(error)

        }
        return (
            <div>VoterList</div>
        )
    }
}

export default VoterList
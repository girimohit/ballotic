"use client";
import { useState } from "react";

const CandidatesList = () => {
    const [fetchVoter, setFetchVoter] = useState<any[]>([]); // Specify the type as an array of any

    const fetchVoterData = async () => {
        try {
            const response = await fetch('/api/candidates');
            const data = await response.json();
            setFetchVoter(data.voters);
        } catch (error) {
            console.error('Error fetching voter data:', error);
        }
    }

    return (
        <>
            <button onClick={fetchVoterData}>
                All voters
            </button>
            <div>CandidatesList</div>
            {/* Render the Fetched Voters */}
            {
                fetchVoter && ( // Check if fetchVoter has data before rendering
                    <div className="mt-10">
                        {fetchVoter.map(item => (
                            <ul key={item.id} className="border border-gray-400 px-8 py-1 rounded-sm">
                                <li>{item.name} - {item.age}</li>
                            </ul>
                        ))}
                    </div>
                )
            }
        </>
    )
}
export default CandidatesList
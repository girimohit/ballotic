"use client";

import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { useEffect, useState, useCallback } from "react";

const queries = [
    { id: 1, query: "SELECT * FROM voter" },
    { id: 2, query: "SELECT * FROM candidates" },
    { id: 3, query: "SELECT * FROM wards" },
    {
        id: 4,
        query: "SELECT e.election_id, e.election_name, c.name AS candidate_name, p.party_name FROM elections e JOIN candidates c ON e.election_id = c.election_id JOIN parties p ON c.party_id = p.party_id",
        question: "Get all elections along with their candidates and respective parties"
    },
    {
        id: 5,
        query: "SELECT c.name AS candidate_name, COUNT(er.election_id) AS num_wins FROM candidates c JOIN election_results er ON c.candidate_id = er.candidate_id GROUP BY c.name ORDER BY num_wins DESC LIMIT 1;",
        question: "Retrieve the candidate who won the maximum number of elections"
    },
    {
        id: 6,
        query: "SELECT v.ward_number, COUNT(v.voter_id) AS total_voters FROM voter v GROUP BY v.ward_number ORDER BY total_voters DESC LIMIT 5",
        question: "Retrieve the top 5 wards with the highest voter turnout"
    },
    {
        id: 7,
        query: "SELECT d.district_id, d.district_name, COUNT(v.voter_id) AS num_voters FROM districts d LEFT JOIN voter v ON d.district_id = v.district_id GROUP BY d.district_id",
        question: "Find the total number of registered voters in each district"
    },
    {
        id: 8,
        query: "SELECT e.election_id, e.election_name, COUNT(c.candidate_id) AS num_candidates FROM elections e LEFT JOIN candidates c ON e.election_id = c.election_id GROUP BY e.election_id",
        question: "Retrieve all elections along with the number of candidates participating in each election"
    },
];

export default function CustomResult() {
    const [responses, setResponses] = useState<Array<any>>([]);
    const queryRes = useCallback(async (q: string, index: number) => {
        const response = await fetch("/api/custom-query", {
            method: "POST",
            headers: { "Content-Type": "application/json", },
            body: JSON.stringify({ que: q }),
        });
        const data = await response.json();
        setResponses((prevResponses) => {
            const updatedResponses = [...prevResponses]; // Copy existing responses
            updatedResponses[index] = data;
            return updatedResponses;
        });
    }, []);

    useEffect(() => {
        queries.forEach((q, index) => {
            queryRes(q.query, index);
        });
    }, [queryRes]); // Include queryRes in the dependency array

    return (
        <>
            {/* <div className="flex flex-col justify-start"> */}

                <Accordion type="single" collapsible className="md:w-[60%] w-[85%]">
                    {queries.map((q, index) => (
                        <AccordionItem className="py-1.5" key={q.id} value={`item-${q.id}`}>
                            <AccordionTrigger className="w-full text-base p-3 py-5 text-start">
                                {q.id}. {q.question}
                            </AccordionTrigger>
                            <AccordionContent className="px-5">
                                {responses[index] && JSON.stringify(responses[index])}
                            </AccordionContent>
                        </AccordionItem>
                    ))}
                </Accordion>
            {/* </div> */}
        </>
    );
}
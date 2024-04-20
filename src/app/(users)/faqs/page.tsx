import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/components/ui/accordion"
import { Button } from "@/components/ui/button"
import { query } from "@/database/db"
import CustomResult from "./custom"



const queries = [
    {
        id: 1,
        query: "SELECT * FROM voter"
    },
    {
        id: 2,
        query: "SELECT * FROM candidates"
    },
    {
        id: 3,
        query: "SELECT * FROM wards"
    }
]
const FAQsPage = () => {

    // const individualResult = async () => {
    // const response = await fetch('/api/custom-query', {
    //     method: 'POST',
    //     headers: { 'Content-Type': 'application/json' },
    //     body: JSON.stringify({
    //         query: queries[0],
    //         values: []
    //     })
    // });
    // }




    return (
        <>
            <main className="w-full flex items-center min-h-screen flex-col pt-24">
                <CustomResult />
            </main>
        </>
    )
}
export default FAQsPage
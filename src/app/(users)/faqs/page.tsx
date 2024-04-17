import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/components/ui/accordion"


const FAQsPage = () => {
    return (
        <>
            <main className="w-full flex items-center min-h-screen flex-col pt-24">
                <Accordion type="single" collapsible className="w-[50%]" >
                    <AccordionItem value="item-1">
                        <AccordionTrigger className="w-full text-base p-3 py-5">Is it accessible?</AccordionTrigger>
                        <AccordionContent className="px-5">
                            Yes. It adheres to the WAI-ARIA design pattern.
                        </AccordionContent>
                    </AccordionItem>
                    <AccordionItem value="item-2">
                        <AccordionTrigger className="w-full text-base p-3 py-5">Is it accessible?</AccordionTrigger>
                        <AccordionContent className="px-5">
                            Yes. It adheres to the WAI-ARIA design pattern.
                        </AccordionContent>
                    </AccordionItem>
                    <AccordionItem value="item-3">
                        <AccordionTrigger className="w-full text-base p-3 py-5">Is it accessible?</AccordionTrigger>
                        <AccordionContent className="px-5">
                            Yes. It adheres to the WAI-ARIA design pattern.
                        </AccordionContent>
                    </AccordionItem>
                    <AccordionItem value="item-4">
                        <AccordionTrigger className="w-full text-base p-3 py-5">Is it accessible?</AccordionTrigger>
                        <AccordionContent className="px-5">
                            Yes. It adheres to the WAI-ARIA design pattern.
                        </AccordionContent>
                    </AccordionItem>
                </Accordion>

            </main>
        </>
    )
}
export default FAQsPage
'use client'

import Table from "@/components/Table";
import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/20/solid";
import { DateTime } from "luxon";
import { useEffect, useState } from "react";

const headers = [
    "Wie?",
    "Maandag",
    "Dinsdag",
    "Woensdag",
    "Donderdag",
    "Vrijdag",
]

const data = [
    ["Rick", true, false, true, false, false],
    ["Tsun", true, false, false, true, false],
    ["Craig", true, false, false, false, true],
    ["Wilma", true, false, true, false, false],
    ["Wilbert", true, false, false, true, false],
    ["Robin", true, false, false, false, true],
    ["Marlyn", true, false, true, false, false],
    ["Renate", true, false, false, true, false],
    ["Lotte", true, false, false, false, true],
    ["Shamier", true, false, true, false, false],
    ["Daniëlle", true, false, false, true, false],
    ["Tjitte", true, false, false, false, true],
    ["Carolien", true, false, false, false, true],
    ["Miel", true, false, false, false, true],
    ["Jeff", true, false, false, false, true],
]

const currentMonday = DateTime.now().minus({ days: DateTime.now().weekday - 1 })
const currentFriday = currentMonday.plus({ days: 4 })

export default function Aanwezigheid() {
    const [weekOffset, setWeekOffset] = useState(0)
    const [viewMonday, setViewMonday] = useState(currentMonday)
    const [viewFriday, setViewFirday] = useState(currentFriday)


    useEffect(() => {
        setViewMonday(currentMonday.plus({ days: 7 * weekOffset }))
        setViewFirday(currentFriday.plus({ days: 7 * weekOffset }))
    }, [weekOffset])


    return (
        <>
            <div className="space-y-2">
                <p>Geeft hier je aanwezigheid voor komende week op kantoor door.</p>
                <div className="flex justify-between items-center max-w-3xl">
                    <div className="flex space-x-4 items-center justify-center w-full">
                        <button className="border bg-primary px-4 py-0 rounded-lg text-light hover:underline" onClick={() => (setWeekOffset(weekOffset - 1))}>
                            <ChevronLeftIcon className="w-6" />
                        </button>
                        <p>{`Week ${viewMonday.toFormat('dd-MMM')} - ${viewFriday.toFormat('dd-MMM')}  :`}</p>
                        <button className="border bg-primary px-4 py-0 rounded-lg text-light hover:underline" onClick={() => (setWeekOffset(weekOffset + 1))}>
                            <ChevronRightIcon className="w-6" />
                        </button>
                    </div>
                </div>
            </div>
            <div className=" w-full max-w-3xl overflow-x-auto space-y-2">
                <Table name={"table"} headers={headers} data={data} />
            </div>
        </>
    );
}
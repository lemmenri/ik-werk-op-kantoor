'use client'

import Aanwezigheid from "@/components/Aanwezigheid";
import Edit from "@/components/Edit";
import { DateTime } from "luxon";
import { useEffect, useState } from "react";

export default function AanwezigheidPage() {
    const currentMonday = DateTime.now().minus({ days: DateTime.now().weekday - 1 })

    const [weekOffset, setWeekOffset] = useState(0)
    const [selectedMonday, setSelectedMonday] = useState(currentMonday)
    const [editedDays, setEditedDays] = useState<boolean[]>([false, false, false, false, false])

    useEffect(() => {
        setSelectedMonday(currentMonday.plus({ days: 7 * weekOffset }))
    }, [weekOffset])

    const offset = (offsetBy: number) => {
        setWeekOffset(weekOffset + offsetBy)
    }

    return (
        <main id="body" className="flex flex-col py-8 px-4 sm:px-8 w-full space-y-2 grow items-center">
            <Edit selectedMonday={selectedMonday} setEditedDays={setEditedDays} />
            <Aanwezigheid selectedMonday={selectedMonday} offset={offset} editedDays={editedDays} />
        </main>
    );
}
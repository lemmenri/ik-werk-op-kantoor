'use client'

import Table from "@/components/Table";
import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/20/solid";
import { DateTime } from "luxon";
import { createClient } from '@/utils/supabase/client'
import { useEffect, useState } from "react";

const headers = [
    "Wie?",
    "Maandag",
    "Dinsdag",
    "Woensdag",
    "Donderdag",
    "Vrijdag",
]

export type AanwezigheidData = ([string, boolean, boolean, boolean, boolean, boolean])[]
type RawAanwezigheidData = { is_present: boolean, user: { user_name: string }, work_day: string }[]
type CleanedAanwezigheidData = { username: string, workday: string, isPresent: boolean }[]
type Usernames = { user_name: string }[]

const currentMonday = DateTime.now().minus({ days: DateTime.now().weekday - 1 })
const currentFriday = currentMonday.plus({ days: 4 })

export default function Aanwezigheid() {
    const [weekOffset, setWeekOffset] = useState(0)
    const [viewMonday, setViewMonday] = useState(currentMonday)
    const [viewFriday, setViewFirday] = useState(currentFriday)
    const [aanwezigheid, setAanwezigheid] = useState<AanwezigheidData>([])
    const supabase = createClient()


    useEffect(() => {
        setViewMonday(currentMonday.plus({ days: 7 * weekOffset }))
        setViewFirday(currentFriday.plus({ days: 7 * weekOffset }))
        getTableData()
    }, [weekOffset])

    useEffect(() => {
        getTableData()
    }, [])


    const getAanwezigheid = async () => {
        const { data } = await supabase.from('aanwezigheid')
            .select('is_present, work_day, user(user_name)')
            .gte('work_day', viewMonday.toISODate()) // filter to get only dates in current selected week
            .lte('work_day', viewFriday.toISODate())
            .returns<RawAanwezigheidData>()
        const aanwezigheid: CleanedAanwezigheidData = []
        if (data !== null) {
            data.map((entry) => (
                aanwezigheid.push({
                    username: entry.user.user_name,
                    workday: entry.work_day,
                    isPresent: entry.is_present
                })
            ))
        }
        return aanwezigheid
    }

    const getUsernames = async () => {
        const { data } = await supabase.from('usernames').select('user_name')
        if (data === null) {
            return []
        }
        return data
    }

    function isPresent(data: CleanedAanwezigheidData, day: string, user: string): boolean {
        const isPresent = data.find((element) => (element.username === user && element.workday === day))?.isPresent
        return isPresent ? isPresent : false
    }

    const getTableData = async () => {
        const usernames: Usernames = await getUsernames()
        const aanwezigheidData: CleanedAanwezigheidData = await getAanwezigheid()
        const tableData: AanwezigheidData = []
        if (usernames !== null) {
            usernames.map((user) => {
                const monday = isPresent(aanwezigheidData, viewMonday.toISODate(), user.user_name)
                const tuesday = isPresent(aanwezigheidData, viewMonday.plus({ day: 1 }).toISODate(), user.user_name)
                const wednesday = isPresent(aanwezigheidData, viewMonday.plus({ day: 2 }).toISODate(), user.user_name)
                const thursday = isPresent(aanwezigheidData, viewMonday.plus({ day: 3 }).toISODate(), user.user_name)
                const friday = isPresent(aanwezigheidData, viewMonday.plus({ day: 4 }).toISODate(), user.user_name)
                tableData.push([user.user_name, monday, tuesday, wednesday, thursday, friday])
            })
        }
        setAanwezigheid(tableData)
    }

    return (
        <>
            <div className="space-y-2">
                <p>Geeft hier je aanwezigheid voor komende week op kantoor door.</p>
                <button className="border bg-primary px-4 py-0 rounded-lg text-light hover:underline" onClick={() => (getAanwezigheid())}>Get week data</button>
                <button className="border bg-primary px-4 py-0 rounded-lg text-light hover:underline" onClick={() => (getUsernames())}>Get usernames</button>
                <button className="border bg-primary px-4 py-0 rounded-lg text-light hover:underline" onClick={() => (getTableData())}>Get table data</button>
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
                <Table name={"table"} headers={headers} data={aanwezigheid} />
            </div>
        </>
    );
}
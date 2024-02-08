'use client'

import Table from "@/components/Table";
import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/20/solid";
import { DateTime } from "luxon";
import { createClient } from '@/utils/supabase/client'
import { useEffect, useState } from "react";

const tableHeaders = [
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


export default function Aanwezigheid({ selectedMonday, offset, editedDays }: { selectedMonday: DateTime, offset: any, editedDays: boolean[] }) {
    const [aanwezigheid, setAanwezigheid] = useState<AanwezigheidData>([])
    const [usernames, setUsernames] = useState<Usernames>([])
    const supabase = createClient()

    useEffect(() => {
        getTableData()
    }, [selectedMonday, usernames, editedDays])

    useEffect(() => {
        getTableData()
        getUsernames()
    }, [])

    const getUsernames = async () => {
        const { data } = await supabase
            .from('usernames')
            .select('user_name')
            .order('user_name')
        if (data === null) {
            return []
        }
        setUsernames(data)
    }

    const getAanwezigheid = async () => {
        const { data } = await supabase.from('aanwezigheid')
            .select('is_present, work_day, user(user_name)')
            .gte('work_day', selectedMonday.toISODate()) // filter to get only dates in current selected week
            .lte('work_day', selectedMonday.plus({ days: 4 }).toISODate())
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

    function isPresent(data: CleanedAanwezigheidData, day: string | null, user: string): boolean {
        const isPresent = data.find((element) => (element.username === user && element.workday === day))?.isPresent
        return isPresent ? isPresent : false
    }

    const getTableData = async () => {
        const aanwezigheidData: CleanedAanwezigheidData = await getAanwezigheid()
        const tableData: AanwezigheidData = []
        if (usernames !== null) {
            usernames.map((user) => {
                const monday = isPresent(aanwezigheidData, selectedMonday.toISODate(), user.user_name)
                const tuesday = isPresent(aanwezigheidData, selectedMonday.plus({ day: 1 }).toISODate(), user.user_name)
                const wednesday = isPresent(aanwezigheidData, selectedMonday.plus({ day: 2 }).toISODate(), user.user_name)
                const thursday = isPresent(aanwezigheidData, selectedMonday.plus({ day: 3 }).toISODate(), user.user_name)
                const friday = isPresent(aanwezigheidData, selectedMonday.plus({ day: 4 }).toISODate(), user.user_name)
                tableData.push([user.user_name, monday, tuesday, wednesday, thursday, friday])
            })
        }
        setAanwezigheid(tableData)
    }

    return (
        <>
            <div id="aanwezigheid" className="space-y-2">
                <p>De rest komt deze dagen op kantoor:</p>
                <div className="flex justify-between items-center max-w-3xl">
                    <div className="flex space-x-4 items-center justify-center w-full">
                        <button className="border bg-primary px-4 py-0 rounded-lg text-light hover:underline" onClick={() => (offset(-1))}>
                            <ChevronLeftIcon className="w-6" />
                        </button>
                        <p>{`Week ${selectedMonday.toFormat('dd-MMM')} - ${selectedMonday.plus({ days: 4 }).toFormat('dd-MMM')}  :`}</p>
                        <button className="border bg-primary px-4 py-0 rounded-lg text-light hover:underline" onClick={() => (offset(1))}>
                            <ChevronRightIcon className="w-6" />
                        </button>
                    </div>
                </div>
            </div>
            <div className=" w-full max-w-3xl overflow-x-auto space-y-2">
                <Table name={"aanwezigheid-table"} headers={tableHeaders} data={aanwezigheid} editable={false} />
            </div>
        </>
    );
}
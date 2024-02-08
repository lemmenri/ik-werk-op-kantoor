'use client'

import Table from "@/components/Table";
import { useEffect, useState } from "react";
import { createClient } from "@/utils/supabase/client";
import { DateTime } from "luxon";

const tableHeaders = [
    "Jij!",
    "Maandag",
    "Dinsdag",
    "Woensdag",
    "Donderdag",
    "Vrijdag",
]

type NewData = [
    string, boolean, boolean, boolean, boolean, boolean
]

export default function Edit({ selectedMonday, setEditedDays }: { selectedMonday: DateTime, setEditedDays: any }) {
    const [aanwezig, setAanwezig] = useState<NewData>(["", false, false, false, false, false])
    const [userId, setUserId] = useState("")
    const supabase = createClient()

    useEffect(() => {
        getCurrentActiveUsername()
    }, [])

    const getCurrentActiveUsername = async () => {
        const user = await supabase.auth.getUser();
        const { data } = await supabase.from('usernames').select('user_name, id').eq('user_id', user.data.user?.id)

        if (data !== null) {
            setAanwezig([data[0].user_name, false, false, false, false, false])
            setUserId(data[0].id)
        }
    }

    type RawAanwezigheidData = { id: string, work_day: string }[]

    const getExistingIds = async (): Promise<RawAanwezigheidData> => {
        const { data } = await supabase.from('aanwezigheid')
            .select('id, work_day')
            .gte('work_day', selectedMonday.toISODate()) // filter to get only dates in current selected week
            .lte('work_day', selectedMonday.plus({ days: 4 }).toISODate())
            .eq('user', userId)
            .returns<RawAanwezigheidData>()

        if (data !== null) {
            return data
        }
        return []
    }

    const updateAanwezigheid = (newAanwezigheid: [boolean, boolean, boolean, boolean, boolean]) => {
        const newData: NewData = [aanwezig[0], ...newAanwezigheid]
        setAanwezig(newData)
    }

    const saveAanwezigheid = async () => {
        const ids: RawAanwezigheidData = await getExistingIds()
        const monday = selectedMonday.toISODate()
        const tuesday = selectedMonday.plus({ days: 1 }).toISODate()
        const wednesday = selectedMonday.plus({ days: 2 }).toISODate()
        const thursday = selectedMonday.plus({ days: 3 }).toISODate()
        const friday = selectedMonday.plus({ days: 4 }).toISODate()

        const mondayId = ids.find((day) => (day.work_day === monday))?.id
        const tuesdayId = ids.find((day) => (day.work_day === tuesday))?.id
        const wednsedayId = ids.find((day) => (day.work_day === wednesday))?.id
        const thursdayId = ids.find((day) => (day.work_day === thursday))?.id
        const fridayId = ids.find((day) => (day.work_day === friday))?.id

        const newData = [
            { ...(mondayId && { id: mondayId }), work_day: monday, is_present: aanwezig[1], user: userId },
            { ...(tuesdayId && { id: tuesdayId }), work_day: tuesday, is_present: aanwezig[2], user: userId },
            { ...(wednsedayId && { id: wednsedayId }), work_day: wednesday, is_present: aanwezig[3], user: userId },
            { ...(thursdayId && { id: thursdayId }), work_day: thursday, is_present: aanwezig[4], user: userId },
            { ...(fridayId && { id: fridayId }), work_day: friday, is_present: aanwezig[5], user: userId },
        ]

        const { data, error } = await supabase
            .from('aanwezigheid')
            .upsert(newData, { defaultToNull: false })
            .select()
            .order('work_day')
        if (error) {
            console.log("Something went wrong")
        }
        if (data !== null) {
            const newValues: boolean[] = []
            data.map((entry) => (newValues.push(entry.is_present)))
            setEditedDays(newValues)
        }
    }

    return (
        <>
            <div id="edit" className="w-full max-w-3xl space-y-2">
                <p>Vul hier je aanwezigheid voor deze week in:</p>
                <div className="overflow-x-auto">
                    <Table
                        name={"edit-table"}
                        headers={tableHeaders}
                        data={[[...aanwezig]]}
                        editable={true}
                        updateAanwezigheid={updateAanwezigheid}
                    />
                </div>
                <div className="w-full flex justify-end">
                    <button
                        className="border bg-primary px-4 py-0 rounded-lg text-light hover:underline"
                        onClick={() => (saveAanwezigheid())}
                    >
                        Save
                    </button>
                </div>
            </div>
        </>
    );
}
import { useState } from "react";
import { AanwezigheidData } from "./Aanwezigheid";
import Toggle from "./Toggle";

export default function Table({ headers, data, name, editable, updateAanwezigheid }: { headers: string[], data: AanwezigheidData, name: string, editable: boolean, updateAanwezigheid?: any }) {
    const [currentToggleState, setCurrentToggleState] = useState([false, false, false, false, false])

    const printState = (index: number, state: boolean) => {
        const newToggleState = [...currentToggleState]
        newToggleState[index - 1] = state
        setCurrentToggleState(newToggleState)
        updateAanwezigheid(newToggleState)
    }

    return (
        <>
            {data.length === 0
                ? <p>Loading...</p>
                :
                <table key={name} id={name} className="table-auto border border-dark bg-primary text-white py-1 px-2 w-full">
                    <thead>
                        <tr>
                            {headers.map((column, index) => (
                                <th id={`header-${column}`} key={index} className={`border border-primary font-normal text-left px-2 ${index !== 0 ? "text-center" : "w-1/6 sticky left-0 bg-primary"}`}>
                                    {column}
                                </th>
                            ))}
                        </tr>
                    </thead>
                    <tbody className="bg-light text-dark dark:bg-dark dark:text-light">
                        {data.map((row, index) => (
                            <tr key={`row-${index}`} id={`row-${index}`}>
                                {row.map((column, colIndex) => (
                                    <td
                                        id={`${index}-${colIndex}`}
                                        key={`${index}-${colIndex}`}
                                        className={`border border-y-1 border-x-0 dark:border-light border-primary my-1 mx-2 ${colIndex !== 0 ? "text-center" : "sticky left-0 bg-light dark:bg-dark z-10"}`}
                                    >
                                        <div className={`${colIndex !== 0 ? "" : "px-2 border border-y-0 border-r-1 border-l-0 dark:border-l-2 border-primary dark:border-light"}`}>
                                            {colIndex === 0 && column}
                                            {colIndex !== 0 && editable === false && (column === true ? "✅" : (column === false ? "❌" : "❔"))}
                                            {colIndex !== 0 && editable === true && <Toggle name={`toggle-${index}-${colIndex}`} onToggle={printState} index={colIndex} checked={typeof (column) === 'boolean' ? column : false} disabled={false} />}
                                        </div>
                                    </td>
                                ))}
                            </tr>
                        ))}
                    </tbody>
                </table>
            }
        </>
    );
}

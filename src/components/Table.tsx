import { AanwezigheidData } from "./Aanwezigheid";

export default function Table({ headers, data, name }: { headers: string[], data: AanwezigheidData, name: string }) {

    return (
        <>
            {data.length === 0
                ? <p>Loading...</p>
                :
                <table key={name} id={name} className="table-auto border-collapse border border-dark bg-primary text-white py-1 px-2 w-full">
                    <thead>
                        <tr>
                            {headers.map((column, index) => (
                                <th id={`header-${column}`} key={index} className={`border border-primary font-normal text-left px-2 ${index !== 0 && "text-center"}`}>
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
                                        className={`border border-x-0 border-primary dark:border-light py-1 px-2 ${colIndex !== 0 && "text-center"}`}
                                    >
                                        {colIndex === 0 && column}
                                        {colIndex !== 0 && (column === true ? "✅" : "❌")}
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

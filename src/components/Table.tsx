import Toggle from "./Toggle";

export default function Table({ headers, data, name }: { headers: string[], data: (string | boolean)[][], name: string }) {

    return (
        <table key={name} id={name} className="table-auto border-collapse border border-dark bg-primary text-white py-1 px-2 w-full">
            <thead>
                <tr>
                    {headers.map((column, index) => (
                        <th id={`header-${column}`} key={index} className="border border-primary font-normal text-left px-2">
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
                                className="border border-x-0 border-primary dark:border-light py-1 px-2"
                            >
                                {colIndex === 0 && column}
                                {colIndex !== 0 && <Toggle name={`toggle-${index}-${colIndex}`} onToggle={() => ("")} checked={typeof (column) === 'boolean' ? column : false} disabled={true} />}
                            </td>
                        ))}
                    </tr>
                ))}
            </tbody>
        </table>
    );
}

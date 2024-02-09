import { useState } from 'react'
import { Switch } from '@headlessui/react'

export default function Toggle({ name, label, onToggle, index, checked = false, disabled = false }: { name: string, label?: string, onToggle: any, index: number, checked?: boolean, disabled?: boolean }) {
    const [enabled, setEnabled] = useState(checked)

    const handleChange = () => {
        const newState = !enabled
        if (disabled === false) {
            setEnabled(newState);
            onToggle(index, newState);
        }
    }

    return (
        <Switch
            id={name}
            checked={enabled}
            onChange={handleChange}
            className={`${enabled ? 'bg-green-600' : 'bg-light dark:bg-primary'
                } ${disabled && "hover:cursor-default"} relative inline-flex h-4 w-9 items-center rounded-full border border-dark dark:border-light`}
        >
            <span className="sr-only">{`Toggle ${name}`}</span>
            <span
                className={
                    `${enabled ? 'translate-x-5' : '-translate-x-0.5'
                    } inline-block h-4 w-4 transform rounded-full bg-light dark:bg-dark transition border border-dark dark:border-light`}
            />
        </Switch>
    )
}
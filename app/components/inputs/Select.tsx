'use client'

import ReactSelect from "react-select"

interface SelectProps {
    label: string,
    value: Record<string, any>,
    onChange: (value: Record<string, any>) => void,
    options: Record<string, any>[],
    disabled?: boolean
}

const Select: React.FC<SelectProps> = ({ label, value, onChange, options, disabled }) => {
    return (
        <div className="z-[100]">
            <label className="block text-xs font-medium leading-6 text-neutral-900">
                {label}
            </label>
            <div className="mt-2">
                <ReactSelect 
                    isDisabled={disabled}
                    value={value}
                    onChange={onChange}
                    options={options}
                    menuPortalTarget={document.body}
                    isMulti
                    styles={{
                        menuPortal: (base) => ({
                            ...base,
                            zIndex: 9999
                        }),
                        multiValue: (styles) => ({
                            ...styles,
                            backgroundColor: "rgb(224, 242, 254)",
                            color: "rgb(7, 89, 133)"
                        }),
                        multiValueLabel: (styles) => ({
                            ...styles,
                            color: "rgb(7, 89, 133)",
                            padding: "2px 4px 2px 4px",
                            fontWeight: 600,
                        }),
                        multiValueRemove: (styles) => ({
                            ...styles,
                            ':hover': {
                                backgroundColor: "rgb(7, 89, 133)",
                                color: "rgb(224, 242, 254)"
                            }
                        })
                    }}
                    classNames={{
                        control: () => "text-sm",
                    }}
                />
            </div>
        </div>
    )
}

export default Select
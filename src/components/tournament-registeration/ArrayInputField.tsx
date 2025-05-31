import React from "react";
import { Input } from "@/components/ui/input";

const ArrayInputField = ({
    label,
    values,
    onChange,
    placeholder = "Add item and press Enter",
    error,
}: {
    label: string;
    values: string[];
    onChange: (values: string[]) => void;
    placeholder?: string;
    error?: string;
}) => {
    const [inputValue, setInputValue] = React.useState("");

    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === "Enter" && inputValue.trim() !== "") {
            e.preventDefault();
            onChange([...values, inputValue.trim()]);
            setInputValue("");
        }
    };

    const removeItem = (index: number) => {
        const newValues = [...values];
        newValues.splice(index, 1);
        onChange(newValues);
    };

    return (
        <div className="space-y-2">
            <div className="flex flex-col">
                <label className="text-sm font-medium">{label}</label>
                <Input
                    type="text"
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                    onKeyDown={handleKeyDown}
                    placeholder={placeholder}
                    className="mt-1"
                />
                {error && <p className="text-sm text-destructive mt-1">{error}</p>}
            </div>

            {values.length > 0 && (
                <div className="flex flex-wrap gap-2 mt-2">
                    {values.map((item, index) => (
                        <div
                            key={index}
                            className="flex items-center gap-1 rounded-full bg-secondary px-3 py-1 text-xs"
                        >
                            <span>{item}</span>
                            <button
                                type="button"
                                onClick={() => removeItem(index)}
                                className="ml-1 rounded-full hover:bg-secondary-foreground/20 h-4 w-4 inline-flex items-center justify-center"
                            >
                                ×
                            </button>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default ArrayInputField;
/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState, useMemo } from 'react';
import { Autocomplete, TextField } from '@mui/material';

interface GhostPreviewAutocompleteProps {
    label: string;
    suggestions: string[];
    formValue: string;
    setFormValue: (arg: string) => void;
    autoFillOutForm: (arg: string) => void;
}

const AutoCompleteTextField: React.FC<GhostPreviewAutocompleteProps> = ({
    label,
    suggestions,
    formValue,
    setFormValue,
    autoFillOutForm
}) => {
    // The value in the input field
    const [inputValue, setInputValue] = useState('');
    // Control the open/closed state of the dropdown
    const [open, setOpen] = useState(false);
    // Track if the text field is currently focused
    const [isFocused, setIsFocused] = useState(false);

    // Filter the list of suggestions based on the user's input
    const filteredSuggestions = useMemo(() => {
        return suggestions.filter((option) =>
            option.toLowerCase().includes(inputValue.toLowerCase())
        );
    }, [inputValue, suggestions]);

    // The first suggestion (or empty if none exist)
    const firstSuggestion =
        filteredSuggestions.length > 0 ? filteredSuggestions[0] : '';

    // The portion of text that goes beyond what the user has typed
    const ghostText = useMemo(() => {
        if (
            firstSuggestion.toLowerCase().startsWith(inputValue.toLowerCase()) &&
            inputValue.length < firstSuggestion.length
        ) {
            return firstSuggestion.slice(inputValue.length);
        }
        return '';
    }, [firstSuggestion, inputValue]);

    // Handle Tab key to complete the ghost text
    const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
        if (event.key === 'Tab') {
            // If there's ghost text, fill it in first
            if (ghostText) {
                event.preventDefault(); // stay focused on the input
                const completedText = inputValue + ghostText;
                setInputValue(completedText);
                setFormValue(completedText);
            }
            // Close the dropdown on Tab
            setOpen(false);
        }
    };

    return (
        <Autocomplete
            freeSolo
            open={open}
            onOpen={() => {
                // Only open if the input is non-empty and focused
                if (inputValue.length > 0 && isFocused) {
                    setOpen(true);
                }
            }}
            onClose={() => {
                setOpen(false);
            }}
            value={formValue}
            onChange={(_, newValue) => {
                if (typeof newValue === 'string') {
                    setFormValue(newValue);
                    setInputValue(newValue);
                }
            }}
            inputValue={inputValue}
            onInputChange={(_, newInputValue) => {
                setInputValue(newInputValue);
                setFormValue(newInputValue)
                // Re-open if there’s text and the field is still focused
                if (newInputValue.length > 0 && isFocused) {
                    setOpen(true);
                } else {
                    setOpen(false);
                }
            }}
            // Hide dropdown if there's no input text
            options={inputValue.length === 0 ? [] : filteredSuggestions}
            renderOption={(props, option) => (
                <li
                    {...props}
                    onClick={(event: any) => {
                        autoFillOutForm(event.target.textContent);
                        if (props.onClick) {
                            props.onClick(event);
                        }
                    }}
                >
                    {option}
                </li>
            )}
            renderInput={(params) => (
                <TextField
                    {...params}
                    label={label}
                    variant="outlined"
                    fullWidth
                    InputLabelProps={{ shrink: true }}
                    onKeyDown={handleKeyDown}
                    // Track focus/blur
                    onFocus={() => {
                        setIsFocused(true);
                        // If inputValue not empty, open the dropdown
                        if (inputValue.length > 0) {
                            setOpen(true);
                        }
                    }}
                    onBlur={() => {
                        setIsFocused(false);
                    }}
                    InputProps={{
                        ...params.InputProps,
                        style: { position: 'relative' },
                        endAdornment: (
                            <>
                                {params.InputProps.endAdornment}
                                <div
                                    style={{
                                        position: 'absolute',
                                        textAlign: 'left',
                                        top: 0,
                                        left: 0,
                                        pointerEvents: 'none',
                                        padding: '16.5px 14px',
                                        fontFamily: 'Roboto, sans-serif',
                                        fontSize: '1rem',
                                        lineHeight: '1.4375em',
                                        color: 'rgba(0,0,0,0.3)',
                                        width: '100%',
                                        overflow: 'hidden',
                                        whiteSpace: 'pre'
                                    }}
                                >
                                    <span style={{ color: 'transparent' }}>
                                        {inputValue}
                                    </span>
                                    {inputValue === '' || inputValue === null
                                        ? `Enter Your ${label}`
                                        : <span>{ghostText}</span>
                                    }
                                </div>
                            </>
                        )
                    }}
                />
            )}
        />
    );
};

export default AutoCompleteTextField;


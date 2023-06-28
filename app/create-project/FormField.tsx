import React, {FC} from 'react';

interface Props {
    title: string,
    placeholder: string,
    state: string,
    setState: (value: string) => void,
    type?: string,
    isTextArea?: boolean
}
const FormField: FC<Props> = ({setState, state, isTextArea, placeholder, type, title}) => {
    return (
        <div className="flexStart flex-col w-full gap-4">
            <label className="w-full text-gray-100">{title}</label>

            {isTextArea ? (
                <textarea
                    placeholder={placeholder}
                    value={state}
                    className="form_field-input"
                    onChange={(e) => setState(e.target.value)}
                />
            ) : (
                <input
                    type={type || "text"}
                    placeholder={placeholder}
                    required
                    value={state}
                    className="form_field-input"
                    onChange={(e) => setState(e.target.value)}
                />
            )}
        </div>
    );
};

export default FormField;
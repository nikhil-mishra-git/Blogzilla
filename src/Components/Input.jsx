import React, { forwardRef, useId } from 'react';

const Input = forwardRef(
    (
        {
            icon: Icon,
            type = 'text',
            name,
            placeholder,
            value,
            onChange,
            rightIcon: RightIcon,
            onRightIconClick,
            id,
            ...props
        },
        ref
    ) => {
        const autoId = useId();
        const inputId = id || autoId;

        return (
            <div className="relative">
                {Icon && <Icon className="absolute top-4 left-4 text-gray-400" />}
                <input
                    id={inputId}
                    ref={ref}
                    type={type}
                    name={name}
                    placeholder={placeholder}
                    value={value}
                    onChange={onChange}
                    className={`w-full py-3 pl-10 pr-${RightIcon ? '10' : '4'} rounded-full bg-gray-100 focus:outline-none focus:ring-2 focus:ring-black`}
                    required
                    {...props}
                />
                {RightIcon && (
                    <button
                        type="button"
                        onClick={onRightIconClick}
                        className="absolute top-4 right-4 text-gray-500"
                        aria-label="Toggle password visibility"
                    >
                        <RightIcon />
                    </button>
                )}
            </div>
        );
    }
);

export default Input;

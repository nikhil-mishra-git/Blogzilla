import React from 'react'

const Container = ({ children }) => {
    return (
        <div className="w-full max-w-[1400px] mx-auto px-3">
            {children}
        </div>
    )
}

export default Container

import React from 'react'

export const Loading = () => {


    return (
        <>
            <div className='terminal'>
                <div className="terminal-loader">
                    <div className="terminal-header">
                        <div className="terminal-title">Status</div>
                        <div className="terminal-controls">
                            <div className="control close"></div>
                            <div className="control minimize"></div>
                            <div className="control maximize"></div>
                        </div>
                    </div>
                    <div className="text">Loading...</div>
                </div>
            </div>
        </>
    )
}

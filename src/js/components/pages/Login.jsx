import React, { useState, useEffect, useRef } from 'react'

export default function Login() {

    const [error, setError] = useState(null)

    const input = useRef(null)

    useEffect(() => {
        console.log(input)
        input.current.focus()
    })

    const handleSubmit = (e) => {
        e.preventDefault()
        fetch("/login", {
            method: 'POST',
            body: JSON.stringify({ password: e.target.password.value }),
            headers: {
                'Content-Type': 'application/json'
                // 'Content-Type': 'application/x-www-form-urlencoded',
            },

        }).then(resp => {
            if (resp.ok) {
                location.reload()
            } else {
                setError("Error")
            }
        })
    }
    return <>
        <form onSubmit={handleSubmit}>
            <input ref={input} name={'password'} type={'password'}></input>
        </form>
        {error && <div>{error}</div>}
    </>
}
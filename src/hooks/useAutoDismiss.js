import { useEffect, useState } from "react"

function useAutoDismiss(initialValue) {

    const [value, setValue] = useState(initialValue)

    useEffect(() => {
        if (!value) {
            return
        }

        const timer = setTimeout(() => {
            setValue('')
        }, 3000);

        return () => clearTimeout(timer)
    }, [value])

    return [value, setValue]
}

export default useAutoDismiss
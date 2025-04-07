import { useEffect, useState } from "react";

function useDebounce(value: any, delay = 300) {
    const [debouncedValue, setDebouncedValue] = useState(value)

    useEffect(() => {
        const handler = setTimeout(() => {
            setDebouncedValue(value)
        }, delay)
        // 因为useEffect的清理函数会在组件卸载时执行，所以我们可以在这里清除定时器，确保在每次渲染时都能清除上一个定时器，达到防抖的效果
        // 这样就不会在组件卸载后还继续执行setDebouncedValue了
        // 也不会在组件更新时还继续执行setDebouncedValue了
        return () => {
            clearTimeout(handler)
        }
    }, [value, delay])

    return [debouncedValue] as const
}
export default useDebounce
import { useEffect, useState } from "react";

function useElementBounding<T extends HTMLElement>(ref: React.RefObject<T>) {
    const [elementBounding, setElementBounding] = useState<DOMRect | null>(null);
    useEffect(() => {
        if (ref.current) {
            const bounding = ref.current.getBoundingClientRect();
            setElementBounding(bounding);
        } else {
            setElementBounding(null);
        }
        // 监听resize事件，更新元素的位置信息
        const handleResize = () => {
            if (ref.current) {
                const bounding = ref.current.getBoundingClientRect();
                setElementBounding(bounding);
            }
        };
        window.addEventListener("resize", handleResize);
        return () => {
            window.removeEventListener("resize", handleResize);
        }
    }, [ref])

    return [elementBounding] as const
}

export default useElementBounding
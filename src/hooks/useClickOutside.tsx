
import { RefObject, useEffect } from "react";

function useClickOutside(ref: RefObject<HTMLElement>, handler: (event: MouseEvent) => void) {
    useEffect(() => {
        const listener = (event: MouseEvent) => {
            // Do nothing if clicking ref's element or descendent elements
            if (!ref.current || ref.current.contains(event.target as HTMLElement)) {
                return;
            }
            handler(event);
        }
        document.addEventListener("click", listener);

        return () => {
            document.removeEventListener("click", listener);
        }
    }, [ref, handler]);

}

export default useClickOutside
// 这个hook的作用是监听点击事件，当点击的元素不在ref.current所指向的元素内时，执行handler函数
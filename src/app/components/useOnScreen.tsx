import { useEffect, useState } from 'react';

function useOnScreen(ref: React.RefObject<Element>, rootMargin = '0px') {
    const [isIntersecting, setIntersecting] = useState(false);

    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                // Ensure we have at least one entry
                const firstEntry = entries[0];
                if (firstEntry) {
                    setIntersecting(firstEntry.isIntersecting);
                }
            },
            {
                rootMargin,
            }
        );

        if (ref.current) {
            observer.observe(ref.current);
        }

        return () => {
            if (ref.current) {
                observer.unobserve(ref.current);
            }
        };
    }, [ref, rootMargin]);

    return isIntersecting;
}

export default useOnScreen;
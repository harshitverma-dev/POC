import { useEffect, useRef, useCallback, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { ProductContextData } from "../context/ContextData";

const AutoLogout: React.FC = () => {
    const context = useContext(ProductContextData);
        if (!context) {
            throw new Error('it should not be null');
        }
        const { setLoginUserDetail, setStoreAllUpcomingEvents } = context;
    const navigate = useNavigate();
    const timeoutRef = useRef<number | null>(null);
    const LOGOUT_TIME = 30 * 60 * 1000;

    const resetTimer = useCallback(() => {
        if (timeoutRef.current) clearTimeout(timeoutRef.current);

        timeoutRef.current = window.setTimeout(() => { 
            localStorage.clear();
            setLoginUserDetail(null)
            setStoreAllUpcomingEvents([])
            navigate("/");
        }, LOGOUT_TIME);
    }, [navigate]);

    useEffect(() => {
        resetTimer();
        const events = ["mousemove", "keydown", "click", "scroll"];
        events.forEach(event => window.addEventListener(event, resetTimer));

        return () => {
            if (timeoutRef.current) clearTimeout(timeoutRef.current);
            events.forEach(event => window.removeEventListener(event, resetTimer));
        };
    }, [resetTimer]);

    return null; 
};

export default AutoLogout;

import { createContext, useState, useContext } from "react";

const AppContext = createContext(null);

export const useAppContext = () => {
    const context = useContext(AppContext);

    if (context === undefined) {
        throw new Error('AppContext must be within AppContextProvider');
    }
    return context;
}

const AppContextProvider = ({ children }) => {
    const [favorite, setFavorite] = useState([]);

    const addToFavorites = (book) => {
        const newFavorites = [...favorite, book];
        setFavorite(newFavorites);
    };

    const removeFromFavorites = (id) => {
        const newFavorites = favorite.filter((book) => book.id !== id);
        setFavorite(newFavorites);
    };

    return (
        <AppContext.Provider value={{ favorite, addToFavorites, removeFromFavorites }}>
            {children}
        </AppContext.Provider>
    );
}

export default AppContextProvider;

import React, { createContext, useContext, useState, useEffect } from 'react';

const FavoriteContext = createContext();

export const useFavorite = () => {
    return useContext(FavoriteContext);
};

export const FavoriteProvider = ({ children }) => {
    const [favoriteCars, setFavoriteCars] = useState(() => {
        const savedFavorites = localStorage.getItem('favoriteCars');
        return savedFavorites ? JSON.parse(savedFavorites) : [];
    });

    useEffect(() => {
        localStorage.setItem('favoriteCars', JSON.stringify(favoriteCars));
    }, [favoriteCars]);

    const toggleFavorite = (car) => {
        setFavoriteCars(prev => {
            const isFavorite = prev.some(favCar => favCar.id === car.id);
            if (isFavorite) {
                return prev.filter(favCar => favCar.id !== car.id);
            } else {
                return [...prev, car];
            }
        });
    };

    const isFavorite = (carId) => {
        return favoriteCars.some(car => car.id === carId);
    };

    const value = {
        favoriteCars,
        toggleFavorite,
        isFavorite
    };

    return (
        <FavoriteContext.Provider value={value}>
            {children}
        </FavoriteContext.Provider>
    );
}; 
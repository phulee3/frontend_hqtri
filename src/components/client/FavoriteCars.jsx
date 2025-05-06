import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useFavorite } from '../../contexts/FavoriteContext';
import { FavoriteProvider } from '../../contexts/FavoriteContext';
import CarCard from './CarCard';
import './styles/FavoriteCars.css';

const FavoriteCarsContent = () => {
    const navigate = useNavigate();
    const { favoriteCars } = useFavorite();

    const handleViewDetails = (carId) => {
        navigate(`/client/car/${carId}`);
    };

    return (
        <div className="favorite-cars">
            <div className="favorite-header">
                <h1>Danh sách xe yêu thích</h1>
                <p className="favorite-count">
                    {favoriteCars.length} xe trong danh sách yêu thích
                </p>
            </div>

            {favoriteCars.length === 0 ? (
                <div className="no-favorites">
                    <svg xmlns="http://www.w3.org/2000/svg" width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="#23408e" strokeWidth="2">
                        <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path>
                    </svg>
                    <h2>Chưa có xe yêu thích</h2>
                    <p>Hãy thêm xe vào danh sách yêu thích để xem lại sau</p>
                    <button onClick={() => navigate('/client')} className="browse-cars">
                        Xem danh sách xe
                    </button>
                </div>
            ) : (
                <div className="favorite-grid">
                    {favoriteCars.map((car) => (
                        <CarCard
                            key={car.id}
                            car={car}
                            onViewDetails={() => handleViewDetails(car.id)}
                        />
                    ))}
                </div>
            )}
        </div>
    );
};

const FavoriteCars = () => {
    return (
        <FavoriteProvider>
            <FavoriteCarsContent />
        </FavoriteProvider>
    );
};

export default FavoriteCars; 
import React from 'react';
import { useFavorite } from '../../contexts/FavoriteContext';
import './styles/CarCard.css';

const CarCard = ({ car, onViewDetails }) => {
    const { toggleFavorite, isFavorite } = useFavorite();

    const formatPrice = (price) => {
        return new Intl.NumberFormat('vi-VN', {
            style: 'currency',
            currency: 'VND'
        }).format(price);
    };

    const handleFavoriteClick = (e) => {
        e.stopPropagation();
        toggleFavorite(car);
    };

    const handleAppointmentClick = (e) => {
        e.stopPropagation();
        // TODO: Implement appointment booking logic
        alert('Chức năng đặt lịch hẹn đang được phát triển');
    };

    return (
        <div className="car-card">
            <div className="car-image-container">
                <img src={car.image} alt={car.name} className="car-image" />
                <button
                    className={`favorite-button ${isFavorite(car.id) ? 'active' : ''}`}
                    onClick={handleFavoriteClick}
                >
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill={isFavorite(car.id) ? "#e74c3c" : "none"} stroke={isFavorite(car.id) ? "#e74c3c" : "#666"} strokeWidth="2">
                        <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path>
                    </svg>
                </button>
            </div>
            <div className="car-info">
                <h3>{car.name}</h3>
                <p className="price">{formatPrice(car.price)}</p>
                <div className="car-details">
                    <span className="brand">{car.brand}</span>
                    <span className="type">{car.type}</span>
                </div>
                <div className="features">
                    {car.features.slice(0, 3).map((feature, index) => (
                        <span key={index} className="feature-tag">
                            {feature}
                        </span>
                    ))}
                    {car.features.length > 3 && (
                        <span className="feature-tag">+{car.features.length - 3} more</span>
                    )}
                </div>
                <div className="button-group">
                    <button className="appointment-button" onClick={handleAppointmentClick}>
                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect>
                            <line x1="16" y1="2" x2="16" y2="6"></line>
                            <line x1="8" y1="2" x2="8" y2="6"></line>
                            <line x1="3" y1="10" x2="21" y2="10"></line>
                        </svg>
                        Đặt lịch hẹn
                    </button>
                    <button className="view-details" onClick={onViewDetails}>
                        Xem chi tiết
                    </button>
                </div>
            </div>
        </div>
    );
};

export default CarCard;
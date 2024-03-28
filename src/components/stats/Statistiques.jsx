"use client";

import React, { useState, useEffect } from 'react';
import { Bar } from 'react-chartjs-2';
import Chart from 'chart.js/auto';

const getWeekNumber = (date) => {
    // Get the day of the year for the provided date
    const startOfYear = new Date(date.getFullYear(), 0, 0);
    const diff = date - startOfYear;
    const oneDay = 1000 * 60 * 60 * 24;
    const dayOfYear = Math.floor(diff / oneDay);

    // Calculate the week number based on the day of the year
    const weekNumber = Math.ceil((dayOfYear + 1) / 7);
    return weekNumber;
};

const getMonday = (date) => {
    const dayOfWeek = date.getDay();
    const diff = date.getDate() - dayOfWeek + (dayOfWeek === 0 ? -6 : 1); // Adjust when day is Sunday
    return new Date(date.setDate(diff));
};

const Statistiques = () => {
    const [data, setData] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch('https://www.api.ombreetlumiere.eu/controller.php/reservations');
                const reservations = await response.json();

                const currentDate = new Date();
                const currentWeekNumber = getWeekNumber(currentDate);

                const reservationsByWeek = {};
                reservations.forEach(reservation => {
                    const date = new Date(reservation.date);
                    const week = getWeekNumber(date);
                    if (!reservationsByWeek[week]) {
                        reservationsByWeek[week] = 0;
                    }
                    reservationsByWeek[week]++;
                });

                // Get the dates for the next three Mondays
                const nextMondays = Array.from({ length: 3 }, (_, index) => {
                    const monday = new Date();
                    monday.setDate(monday.getDate() + 7 * (index + 1) - monday.getDay());
                    return monday;
                });

                const labels = nextMondays.map(monday => {
                    return `Semaine du ${monday.toLocaleDateString()}`;
                });
                const data = labels.map(label => {
                    const weekNumber = getWeekNumber(new Date(label.split('du')[1].trim()));
                    return reservationsByWeek[weekNumber] || 0;
                });

                setData({
                    labels: labels,
                    datasets: [{
                        label: 'Nombre de réservations par semaine',
                        data: data,
                        backgroundColor: 'rgba(75, 192, 192, 0.2)',
                        borderColor: 'rgba(75, 192, 192, 1)',
                        borderWidth: 1
                    }]
                });
            } catch (error) {
                console.error('Erreur lors de la récupération des données :', error);
            }
        };

        fetchData();
    }, []);

    return (
        <div>
            <h2>Statistiques de fréquentation par semaine</h2>
            {data ? (
                <div>
                    <Bar data={data} />
                </div>
            ) : (
                <p>Chargement des données...</p>
            )}
        </div>
    );
};

export default Statistiques;

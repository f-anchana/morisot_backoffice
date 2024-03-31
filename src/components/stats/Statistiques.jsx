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
    const currentDayOfWeek = date.getDay();
    const daysToAdd = currentDayOfWeek === 0 ? 1 : -currentDayOfWeek + 1;
    const monday = new Date(date.setDate(date.getDate() + daysToAdd));
    return monday;
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

                const reservationsByDay = {};
                reservations.forEach(reservation => {
                    const date = new Date(reservation.date_choisi);
                    const formattedDate = date.toLocaleDateString(); // Formatage de la date
                    const dayOfWeek = date.getDay();
                    if (!reservationsByDay[formattedDate]) {
                        reservationsByDay[formattedDate] = 0;
                    }
                    reservationsByDay[formattedDate]++;
                });

                // Get the dates for the current week starting from Monday
                const monday = getMonday(currentDate);
                const labels = Array.from({ length: 7 }, (_, index) => {
                    const day = new Date(monday);
                    day.setDate(monday.getDate() + index);
                    return day.toLocaleDateString(); // Formatage de la date
                });
                const data = labels.map(label => {
                    return reservationsByDay[label] || 0;
                });

                setData({
                    labels: labels,
                    datasets: [{
                        label: 'Nombre de réservations par jour de la semaine',
                        data: data,
                        backgroundColor: 'pink',
                        // borderColor: 'rgba(75, 192, 192, 1)',
                        borderColor: 'purple',
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
            <h2>Statistiques de fréquentation par jour de la semaine</h2>
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

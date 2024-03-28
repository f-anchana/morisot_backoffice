"use client";

import React, { useState, useEffect } from 'react';
import { Bar } from 'react-chartjs-2';
import Chart from 'chart.js/auto';

const getWeekNumber = (date) => {
    const firstDayOfYear = new Date(date.getFullYear(), 0, 1);
    const diff = date - firstDayOfYear;
    return Math.ceil((diff / (1000 * 60 * 60 * 24)) / 7);
};

const Statistiques = () => {
    const [data, setData] = useState(null);
    const [currentWeek, setCurrentWeek] = useState(0);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch('https://www.api.ombreetlumiere.eu/controller.php/reservations');
                const reservations = await response.json();

                const currentDate = new Date();
                const currentWeekNumber = getWeekNumber(currentDate);
                setCurrentWeek(currentWeekNumber);

                const reservationsByWeek = {};
                reservations.forEach(reservation => {
                    const date = new Date(reservation.date);
                    const week = getWeekNumber(date);
                    if (!reservationsByWeek[week]) {
                        reservationsByWeek[week] = 0;
                    }
                    reservationsByWeek[week]++;
                });

                const labels = Object.keys(reservationsByWeek).map(week => {
                    const startDate = new Date();
                    startDate.setDate(startDate.getDate() + (parseInt(week) - 1) * 7);
                    const formattedDate = `${startDate.getDate()}/${startDate.getMonth() + 1}/${startDate.getFullYear().toString().substr(-2)}`;
                    return `Semaine du ${formattedDate}`;
                });
                const data = Object.values(reservationsByWeek);

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
                    <p>Semaine actuelle : {currentWeek}</p>
                </div>
            ) : (
                <p>Chargement des données...</p>
            )}
        </div>
    );
};

export default Statistiques;

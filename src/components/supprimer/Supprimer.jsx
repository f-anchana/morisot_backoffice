"use client";

import React from "react";

export const Supprimer = ({ id, setReservations }) => {
    const API = `https://www.api.ombreetlumiere.eu/controller.php/supprimer_reservation`;

    const supprimerReservation = async () => {
        try {
            const deleteResponse = await fetch(API, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ id_resa: id })
            });

            if (!deleteResponse.ok) {
                throw new Error('Erreur lors de la suppression de la réservation.');
            }

            // Requête GET pour récupérer les réservations mises à jour après la suppression
            const getResponse = await fetch('https://www.api.ombreetlumiere.eu/controller.php/reservations');
            if (!getResponse.ok) {
                throw new Error('Erreur lors de la récupération des réservations après la suppression.');
            }

            const data = await getResponse.json();
            // Mettre à jour l'état avec les nouvelles données de réservation
            setReservations(data);
        } catch (error) {
            console.error('Erreur lors de la requête:', error);
        }
    }

    return (
        <button onClick={supprimerReservation} className="delete fonce">
            <img src="bin.png" alt="supprimer" />
        </button>
    );
}

export default Supprimer;

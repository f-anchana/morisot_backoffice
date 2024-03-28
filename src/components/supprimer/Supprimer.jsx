"use client";

import React from "react";

export const Supprimer = ({ id }) => {
    const API = `https://www.api.ombreetlumiere.eu/controller.php/supprimer_reservation`;

    const supprimerReservation = async () => {
        try {
            const result = await fetch(API, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ id_reservation: id }) // Envoyer l'ID de la réservation dans le corps de la requête
            });

            if (!result.ok) {
                throw new Error('Erreur lors de la suppression de la réservation.');
            }

            // Recharger la page après la suppression
            window.location.reload();
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


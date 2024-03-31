"use client";

import React from "react";

export const SupprimerUtilisateur = ({ id, setUtilisateurs }) => {
    const API = `https://www.api.ombreetlumiere.eu/controller.php/supprimer_utilisateur`;

    const supprimerUtilisateur = async () => {
        try {
            const deleteResponse = await fetch(API, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ id_user: id })
            });

            if (!deleteResponse.ok) {
                throw new Error('Erreur lors de la suppression de l\'utilisateur.');
            }

            // Requête GET pour récupérer les utilisateurs mis à jour après la suppression
            const getResponse = await fetch('https://www.api.ombreetlumiere.eu/controller.php/utilisateurs');
            if (!getResponse.ok) {
                throw new Error('Erreur lors de la récupération des utilisateurs après la suppression.');
            }

            const data = await getResponse.json();
            // Mettre à jour l'état avec les nouveaux utilisateurs
            setUtilisateurs(data);
        } catch (error) {
            console.error('Erreur lors de la requête:', error);
        }
    }

    return (
        <button onClick={supprimerUtilisateur} className="delete fonce">
            <img src="bin.png" alt="supprimer" />
        </button>
    );
}

export default SupprimerUtilisateur;

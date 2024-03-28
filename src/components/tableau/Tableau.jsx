"use client";

import React, { useState, useEffect } from "react";
import "./tableau.css";
import Supprimer from "@/components/supprimer/Supprimer";

export const Tableau = () => {
  // Déclaration d'un état pour stocker les réservations récupérées de l'API
  const [reservations, setReservations] = useState([]);

  // Effet de chargement pour récupérer les réservations depuis l'API
  useEffect(() => {
    // Vérifier si le code est exécuté côté client
    if (typeof window !== 'undefined') {
      fetchReservations();
    }
  }, []);

  // Fonction pour effectuer la requête à l'API et récupérer les réservations
  const fetchReservations = async () => {
    try {
      const response = await fetch('https://www.api.ombreetlumiere.eu/controller.php/reservations');
      const data = await response.json();
      // Mettre à jour l'état avec les données récupérées
      setReservations(data);
    } catch (error) {
      console.error('Erreur lors de la récupération des réservations :', error);
    }
  };

  return (
    <div className="tableau">
      <h1>Liste des réservations</h1>
      <table className="table">
        <thead>
          <tr>
            <th>Id</th>
            <th>Nom</th>
            <th>Prénom</th>
            <th>Email</th>
            <th>Prix</th>
            <th>Quantité</th>
            <th>Téléphone</th>
            <th>Supprimer</th>
          </tr>
        </thead>
        <tbody>
          {reservations.map((reservation, index) => (
            <tr key={index}>
              <td>{reservation.id_resa}</td>
              <td>{reservation.nom_client}</td>
              <td>{reservation.prenom_client}</td>
              <td>{reservation.email_client}</td>
              <td>{reservation.prix_tota}</td>
              <td>{reservation.nbr_billets}</td>
              <td>{reservation.numero_client}</td>
              {/* <td> <img src="bin.png" alt="Poubelle" /></td> */}
              <td><Supprimer id={reservation.id_resa}/></td>

            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Tableau;

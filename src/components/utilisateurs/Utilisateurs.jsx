"use client";

import React, { useState, useEffect } from "react";
import "./users.css";
import SupprimerUtilisateur from "@/components/supprimer/SupprimerUtilisateur";

export const Utilisateurs = () => {
  // Déclaration d'un état pour stocker les utilisateurs récupérés de l'API
  const [utilisateurs, setUtilisateurs] = useState([]);

  // Effet de chargement pour récupérer les utilisateurs depuis l'API
  useEffect(() => {
    // Vérifier si le code est exécuté côté client
    if (typeof window !== 'undefined') {
      fetchUtilisateurs();
    }
  }, []);

  // Fonction pour effectuer la requête à l'API et récupérer les utilisateurs
  const fetchUtilisateurs = async () => {
    try {
      const response = await fetch('https://www.api.ombreetlumiere.eu/controller.php/utilisateurs');
      const data = await response.json();
      // Filtrer les utilisateurs pour exclure l'utilisateur admin
      const filteredUtilisateurs = data.filter(utilisateur => utilisateur.mail !== "fatimarajananchana@gmail.com");
      // Mettre à jour l'état avec les données filtrées
      setUtilisateurs(filteredUtilisateurs);
    } catch (error) {
      console.error('Erreur lors de la récupération des utilisateurs :', error);
    }
  };

  return (
    <div className="tableau">
      <h1>Liste des utilisateurs</h1>
      <table className="table">
        <thead>
          <tr>
            <th>Id</th>
            <th>Nom</th>
            <th>Prénom</th>
            <th>Email</th>
            <th>Téléphone</th>
            <th>Supprimer</th>
          </tr>
        </thead>
        <tbody>
          {utilisateurs.map((utilisateur, index) => (
            <tr key={index}>
              <td>{utilisateur.id_user}</td>
              <td>{utilisateur.nom}</td>
              <td>{utilisateur.prenom}</td>
              <td>{utilisateur.mail}</td>
              <td>{utilisateur.numero}</td>
              <td><SupprimerUtilisateur id={utilisateur.id_user} setUtilisateurs={setUtilisateurs} /></td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Utilisateurs;

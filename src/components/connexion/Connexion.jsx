"use client";

import React, { useState } from 'react';
import './connexion.css';

const Connexion = () => {
  const [email, setEmail] = useState('');
  const [mdp, setMdp] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const response = await fetch('https://www.api.ombreetlumiere.eu/controller.php/connexion', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, mdp }),
      });

      if (!response.ok) {
        throw new Error('Identifiants incorrects');
      }

      // Vérification des identifiants après la réception de la réponse de l'API
      if (email !== 'fatimarajananchana@gmail.com' || mdp !== 'admin') {
        throw new Error('Identifiants incorrects');
      }

      window.location.href = '/tableau';
    } catch (error) {
      setErrorMessage(error.message);
    }
  };

  return (
    <form onSubmit={handleSubmit} className='connexion'>
      <h1>Connexion administrateur</h1>
      <label htmlFor="email">Email</label><br />
      <input type="email" name="email" id='email' value={email} onChange={(e) => setEmail(e.target.value)} required /><br />
      <label htmlFor="mdp">Mot de passe</label><br />
      <input type="password" name="mdp" id='mdp' value={mdp} onChange={(e) => setMdp(e.target.value)} required /><br />
      {errorMessage && <div className="error">{errorMessage}</div>}
      <button type="submit">Valider</button>
    </form>
  );
};

export default Connexion;

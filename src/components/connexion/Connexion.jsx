import React, { useState } from 'react';
import './connexion.css';

const Connexion = () => {
  const [email, setEmail] = useState('');
  const [mdp, setMdp] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const handleSubmit = async (event) => {
    event.preventDefault();
  
    try {
      // Vérification des identifiants
      if (email !== 'fatimarajananchana@gmail.com' || mdp !== 'admin') {
        throw new Error('Identifiants incorrects');
      }
  
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
  
      // Redirection vers /tableau si la connexion est réussie
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

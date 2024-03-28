"use client";
import React from 'react';

const Deconnexion = () => {
  const Logout = () => {
    window.location.href = '/';
  };

  return (
    <div>
      <button className="deco" onClick={Logout}>Déconnexion</button>
    </div>
  );
};

export default Deconnexion;

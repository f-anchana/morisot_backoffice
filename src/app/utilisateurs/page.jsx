import React from "react";
// import { Tableau } from "@/components/tableau/Tableau";
import Header from "@/components/header/Header";
import { Utilisateurs } from "@/components/utilisateurs/Utilisateurs";


export default function PageUtilisateurs() 
{
    return (
        <section>
            < Header />
            <Utilisateurs />
        </section>
    )
}
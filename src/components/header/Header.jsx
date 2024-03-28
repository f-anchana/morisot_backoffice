import "./header.css";
import Link from "next/link";
import Deconnexion from "../connexion/Deconnexion";

export default function Header() {
  return (
<header>
<Link href="/tableau">
  Gérer les réservations
          </Link>

<Link href="/utilisateurs">
    Gérer les utilisateurs
</Link>

<Link href="/statistiques">

Statistiques

</Link>

    <Deconnexion></Deconnexion>
</header>
  );
}
export interface Plant {
  id: number;
  nom: string;
  soleil: string;
  arrosage: number;
  categorie: { id: number; libelle: string };
  image: string;
}

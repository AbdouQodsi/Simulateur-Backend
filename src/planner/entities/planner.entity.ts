import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity('planner')
export class Planner {

  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  entreprise: string;

  @Column()
  secteur: string;

  @Column()
  taille: string;

  @Column("simple-array")
  geographique: string[];

  @Column()
  objectif: string;

  @Column("simple-array")
  presence: string[];

  @Column()
  generation_lead: boolean;


  @Column("simple-array")
  canaux_marketing: string[];

  @Column()
  budget_min: number;

  @Column()
  budget_max: number;

  @Column()
  duree_compagne: string;

  @Column()
  nom: string;

  @Column()
  email: string;

  @Column()
  telephone: string;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  createdAt: Date;

}
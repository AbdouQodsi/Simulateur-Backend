import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity('finder')
export class Finder {

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

  @Column("simple-array")
  enjeux: string[];

  @Column()
  presence_digitale: string;

  @Column()
  site_web: boolean;

  @Column("simple-array")
  leviers_digitaux: string[];

  @Column()
  fonction_marketing: string;

  @Column()
  nom: string;

  @Column()
  email: string;

  @Column()
  telephone: string;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  createdAt: Date;
}


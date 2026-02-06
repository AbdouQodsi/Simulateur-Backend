import { Injectable } from '@nestjs/common';
import { CreatePlannerDto } from './dto/create-planner.dto';
import { UpdatePlannerDto } from './dto/update-planner.dto';
import { Repository } from 'typeorm'
import { Planner } from './entities/planner.entity';
import { InjectRepository } from '@nestjs/typeorm'
import * as nodemailer from 'nodemailer'

@Injectable()
export class PlannerService {
   constructor(
      @InjectRepository(Planner)
      private plannerRepository: Repository<Planner>,
    ) {}

      async sendMailToAdmin(data: any) {
        const transporter = nodemailer.createTransport({
          service: 'gmail',
          auth: {
            user: process.env.MAIL_USER,
            pass: process.env.MAIL_PASS,
          },
        })
    
        await transporter.sendMail({
          from: `"Digistricom" <${process.env.MAIL_USER}>`,
          to: process.env.ADMIN_EMAIL,
          subject: 'Nouveau Client - Digi Budget Planner',
          html: `
            <h2>Nouveau Client reçu</h2>
    
            <h3>Informations entreprise</h3>
            <ul>
              <li><b>Entreprise :</b> ${data.companyName}</li>
              <li><b>Secteur :</b> ${data.sector}</li>
              <li><b>Taille :</b> ${data.companySize}</li>
              <li><b>Zone :</b> ${data.zones?.join(', ')}</li>
            </ul>
    
            <h3>Digital</h3>
            <ul>
              <li><b>Présence digitale :</b> ${data.presence?.join(', ')}</li>
              <li><b>Objectif principal :</b> ${data.marketingGoals}</li>
              <li><b>Canaux Marketing :</b> ${data.canauxdigitaux?.join(', ')}</li>
              <li><b>Le site web génère des leads : </b> ${data.generation_lead}</li>
              <li><b>Durée de la campagne :</b> ${data.marketingDuration}</li>
              <li><b>Budget minimum :</b> ${data.budget_min}</li>
              <li><b>Budget maximum :</b> ${data.budget_max}</li>
            </ul>
    
            <h3>Contact</h3>
            <ul>
              <li><b>Nom :</b> ${data.nom}</li>
              <li><b>Email :</b> ${data.email}</li>
              <li><b>Téléphone :</b> ${data.telephone}</li>
            </ul>
          `,
        })
      }

    async create(data: any) {
    const finder = this.plannerRepository.create({
      entreprise: data.companyName,
      secteur: data.sector,
      taille: data.companySize,
      geographique: data.zones,


      objectif: data.marketingGoals,
      presence: data.presence,
      generation_lead: data.generation_lead,
      canaux_marketing: data.canauxdigitaux,

      duree_compagne: data.marketingDuration,
      budget_min: data.budget_min,
      budget_max: data.budget_max,
      nom: data.nom,
      email: data.email,
      telephone: data.telephone,
    })

    const saved = await this.plannerRepository.save(finder)

    await this.sendMailToAdmin(data)

    return saved
  }


  findAll(): Promise<Planner[]> {
    return this.plannerRepository.find()
  }

  findOne(id: number) {
    return this.plannerRepository.findOneBy({ id })
  }

  async remove(id: number) {
    return this.plannerRepository.delete(id)
  }
}

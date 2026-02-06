import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { Finder } from './entities/finder.entity'
import * as nodemailer from 'nodemailer'

@Injectable()
export class FinderService {
  constructor(
    @InjectRepository(Finder)
    private finderRepository: Repository<Finder>,
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
      from: `"DigiFinder" <${process.env.MAIL_USER}>`,
      to: process.env.ADMIN_EMAIL, // 👈 TOI
      subject: 'Nouveau formulaire DigiFinder',
      html: `
        <h2>Nouveau lead reçu</h2>

        <h3>Informations entreprise</h3>
        <ul>
          <li><b>Entreprise :</b> ${data.companyName}</li>
          <li><b>Secteur :</b> ${data.sector}</li>
          <li><b>Taille :</b> ${data.companySize}</li>
          <li><b>Zone :</b> ${data.zones?.join(', ')}</li>
        </ul>

        <h3>Digital</h3>
        <ul>
          <li><b>Enjeux :</b> ${data.challenges?.join(', ')}</li>
          <li><b>Maturité digitale :</b> ${data.digitalMaturity}</li>
          <li><b>Site web :</b> ${data.hasWebsite}</li>
          <li><b>Leviers :</b> ${data.digitalLevers?.join(', ')}</li>
          <li><b>Organisation marketing :</b> ${data.marketingOrg}</li>
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
    const finder = this.finderRepository.create({
      entreprise: data.companyName,
      secteur: data.sector,
      taille: data.companySize,
      geographique: data.zones,
      enjeux: data.challenges,
      presence_digitale: data.digitalMaturity,
      site_web: data.hasWebsite === 'oui',
      leviers_digitaux: data.digitalLevers,
      fonction_marketing: data.marketingOrg,
      nom: data.nom,
      email: data.email,
      telephone: data.telephone,
    })

    const saved = await this.finderRepository.save(finder)

    await this.sendMailToAdmin(data)

    return saved
  }

  findAll(): Promise<Finder[]> {
    return this.finderRepository.find()
  }

  findOne(id: number) {
    return this.finderRepository.findOneBy({ id })
  }

  async remove(id: number) {
    return this.finderRepository.delete(id)
  }
}

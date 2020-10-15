import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, ManyToMany, JoinColumn } from 'typeorm';
import Institution from './Institution';

@Entity('images')
export default class Image {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column()
  path: string;

  @ManyToMany(() => Institution, institution => institution.images)
  @JoinColumn({ name: 'institution_id' })
  institution: Institution;
}
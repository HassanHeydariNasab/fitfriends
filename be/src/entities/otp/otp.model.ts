import { Column, Entity, PrimaryColumn } from 'typeorm';

@Entity()
export class Otp {
  @PrimaryColumn({ unique: true })
  phoneNumber: string;

  @Column()
  code: string;

  @Column('timestamp')
  expiresAt: Date;
}

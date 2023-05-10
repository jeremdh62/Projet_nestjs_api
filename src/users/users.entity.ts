import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class User {
  @PrimaryGeneratedColumn('uuid')
  public id: string;

  @Column({
    type: 'varchar',
    length: 255,
    unique: true,
  })
  public name: string;

  @Column({
    type: 'varchar',
    length: 255,
    unique: true,
  })
  public email: string;

  @Column({
    type: 'char',
    length: 255,
  })
  public password: string;

  @Column({
    type: 'timestamp',
  })
  public createdAt: Date;

  public updatedAt: Date;
}

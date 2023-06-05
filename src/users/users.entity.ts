import { Role } from 'src/enums/role.enum';
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
    default: () => 'CURRENT_TIMESTAMP',
  })
  public createdAt: Date;

  @Column({
    type: "enum",
    enum: Role,
    array: true,
    default: [Role.User],
  })
  role: Role[]
}

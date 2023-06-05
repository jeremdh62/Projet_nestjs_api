import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

export enum TaskStatus {
  TODO = "todo",
  DOING = "doing",
  DONE = "DONE",
}

@Entity()
export class Task {
  @PrimaryGeneratedColumn('uuid')
  public id: string;

  @Column({
    type: 'varchar',
    length: 255,
    unique: true,
  })
  public title: string;

  @Column({
    type: 'varchar',
    length: 255,
  })
  public description: string;

  // TODO owner: User
  // @Column({
  //   type: 'char',
  //   length: 255,
  // })
  // public owner: string;

  @Column({
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP',
  })
  public createdAt: Date;

  @Column({
    type: 'enum',
    enum: TaskStatus,
    default: TaskStatus.TODO
  })
  public status: TaskStatus;
}

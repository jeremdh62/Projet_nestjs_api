import { User } from 'src/users/users.entity';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

export enum TaskStatus {
  TODO = "todo",
  DOING = "doing",
  DONE = "done",
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

  @ManyToOne(() => User, (user) => user.tasks)
  user: User;
}

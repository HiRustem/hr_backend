import { Injectable } from '@nestjs/common';
import { DatabaseService } from './database/database.service';

@Injectable()
export class AppService {
  constructor( private readonly databaseService: DatabaseService ) {}

  getHello(id: number): number {
    return id;
  }
}

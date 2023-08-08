// import { Injectable } from "@nestjs/common";
// import { DataSource, Repository } from "typeorm";
// import { Card } from "../entity/card.entity"

// @Injectable()
// export class CardRepository extends Repository<Card>{
//     constructor(private dataSource: DataSource){
//         super(Card, dataSource.createEntityManager())
//     }

//     async getCard():Promise<Card[]>{
//         const result = await this.find()
//         return result
//     }
// }

import { Injectable } from "@nestjs/common";
import { Repository } from "typeorm";
import { Card } from "../entity/card.entity";

@Injectable()
export class CardRepository extends Repository<Card> {
  async getCard(): Promise<Card[]> {
    const cards = await this.find();
    return cards;
  }
}

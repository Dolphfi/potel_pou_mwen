import { Injectable } from '@nestjs/common';
import { CreateRestaurantDto } from './dto/create-restaurant.dto';
import { UpdateRestaurantDto } from './dto/update-restaurant.dto';
import { Restaurant } from './entities/restaurant.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class RestaurantsService {
  constructor(@InjectRepository(Restaurant)
   private readonly restaurants: Repository<Restaurant>){}

  getAll():Promise<Restaurant[]>{
    return this.restaurants.find();
  }
  
  createRestaurant(createRestaurantDto: CreateRestaurantDto): Promise<Restaurant>{
    const newRestaurant = this.restaurants.create(createRestaurantDto);
    return this.restaurants.save(newRestaurant);

  }

  updateRestaurant({id, data}:UpdateRestaurantDto){
     this.restaurants.update(id,{...data });
  }
}

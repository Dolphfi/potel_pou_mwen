import { Inject, Injectable } from '@nestjs/common';
import { CONFIG_OPTIONS } from './jwt.constants';
import { JwtModuleOptions } from './jwt.interfaces';

@Injectable()
export class JwtService {
    constructor(@Inject(CONFIG_OPTIONS) options: JwtModuleOptions){}
    hello(){
        console.log('helo');
    }
}

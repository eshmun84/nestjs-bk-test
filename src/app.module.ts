import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MovieModule } from './movie/movie.module';
import { ReactionModule } from './reaction/reaction.module';

@Module( {
	imports: [
		ConfigModule.forRoot(),
		TypeOrmModule.forRoot( {
			type: 'postgres',
			host: process.env.DB_HOST,
			port: parseInt( process.env.DB_PORT ),
			username: process.env.DB_USERNAME,
			password: process.env.DB_PASSWORD,
			database: process.env.DB_DATABASE,
			entities: [ __dirname + '/**/*.entity{.ts,.js}' ],
			//synchronize: ( process.env.DB_SYNCHRONIZE === 'false' ),
		} ),
		MovieModule,
		ReactionModule,
	],
	controllers: [ AppController ],
	providers: [ AppService ],
} )
export class AppModule {
}

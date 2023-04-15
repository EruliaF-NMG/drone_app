
import schedule from 'node-schedule';
import { logger } from '../core';
import { DroneEntity } from '../modules/drone-module/entities/drone.entity';

schedule.scheduleJob('* 1 * * *', () => {
  try {
    DroneEntity.find().exec().then((drones)=>{
        drones.forEach((drone)=>{
            logger.info(`Drone  ${drone.serial_number} | ${drone.battery_capacity} `);
        })
    });
    
  } catch (ex) {
    logger.error(`Exception occurred Error :: ${JSON.stringify(ex)}`);
  }
});
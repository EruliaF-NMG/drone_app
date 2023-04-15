import mongoose from "mongoose";
import { DroneStates } from "../../../../config/core.enum";
import { getInputsForValidate, getValue } from "../../../../helpers/util-helpers";

/**
 * @author Nisal Madusanka(EruliaF)
 * @description check drone is ready for loading
 * @param {string} key input value key
 * @param {object} values form values
 * @param {array} param additional validation parameters
 * @param {string} message Error message
 * @param {object} filedList display name for form elements
 * @param {Function} cb callback function
 */
const checkDroneIsReady = (key:string, values:any, param:any, message:string, filedList:any,additionalParam:any, cb:Function) => {
    try {
      const formValue = getInputsForValidate(values, key);
      let filterOption:any={};
      if(getValue(param, '1', key) == '_id'){
        filterOption['_id'] = new mongoose.Types.ObjectId(formValue);
      } else {
        filterOption[getValue(param, '1', key)] = formValue;
      }
  
      mongoose.connection
        .collection(getValue(param, '0', key))
        .findOne(filterOption, (error:any, result:any) => {
          if (result) {
            const stateList = [DroneStates.IDLE,DroneStates.LOADING];
            if(stateList.includes(result['state'])) {
                cb(null, true);
            } else {
                cb(message);
            }
          } else {
            cb(message);
          }
        });
    } catch (ex) {
      console.log(
        `----------------Validation Exception At (exists)-------------------`,
        `Input Key - ${key}`,
        `Exception - ${ex}`
      );
  
      cb(message);
    }
};

// eslint-disable-next-line import/prefer-default-export
export {checkDroneIsReady}
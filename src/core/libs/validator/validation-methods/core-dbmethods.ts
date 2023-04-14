
import mongoose from 'mongoose';

import { getInputsForValidate, getValue } from '../../../../helpers/util-helpers';

/**
 * @author Nisal Madusanka(EruliaF)
 * @description validate unique with db
 * @param {string} key input value key
 * @param {object} values form values
 * @param {array} param additional validation parameters
 * @param {string} message Error message
 * @param {object} filedList display name for form elements
 * @param {Function} cb callback function
 */
const unique = (key:string, values:any, param:any, message:string, filedList:any,additionalParam:any, cb:Function) => {
  try {
    const formValue = getInputsForValidate(values, key);
    const filterOption :any = {
      [getValue(param, '1', key)]: formValue,
    };

    if (mongoose.Types.ObjectId.isValid(getValue(additionalParam, getValue(param, '2', '-'), '-'))) {
      // eslint-disable-next-line dot-notation
      filterOption['_id'] = {
        $ne: new mongoose.Types.ObjectId(getValue(additionalParam, getValue(param, '2', '-'), '-')),
      };
    }

    mongoose.connection
      .collection(getValue(param, '0', key))
      .findOne(filterOption, (error:any, result:any) => {
        if (result) {
          cb(message, null);
        } else {
          cb(null, true);
        }
      });
  } catch (ex) {
    console.log(
      `----------------Validation Exception At (unique)-------------------`,
      `Input Key - ${key}`,
      `Exception - ${ex}`
    );

    cb(true);
  }
};

/**
 * @author Nisal Madusanka(EruliaF)
 * @description validate value is exists on DB
 * @param {string} key input value key
 * @param {object} values form values
 * @param {array} param additional validation parameters
 * @param {string} message Error message
 * @param {object} filedList display name for form elements
 * @param {Function} cb callback function
 */
const exists = (key:string, values:any, param:any, message:string, filedList:any,additionalParam:any, cb:Function) => {
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
          cb(null, true);
        } else {
          console.log(1,message);
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

export { unique,exists };
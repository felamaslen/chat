/**
 * @file code/common.js
 * Defines common methods and static variables
 */

import {
} from './config';

import { fromJS } from 'immutable';

export const urlEncode = _str => {
  let str = _str;

  str = (str + '').toString();

  return encodeURIComponent(str)
    .replace(/!/g, '%21')
    .replace(/'/g, '%27')
    .replace(/\(/g, '%28')
    .replace(/\)/g, '%29')
    .replace(/\*/g, '%2A')
    .replace(/%20/g, '+');
}

export const urlSerialise = obj => {
  return fromJS(obj).map((item, key) => key + '=' + urlEncode(item)).join('&');
}


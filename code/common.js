/**
 * @file code/common.js
 * Defines common methods and static variables
 */

import {
} from './config';

import { fromJS } from 'immutable';

const addLeadingZero = number => {
  return number >= 10 ? number : '0' + number;
}

export const getDateFromTime = time => {
  const date = new Date(time * 1000);

  const dateIsToday = date.toDateString() == new Date().toDateString();

  let theDate = '';

  if (!dateIsToday) {
    const months = [
      'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
      'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'
    ];

    const year  = date.getFullYear();
    const month = months[date.getMonth()];
    const day   = date.getDate();

    theDate = ', ' + day + ' ' + month + ' ' + year;
  }

  const hour    = addLeadingZero(date.getHours());
  const minute  = addLeadingZero(date.getMinutes());
  const sec     = addLeadingZero(date.getSeconds());

  return hour + ':' + minute + ':' + sec + theDate;
}

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

export const createMessage = (type, title, body) => fromJS({
  type,
  title,
  body,
  fade: false,
  timeoutSet: false
});


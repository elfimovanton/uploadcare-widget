/* @flow */

import {boolean} from './boolean'
import {SettingsError} from 'errors/SettingsError'

import type {ValueTransformer} from '../flow-typed/ValueTransformer'

export const string: ValueTransformer<mixed, ?string> = (value: mixed) => {
  if (!boolean(value)) {
    return null
  }

  if (typeof value !== 'string') {
    throw new SettingsError('Not a string', null)
  }

  return value
}
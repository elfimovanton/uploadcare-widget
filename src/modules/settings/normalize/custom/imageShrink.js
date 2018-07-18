/* @flow */

import {SettingsError} from 'errors/SettingsError'

import type {ValueTransformer} from '../flow-typed/ValueTransformer'
import type {Settings} from '../../flow-typed/Settings'

export const imageShrink: ValueTransformer<string, $PropertyType<Settings, 'imageShrink'>> = (value: string) => {
  const reShrink = /^([0-9]+)x([0-9]+)(?:\s+(\d{1,2}|100)%)?$/i
  const shrink = reShrink.exec(value.trim().toLowerCase())

  if (!shrink) {
    throw new SettingsError('Wrong format', null)
  }

  const size = shrink[1] * shrink[2]

  if (size > 5000000) {
    // ios max canvas square
    throw new SettingsError(
      'Shrinked size can not be larger than 5MP. ' +
        `You have set ${shrink[1]}x${shrink[2]} (` +
        `${Math.ceil(size / 1000 / 100) / 10}MP).`,
      null
    )
  }

  return {
    quality: shrink[3] ? shrink[3] / 100 : null,
    size: size,
  }
}
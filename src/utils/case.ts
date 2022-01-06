import camelcaseKeys from 'camelcase-keys'
import snakecaseKeys from 'snakecase-keys'

export const camelizeDeeply = <T extends Record<string, any> | readonly any[]>(
  arg: T,
) => camelcaseKeys(arg, { deep: true })

export const snakelizeDeeply = <T extends Record<string, any> | readonly any[]>(
  arg: T,
) => snakecaseKeys(arg, { deep: true })

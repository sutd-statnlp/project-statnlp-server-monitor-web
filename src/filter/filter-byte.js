import DataUtil from '@/utils/data-util'

export default (input, limit) => {
  return DataUtil.convertByteToBiggerUnit(input, limit)
}

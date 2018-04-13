import DataUtil from '@/utils/data-util'

export default (input, limit) => {
  let mibNumber = parseInt(input.split(' ')[0])
  mibNumber = mibNumber * 1048576
  return DataUtil.convertByteToBiggerUnit(mibNumber, limit)
}

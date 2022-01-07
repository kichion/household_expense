export const formatDate = (date: Date): string => {
  var y = date.getFullYear()
  var m = `00${date.getMonth() + 1}`.slice(-2)
  var d = `00${date.getDate()}`.slice(-2)
  return `${y}-${m}-${d}`
}

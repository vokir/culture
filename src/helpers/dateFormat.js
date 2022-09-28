import dayjs from 'dayjs'
import 'dayjs/locale/ru'
import isToday from 'dayjs/plugin/isToday.js'

dayjs.extend(isToday)

const computeDate = (date, format = 'DD.MM.YYYY HH:mm', formatToday = 'Сегодня HH:mm') => {
  if (!date?.length) return '';
  const dateProp = new Date(date)
  if (dayjs(dateProp).isToday()) {
    return dayjs(dateProp).format(formatToday)
  } else {
    return dayjs(dateProp).locale('ru-ru').format(format)
  }
}

export default computeDate

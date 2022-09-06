import dayjs from 'dayjs'
import 'dayjs/locale/ru'
import isToday from 'dayjs/plugin/isToday.js'

dayjs.extend(isToday)

const computeDate = (date) => {
  if (!date?.length) return '';
  const dateProp = new Date(date)
  if (dayjs(dateProp).isToday()) {
    return dayjs(dateProp).format('Сегодня HH:mm')
  } else {
    return dayjs(dateProp).locale('ru-ru').format('DD.MM.YYYY HH:mm')
  }
}

export default computeDate

export function getSeason() {
  const month = new Date().getMonth();
  let result;

  switch (month) {
    case 11:
    case 0:
    case 1:
      result = "Зима";
      break;
    case 2:
    case 3:
    case 4:
      result = "Весна";
      break;
    case 5:
    case 6:
    case 7:
      result = "Літо";
      break;
    case 8:
    case 9:
    case 10:
      result = "Осінь";
      break;
    default:
      result = "-";
  }

  return result;
}

export function getTime() {
  const hours = new Date().getHours();
  if (hours >= 4 && hours <= 10) return "Ранок";
  if (hours >= 11 && hours <= 17) return "День";
  if (hours >= 18 && hours <= 23) return "Вечір";
  else return "Ніч";
}

export function getDay() {
  const day = new Date().getDay();

  const days = [
    "Неділя",
    "Понеділок",
    "Вівторок",
    "Середа",
    "Четвер",
    "Пʼятниця",
    "Субота",
  ];

  return days[day];
}

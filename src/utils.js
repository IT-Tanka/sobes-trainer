export function shuffle(items) {
    const copiedItems = [...items];
    for (let index = copiedItems.length - 1; index > 0; index -= 1) {
        const randomIndex = Math.floor(Math.random() * (index + 1));
        [copiedItems[index], copiedItems[randomIndex]] =
            [copiedItems[randomIndex], copiedItems[index]];
    }
    return copiedItems;
}

export function calculateLevel(percent) {
  if (percent <= 40) return 'Нужно повторить базу';
  if (percent <= 70) return 'Неплохо, но есть пробелы';
  if (percent <= 90) return 'Хороший junior-уровень';
  return 'Отличный результат';
}

export function readStorageValue(key) {
  try {
    const value = localStorage.getItem(key);
    return value ? JSON.parse(value) : null;
  } catch {
    return null;
  }
}

export function writeStorageValue(key, value) {
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch {
    /* квота переполнена или приватный режим — молча игнорируем */
  }
}

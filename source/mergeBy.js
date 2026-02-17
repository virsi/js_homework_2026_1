'use strict';

/**
 * Объединяет два массива объектов по указанному ключу (например, 'id').
 * * Логика слияния:
 * 1. Если элемент с таким ключом уже есть в первом массиве, он обновляется данными из второго.
 * 2. Если в обоих объектах есть свойство-массив, они объединяются (конкатенируются).
 * 3. Если во втором массиве есть объект без указанного ключа, он игнорируется.
 * @param {Array<Object>} arr1 - Исходный массив.
 * @param {Array<Object>} arr2 - Массив с новыми данными (приоритетный).
 * @param {string} key - Название поля-идентификатора (например, "id").
 * @returns {Array<Object>} Новый объединенный массив.
 */
const mergeBy = (arr1, arr2, key) => {
    if (!Array.isArray(arr1) || !Array.isArray(arr2)) {
        return [];
    }

    const map = new Map();

    arr1.forEach(item => {
        const id = item[key];
        if (id) {
            map.set(id, { ...item });
        }
    });

    arr2.forEach(item => {
        const id = item[key];
        if (!id) return;

        if (map.has(id)) {
            const existingItem = map.get(id);
            const mergedItem = { ...existingItem };

            Object.keys(item).forEach(prop => {
                const val1 = existingItem[prop];
                const val2 = item[prop];

                if (Array.isArray(val1) && Array.isArray(val2)) {
                    mergedItem[prop] = [...val1, ...val2];
                } else {
                    mergedItem[prop] = val2;
                }
            });

            map.set(id, mergedItem);
        } else {
            map.set(id, { ...item });
        }
    });

    return Array.from(map.values());
};

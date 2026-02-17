'use strict';

QUnit.module("Тестируем функцию mergeBy", function() {
    QUnit.test("Работает правильно с одинаковыми значениями по ключу", function(assert) {
        const array1 = [
            { id: 1, name: "Alice", tags: ["friend"] },
            { id: 2, name: "Bob", tags: ["colleague"] }
        ];
        const array2 = [
            { id: 1, age: 30, tags: ["travel"] },
            { id: 3, name: "Charlie" }
        ];
        const result = mergeBy(array1, array2, "id");

        assert.deepEqual(result, [
            { id: 1, name: "Alice", tags: ["friend", "travel"], age: 30 },
            { id: 2, name: "Bob", tags: ["colleague"] },
            { id: 3, name: "Charlie" }
        ]);
    });

    QUnit.test("Работает правильно с отсутствующими ключами", function(assert) {
        const array1 = [
            { id: 1, name: "Alice" },
            { id: 2, name: "Bob" }
        ];
        const array2 = [
            { age: 30 },
            { id: 2, age: 25 }
        ];
        const result = mergeBy(array1, array2, "id");

        assert.deepEqual(result, [
            { id: 1, name: "Alice" },
            { id: 2, name: "Bob", age: 25 }
        ]);
    });

    QUnit.test("Перезаписывает значение, если типы не совпадают (Array vs String)", function(assert) {
        const array1 = [
            { id: 1, settings: ["dark_mode", "notifications"] }
        ];
        const array2 = [
            { id: 1, settings: "reset_to_default" }
        ];
        const result = mergeBy(array1, array2, "id");

        assert.deepEqual(result, [
            { id: 1, settings: "reset_to_default" }
        ]);
    });

    QUnit.test("Корректно добавляет новые элементы, которых не было в первом массиве", function(assert) {
        const array1 = [
            { id: 1, name: "Alice" }
        ];
        const array2 = [
            { id: 2, name: "Bob", role: "new_user" },
            { id: 3, name: "Charlie" }
        ];
        const result = mergeBy(array1, array2, "id");

        assert.deepEqual(result, [
            { id: 1, name: "Alice" },
            { id: 2, name: "Bob", role: "new_user" },
            { id: 3, name: "Charlie" }
        ]);
    });

    QUnit.test("Перезаписывает обычные объекты целиком (не делает deep merge)", function(assert) {
        const array1 = [
            { id: 1, config: { theme: "blue", lang: "en" } }
        ];
        const array2 = [
            { id: 1, config: { theme: "red" } }
        ];
        const result = mergeBy(array1, array2, "id");

        assert.deepEqual(result, [
            { id: 1, config: { theme: "red" } }
        ]);
    });

    QUnit.test("Обработка граничных случаев (null, не массивы, отсутствующий ключ)", function(assert) {
        assert.deepEqual(mergeBy(null, [], 'id'), []);
        assert.deepEqual(mergeBy([], {}, 'id'), []);
        assert.deepEqual(mergeBy([], [], null), []);
    });
});

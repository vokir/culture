# УК Культура front-end

Для запуска проекта в локальной среде следующие требования:

- Node js 16.14.0 версии или выше
- Пакетный менеджер yarn. Установка: https://yarnpkg.com/getting-started/install

## Используемые команды

Установка зависимостей:

```
yarn install
```

Запуск локального сервера:

```
yarn dev
```

Запуск билда:

```
yarn build
```

Запуск локального сервера storybook:

```
yarn storybook
```

Запуск билда storybook:

```
yarn build-storybook
```

## Структура проекта

```
./
└── culture
    ├── public # Папка с шаблонами и статичными фалами
    ├── src # Весь исходный код проекта
    │   ├── assets # Дополнительные статические ресурсы
    │   │   └── fonts
    │   │   └── style
    │   ├── components # Все vue компоненты проекта (*)
    │   │   ├── SomeComponent
    │   │   ├── SomeComponent
    │   │   ├── ...
    │   │   ├── UI # Простые ui эелементы интерфейса: кнопки, карточки, шильдики и т.д.
    │   │   │   ├── v-button
    │   │   │   │   └── v-button.vue
    │   │   │   │   └── v-button.stories.js
    │   │   │   │   └── style.scss
    │   │   │   ├── v-input
    │   │   │   │   └── v-input.vue
    │   │   │   │   └── v-input.stories.js
    │   │   │   │   └── style.scss
    │   │   │   └── ...
    │   ├── hooks # Папка с хуками приложения
    │   │   ├── useEventListeners.js
    │   │   └── ...
    │   ├── router # Папка с маршрутами приложения
    │   ├── store # Папка с хранилищем приложения
    │   ├── views # Все vue страницы проекта
    │   │   ├── news
    │   │   │   └── news.vue
    │   │   └── ...
    │   ├── main.js
    └── └── App.vue
```

## Пример структуры компонентов

```
ui-button
├── style.scss # Стили главного комонента
├── v-button.vue # Код главного компонента
└── v-button.stories.js # Документация компонентов через Storybook
```

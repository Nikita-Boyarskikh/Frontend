# Router for browsers without History API support

### ЗАДАНИЕ
Написать реализацию роутера, которая может работать в браузерах без History API
Подсказка: навигация по истории должна осуществляться с использованием хэшей (якорей) URL

То есть роуты будут выглядеть, например, так:
```
  https://example.com/#/route1
  https://example.com/#/route2
```

* https://developer.mozilla.org/ru/docs/Web/API/WindowEventHandlers/onhashchange
* https://developer.mozilla.org/en-US/docs/Web/API/Location

Также необходимо напилить небольшую демку из пары страничек, которая будет работать на таком роутере

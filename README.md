# Implements

## Installation
```
npm install @ampersarnie/implements
```

## Example
__Interfaces__
```js
class MyInterface {
    myInterfaceMethod() {}
    anotherInterfaceMethod(foo, bar) {}
}

export default MyInterface
```

__Traits__
```js
class MyTrait {
    myTraitMethod() {
        return 'Hello world.';
    }
}

export default MyTrait
```

__Class__
```js
import { Implements } from '@ampersarnie/implements';
import MyInterface from './MyInterface.js';
import MyTrait from './MyTrait.js';

class MyClass {
    interfaces() {
        return [MyInterface];
    }

    traits() {
        return [MyTrait];
    }

    myInterfaceMethod() {
        // This is an standard interface method.
    }

    anotherInterfaceMethod(foo, bar) {
        // This interface method requires the argument params
        // foo and bar as dictated by the interface.
    }

}

export default new Implements(MyClass);
```

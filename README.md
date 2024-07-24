# React usePopCorn

## Theories

A component should be splitted based on use cases such as Logical Separation of Content/UI-Layout, Reusability of that component, Complexity and often a developer's coding style.

- `Logical Separation`: If a component contains different content that perhaps don't belong together, then it might be a good idea to split component into different smaller components.

- `Reusability`: Sometimes we need to reuse a piece of component again and again in the codebase (like a button element). In that case creating a new component with that resuable piece would be great.

- `Complexity`: If a component is getting too complex to handle, containing multiple state variable, receiving many props, and the JSX is getting too big and complex, it is good to create different components. It would largely affect productivity and optimized to manage.

- `Personal Coding Style`: This is more of a developer's own productivity than writing optimized component all the time. If a developer prefer big or small components, then it should be most effetive to use that personal preference.

>[!NOTE]
>
> - Creating a new component is creating a new abstraction to handle, and sometimes it is expensive and lot more mental stressfull to manage all those abstraction. So, be aware and do not create component in the early stage.
> - Components should be named by their work and what it displays. There is no restriction to use long component names.
> - It's completely normal to use different size of component as an App might need different size of components.
> - NEVER declare a component inside another. A developer can write two component in the same file and use them accordingly but not create a component inside another.

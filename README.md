# generator-retax [![NPM version][npm-image]][npm-url] [![Build Status][travis-image]][travis-url] [![Dependency Status][daviddm-image]][daviddm-url] [![Coverage percentage][codecov-image]][codecov-url]
> Fullstack react boilerplate production ready.

This is the official generator to scaffold a **retax** app.

* [generator-retax](#generator-retax)
* [Getting started](#getting-started)
* [Generators](#generators)
  - [retax-seed](#retax-seed)
  - [actions-creator](#actions-creator)
  - [reducer](#reducer)
  - [selector](#selector)
  - [component](#component)
  - [route](#route)
  - [seed-component](#seed-component)

## Getting started

```
npm install -g yo generator-retax
```

## Generators
### retax-seed
To generate a retax-seed based on [this](https://github.com/retaxJS/retax-seed) project run:
```
yo retax MyAppName
```

The first argument of this generator is the project name (dash case). It is required.

The generator will prompt for:
* The repo url
* The author name

### actions-creator
```
yo retax:actions-creator blog
```

The first argument of this generator is the actions creator name (camel case). It is required.

The generator will prompt for:
* The first action name created by the generated actions creator. (default: `DEFAULT_ACTION`)

This actions creator uses **retax-components** element.

The previous command will generate:
```js
// actions/blog.js

import { actionsCreatorFactory } from 'retax';
import { annotator, AbstractActionsCreator } from 'retax-components';

import {
  DEFAULT_ACTION,
} from 'constants/actions/blog';

@annotator.ActionsCreator() // eslint-disable-line
export default class BlogActionsCreator extends AbstractActionsCreator {
  @annotator.action()
  defaultAction = actionsCreatorFactory(DEFAULT_ACTION);
}

```

```js
// actions/__tests__/blog-test.js

import chai, { expect } from 'chai';
import sinonChai from 'sinon-chai';
import dirtyChai from 'dirty-chai';
chai.use(sinonChai);
chai.use(dirtyChai);

import {
  DEFAULT_ACTION,
} from 'constants/actions/blog';

describe('blogActionsCreator', () => {
  it('should exists', () => {
    const BlogActionsCreator = require('../blog');
    expect(BlogActionsCreator).to.be.ok();
  });

  it('should test the defaultAction creator', () => {
    const BlogActionsCreator = require('../blog');

    const ac = new BlogActionsCreator();

    expect(ac).to.be.ok();

    expect(ac.defaultAction(1)).to.deep.equal({
      type: DEFAULT_ACTION,
      payload: 1,
    });
  });
});


```

```js
/// constants/actions/blog.js
export const DEFAULT_ACTION = 'DEFAULT_ACTION';
```

And update all folder `index.js` accordingly.

### reducer
```
yo retax:reducer blog
```

The first argument of this generator is the reducer name (camel case). It is required.

The generator will prompt for:
* The first action name handled by the generated reducer. (default: `DEFAULT_ACTION`)

The previous command will generate:

```js
// reducers/blog.js

import { reducerFactory } from 'retax';
import { fromJS } from 'immutable';

import {
  DEFAULT_ACTION,
} from 'constants/actions/blog';

function getInitialState() {
  return fromJS({
    value: {},
  });
}

export default reducerFactory(
  getInitialState(),
  {
    [DEFAULT_ACTION](state, action) {
      return state.setIn(['value'], action.payload);
    },
  }
);

```

```js
// reducers/__tests__/blog-test.js

import chai, { expect } from 'chai';
import dirtyChai from 'dirty-chai';
chai.use(dirtyChai);

import { fromJS } from 'immutable';

import {
  DEFAULT_ACTION,
} from 'constants/actions/blog';

import blog from '../blog';

describe('Blog Reducer', () => {
  it('should exists', () => {
    expect(blog).to.be.ok();
  });

  it('should handle the DEFAULT_ACTION', () => {
    let state = fromJS({ value: 0 });
    const action = {
      type: DEFAULT_ACTION,
      payload: 1,
    };

    expect(state.get('value')).to.equal(0);
    state = blog(state, action);
    expect(state.get('value')).to.equal(1);
  });
});
```

And update all folder `index.js` accordingly.

### selector
```
yo retax:selector blog
```

The first argument of this generator is the selector name (camel case). It is required.

This selector is an idiomatic [reselect](https://github.com/reactjs/reselect) selector.

The previous command will generate:

```js
// selectors/blog.js

import { createSelector } from 'reselect';

export function blogSelector(state) {
  return state.blog;
}

export const blogMapSelector = createSelector(
  blogSelector,
  blog => blog.get('value')
);
```

```js
// selectors/__tests__/blog-test.js

import chai, { expect } from 'chai';
import sinonChai from 'sinon-chai';
import dirtyChai from 'dirty-chai';
chai.use(sinonChai);
chai.use(dirtyChai);

import { fromJS } from 'immutable';

describe('blog Selector', () => {
  it('should exists', () => {
    const blog = require('../blog');
    expect(blog).to.be.ok();
  });

  it('should test the blogMapSelector selector', () => {
    const blog = require('../blog');

    expect(blog.blogMapSelector({
      blog: fromJS({
        value: 0,
      }),
    })).to.equal(0);
  });
});
```

And update all folder `index.js` accordingly.

### component
```
yo retax:component BlogPost
```

The first argument of this generator is the component name (Upper camel case). It is required.

The generator will prompt for:
* Should the component be pure (ie: use [pure-render-decorator](https://github.com/felixgirault/pure-render-decorator))

The previous command will generate:

``` jsx
// components/BlogPost/BlogPost.js

import React, { Component } from 'react';
import pureRender from 'pure-render-decorator';

@pureRender
export default class BlogPost extends Component {
  static propTypes = {

  };

  render() {
    return (
      <div className="flex layout vertical">
        Yay!
      </div>
    );
  }
}
```

``` jsx
// components/BlogPost/__tests__/BlogPost-test.js

import chai, { expect } from 'chai';
import dirtyChai from 'dirty-chai';
chai.use(dirtyChai);

import { shallow } from 'enzyme';

import React from 'react';

describe('BlogPost', () => {
  it('should exists', () => {
    const BlogPost = require('../BlogPost');

    const wrapper = shallow((
      <BlogPost />
    ));

    expect(wrapper).to.have.length(1);
  });

  it('should render inner components', () => {
    const BlogPost = require('../BlogPost');

    const wrapper = shallow((
      <BlogPost />
    ));

    expect(wrapper.find('div')).to.have.length(1);
  });
});
```

And update all folder `index.js` accordingly.

### route
```
yo retax:route blog
```

The first argument of this generator is the route name (camel case). It is required.

The generator will prompt for:
* The url of the route (default `/lowercase(routeName)`)
* Should this route be asynchronous [dynamic-routing](https://github.com/reactjs/react-router/blob/master/docs/guides/DynamicRouting.md)
* The require access level to access this route (public, user, admin) (this is defined in [here](https://github.com/retaxJS/retax-seed/blob/master/src/config/access.js) in **retax-seed**)
* Should this route have child routes
* Should this route have an index route
* Should this route be pure (ie: use **pure-render-decorator**)
* Should this route use **redux**
* Should this route use **reselect**

It will generate a lot of files in the folder: `routes/blog`.

A route folder has the following structure:
* `index.js`: the **react-router** route definition
* `container/{page,index}`: these are container components (smart components that connect to redux store) for the page and the index page.
* `component/{page,index}`: dumb components called by the smart component respectively. These components should use only presentationnal components from the folder `src/components`
* `selector/{page,index}`: **reselect** selectors for the smart component.

### seed-component
This generator should not be used in a **retax-seed** project. It should be called in am empty folder.

It generates a standalone component that could be exported to github/npm. See [react-component-seed](https://github.com/hourliert/react-component-seed).

```
yo retax:seed-component BlogPost
```

The first argument of this generator is the component name (Upper camel case). It is required.

The generator will prompt for:
* The repo url
* The author

## License

MIT © [retaxJS](https://github.com/retaxJS)


[npm-image]: https://badge.fury.io/js/generator-retax.svg
[npm-url]: https://npmjs.org/package/generator-retax
[travis-image]: https://travis-ci.org/retaxJS/generator-retax.svg?branch=master
[travis-url]: https://travis-ci.org/retaxJS/generator-retax
[daviddm-image]: https://david-dm.org/retaxJS/generator-retax.svg?theme=shields.io
[daviddm-url]: https://david-dm.org/retaxJS/generator-retax
[codecov-image]: https://codecov.io/github/retaxJS/generator-retax/coverage.svg?branch=master
[codecov-url]: https://codecov.io/github/retaxJS/generator-retax?branch=master

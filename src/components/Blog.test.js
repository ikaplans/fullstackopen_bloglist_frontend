import React from 'react';
import '@testing-library/jest-dom/extend-expect';
import { render, fireEvent } from '@testing-library/react';
import Blog from './Blog';

const blog = {
  title: 'Mock title',
  author: 'Moch Author',
  url: 'http://www.google.com',
  user: { name: 'Mock User', id: 'mockId' },
  likes: 21,
};

describe('blog render', () => {
  let onLikeMock;
  let onDeleteMock;
  let component;
  let expandedComponent;

  beforeEach(() => {
    onLikeMock = jest.fn();
    onDeleteMock = jest.fn();
    component = render(
      <Blog
        blog={blog}
        onBlogLiked={onLikeMock}
        onBlogDeleted={onDeleteMock}
        canRemove={true}
      />
    );

    expandedComponent = render(
      <Blog
        blog={blog}
        onBlogLiked={onLikeMock}
        onBlogDeleted={onDeleteMock}
        canRemove={true}
      />
    );
    fireEvent.click(
      expandedComponent.container.querySelector('.toggleVisibilityButton')
    );
  });

  test('renders collapsed view', () => {
    expect(component.container).toHaveTextContent(
      `${blog.title} by ${blog.author}`
    );
    expect(
      component.container.querySelector('.toggleVisibilityButton')
    ).not.toBe(null);

    expect(component.container.querySelector('.details')).toBe(null);
    expect(component.container.querySelector('.removeButton')).toBe(null);
    expect(component.container.querySelector('.likeButton')).toBe(null);
    expect(component.container.querySelector('.url')).toBe(null);
    expect(component.container.querySelector('.likes')).toBe(null);
    expect(component.container.querySelector('.userName')).toBe(null);
  });

  test('renders expanded view', () => {
    expect(expandedComponent.container).toHaveTextContent(
      `${blog.title} by ${blog.author}`
    );
    expect(expandedComponent.container.querySelector('.details')).not.toBe(
      null
    );
    expect(expandedComponent.container.querySelector('.url')).toHaveTextContent(
      blog.url
    );
    expect(
      expandedComponent.container.querySelector('.likes')
    ).toHaveTextContent(`likes ${blog.likes}`);
    expect(
      expandedComponent.container.querySelector('.userName')
    ).toHaveTextContent(blog.user.name);
    expect(expandedComponent.container.querySelector('.likeButton')).not.toBe(
      null
    );
  });

  test('renders expanded with remove button when canRemove is false', () => {
    const myComponent = render(
      <Blog
        blog={blog}
        onBlogLiked={onLikeMock}
        onBlogDeleted={onDeleteMock}
        canRemove={false}
      />
    );
    const showDetailsButton = myComponent.container.querySelector(
      '.toggleVisibilityButton'
    );
    fireEvent.click(showDetailsButton);
    expect(myComponent.container.querySelector('.removeButton')).toBe(null);
  });

  test('renders expanded view with remove button when canRemove is true', () => {
    const myComponent = render(
      <Blog
        blog={blog}
        onBlogLiked={onLikeMock}
        onBlogDeleted={onDeleteMock}
        canRemove={true}
      />
    );
    const showDetailsButton = myComponent.container.querySelector(
      '.toggleVisibilityButton'
    );
    fireEvent.click(showDetailsButton);
    expect(myComponent.container.querySelector('.removeButton')).not.toBe(null);
  });

  test('doest not invoke function when like button is not clicked', () => {
    expect(onLikeMock.mock.calls).toHaveLength(0);
  });

  test('invokes function when like button is clicked', () => {
    const likeButton = expandedComponent.container.querySelector('.likeButton');
    fireEvent.click(likeButton);
    expect(onLikeMock.mock.calls).toHaveLength(1);
    fireEvent.click(likeButton);
    expect(onLikeMock.mock.calls).toHaveLength(2);
  });
});

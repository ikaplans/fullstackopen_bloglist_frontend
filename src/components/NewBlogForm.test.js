import React from 'react';
import '@testing-library/jest-dom/extend-expect';
import { render, fireEvent } from '@testing-library/react';
import NewBlogForm from './NewBlogForm';

let component;
let onSubmitBlogMock;
describe('form render', () => {
  beforeEach(() => {
    onSubmitBlogMock = jest.fn();
    component = render(<NewBlogForm onSubmitNewBlog={onSubmitBlogMock} />);
  });

  test('can submit form', () => {
    expect(onSubmitBlogMock.mock.calls).toHaveLength(0);
    const TITLE_VALUE = 'Test Author';
    const URL_VALUE = 'Test Title One';
    const AUTHOR_VALUE = 'http://test.url.one';
    const form = component.container.querySelector('form');
    const title = component.container.querySelector('#title');
    const url = component.container.querySelector('#url');
    const author = component.container.querySelector('#author');
    fireEvent.change(author, { target: { value: AUTHOR_VALUE } });
    fireEvent.change(title, { target: { value: TITLE_VALUE } });
    fireEvent.change(url, { target: { value: URL_VALUE } });

    fireEvent.submit(form);
    expect(onSubmitBlogMock.mock.calls).toHaveLength(1);
    expect(onSubmitBlogMock.mock.calls[0][0].title).toBe(TITLE_VALUE);
    expect(onSubmitBlogMock.mock.calls[0][0].url).toBe(URL_VALUE);
    expect(onSubmitBlogMock.mock.calls[0][0].author).toBe(AUTHOR_VALUE);
  });
});

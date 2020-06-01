import React, { useState, useImperativeHandle } from 'react';

const Togglable = React.forwardRef((props, ref) => {
  Togglable.displayName = 'Togglable';
  const buttonPosition = ['top', 'bottom', 'header'].includes(
    props.buttonPosition
  )
    ? props.buttonPosition
    : 'bottom';
  const [visible, setVisible] = useState(false);

  const toggleVisibility = () => {
    setVisible(!visible);
  };

  const getButton = () => {
    return (
      <button onClick={toggleVisibility} className={'toggleVisibilityButton'}>
        {visible ? props.buttonCloseLabel : props.buttonOpenLabel}
      </button>
    );
  };

  useImperativeHandle(ref, () => {
    return { toggleVisibility };
  });

  return (
    <div id="togglableRoot">
      {props.header ? (
        <div>
          {props.header} {buttonPosition === 'header' ? getButton() : null}
        </div>
      ) : null}
      {!visible && buttonPosition !== 'header' ? (
        <div>{getButton()}</div>
      ) : null}
      {visible ? (
        <div>
          {buttonPosition === 'top' ? getButton() : null}
          {props.children}
          {buttonPosition === 'bottom' ? getButton() : null}
        </div>
      ) : null}
    </div>
  );
});

export default Togglable;

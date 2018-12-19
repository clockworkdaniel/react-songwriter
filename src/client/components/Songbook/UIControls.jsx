import React from 'react';

export default class UIControls extends React.Component {
  constructor() {
    super();
    this.handleAuthSongPrefChange = this.handleAuthSongPrefChange.bind(this);
    this.handleOrderLogicChange = this.handleOrderLogicChange.bind(this);
  }

  handleAuthSongPrefChange(event) {
    const { setSongPriority } = this.props;
    if (event.target.value === 'author') {
      setSongPriority(false);
    } else {
      setSongPriority(true);
    }
  }

  handleOrderLogicChange(event) {
    const {
      orderLogic, isAscending, setAscending, setOrderLogic
    } = this.props;
    if (event.target.value === orderLogic) {
      setAscending(!isAscending);
    } else {
      setOrderLogic(event.target.value);
      setAscending(false);
    }
  }

  render() {
    const {
      matchesAuthorUrl,
      orderLogic,
      songPriority,
      isAscending
    } = this.props;

    // console.log(isAscending);

    return (
      <div className="ui-controls">
        {!matchesAuthorUrl ? (
          <div className="ui-controls__auth-song-priority">
            <p>
              Order by:
            </p>
            <select
              value={songPriority ? 'song' : 'author'}
              onChange={this.handleAuthSongPrefChange}
            >
              <option value="author">Author</option>
              <option value="song">Song</option>
            </select>
          </div>
        ) : (
          <p>Order songs:</p>
        )}
        <div className={
          `ui-controls__ordering-logic ${(isAscending ? 'ascending' : 'descending ')} ${orderLogic}`}
        >
          <button
            className="uic-order-btn"
            type="button"
            value="alphabetically"
            onClick={this.handleOrderLogicChange}
          >
            Alphabetically
          </button>
          <button
            className="uic-order-btn"
            type="button"
            value="modified"
            onClick={this.handleOrderLogicChange}
          >
            Date Modified
          </button>
          <button
            className="uic-order-btn"
            type="button"
            value="favourites"
            onClick={this.handleOrderLogicChange}
          >
            Favourites
          </button>
        </div>
      </div>
    );
  }
}

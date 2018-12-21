import React from 'react';

export default class UIControls extends React.Component {
  constructor() {
    super();
    this.handleAuthSongPrefChange = this.handleAuthSongPrefChange.bind(this);
    this.handleOrderLogicChange = this.handleOrderLogicChange.bind(this);
  }

  handleAuthSongPrefChange(event) {
    const { setSongPriority, orderLogic, setOrderLogic } = this.props;
    if (event.target.value === 'author') {
      setSongPriority(false);
      if (orderLogic === 'created') {
        setOrderLogic('modified');
      }
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

    return (
      <div className="book-controls">

        <div className="book-controls__auth-song-priority">
          {matchesAuthorUrl ? (
            <p>Order songs:</p>
          ) : (
            <div>
              <p>
                Order:
              </p>
              <div className="select-container">
                <select
                  value={songPriority ? 'song' : 'author'}
                  onChange={this.handleAuthSongPrefChange}
                >
                  <option value="author">Authors</option>
                  <option value="song">Songs</option>
                </select>
              </div>
            </div>
          )}
        </div>
        <div className={
          `book-controls__ordering-logic ${(isAscending ? 'ascending' : 'descending ')} ${orderLogic}`}
        >
          <button
            className="book-controls__ordering-btn"
            type="button"
            value="alphabetically"
            onClick={this.handleOrderLogicChange}
          >
            Alphabetically
          </button>
          <button
            className="book-controls__ordering-btn"
            type="button"
            value="modified"
            onClick={this.handleOrderLogicChange}
          >
            Modified
          </button>
          {(songPriority) && (
            <button
              className="book-controls__ordering-btn"
              type="button"
              value="created"
              onClick={this.handleOrderLogicChange}
            >
              Created
            </button>
          )}
          {/* <button
            className="uic-order-btn"
            type="button"
            value="favourites"
            onClick={this.handleOrderLogicChange}
          >
            Favourites
          </button> */}
        </div>
      </div>
    );
  }
}

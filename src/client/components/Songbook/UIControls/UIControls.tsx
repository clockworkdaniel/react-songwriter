import * as React from "react";
import { OrderLogic } from "../../../types/songbook";

type Props = {
  matchesArtistUrl: boolean;
  orderLogic: string;
  isSongPriority: boolean;
  setIsSongPriority: Function;
  setOrderLogic: Function;
  setOrderDirection: Function;
  isAscending: boolean;
};

export default class UIControls extends React.Component<Props> {
  handleAuthSongPrefChange = event => {
    const { setIsSongPriority, orderLogic, setOrderLogic } = this.props;
    if (event.target.value === "artist") {
      setIsSongPriority(false);
      if (orderLogic === OrderLogic.Created) {
        setOrderLogic(OrderLogic.Modified);
      }
    } else {
      setIsSongPriority(true);
    }
  };

  handleOrderLogicChange = event => {
    const {
      orderLogic,
      isAscending,
      setOrderDirection,
      setOrderLogic
    } = this.props;
    if (event.target.value === orderLogic) {
      setOrderDirection(!isAscending);
    } else {
      setOrderLogic(event.target.value);
      setOrderDirection(false);
    }
  };

  render() {
    const {
      matchesArtistUrl,
      orderLogic,
      isSongPriority,
      isAscending
    } = this.props;

    return (
      <div className="book-controls">
        <div className="book-controls__auth-song-priority">
          {matchesArtistUrl ? (
            <p>Order songs:</p>
          ) : (
            <div>
              <p>Order:</p>
              <div className="select-container book-controls__select-container">
                <select
                  value={isSongPriority ? "song" : "artist"}
                  onChange={this.handleAuthSongPrefChange}
                >
                  <option value="artist">Artists</option>
                  <option value="song">Songs</option>
                </select>
              </div>
            </div>
          )}
        </div>
        <div
          className={`book-controls__ordering-logic ${
            isAscending ? "ascending" : "descending "
          } ${orderLogic}`}
        >
          <button
            className="book-controls__ordering-btn"
            type="button"
            value="alphabetical"
            onClick={this.handleOrderLogicChange}
          >
            Alphabetical
          </button>
          <button
            className="book-controls__ordering-btn"
            type="button"
            value="modified"
            onClick={this.handleOrderLogicChange}
          >
            Modified
          </button>
          {isSongPriority && (
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

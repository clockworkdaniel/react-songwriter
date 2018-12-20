import React from 'react';
import Author from './Author';
import Song from './Song';
import UIControls from './UIControls/UIControls';
import { sortAlphabetically, sortByDate, toSongPriority } from '../../functions/arrayStuff';

export default class Songbook extends React.Component {
  constructor(props) {
    super();
    this.props = props;
    this.handleNewSongModal = this.handleNewSongModal.bind(this);
  }

  componentDidMount() {
    const {
      fetchAuthors, fetchSongsByAuthor, match, setSongPriority
    } = this.props;
    this.matchesAuthorUrl = !!match.url.includes('/author/');
    if (this.matchesAuthorUrl) {
      setSongPriority(true); // defaults to author priority
      fetchSongsByAuthor(match.params.id);
    } else {
      setSongPriority(false); // defaults to song priority
      fetchAuthors();
    }
  }

  orderAuthorSongList(authorSongList) {
    const {
      uiState: {
        isAscending,
        songPriority,
        orderLogic
      },
    } = this.props;

    if (this.matchesAuthorUrl) {
      return authorSongList;
    }

    switch (orderLogic) {
      case 'alphabetically':
        if (!songPriority) {
          return sortAlphabetically(authorSongList, 'name', isAscending);
        }
        return sortAlphabetically(toSongPriority(authorSongList), 'title', isAscending);
      case 'modified':
        if (!songPriority) {
          return sortByDate(authorSongList, 'modified', isAscending);
        }
        return sortByDate(toSongPriority(authorSongList), 'modified', isAscending);
      case 'created':
        return sortByDate(toSongPriority(authorSongList), 'created', isAscending);
      default:
        break;
    }
  }


  handleNewSongModal() {
    const { newSongModal } = this.props;
    newSongModal();
  }

  render() {
    const {
      authorSongList,
      deleteSongRequest,
      uiState: {
        isAscending,
        songPriority,
        orderLogic
      },
      setOrderLogic,
      setSongPriority,
      setAscending
    } = this.props;

    const sortedAuthorSongList = this.orderAuthorSongList(authorSongList);

    return (
      <div className="songbook">
        <UIControls
          matchesAuthorUrl={this.matchesAuthorUrl}
          orderLogic={orderLogic}
          songPriority={songPriority}
          isAscending={isAscending}
          setOrderLogic={setOrderLogic}
          setSongPriority={setSongPriority}
          setAscending={setAscending}
        />
        {(!songPriority || this.matchesAuthorUrl) ? (
          <ul className="songbook__author-list">
            {sortedAuthorSongList && sortedAuthorSongList.map(author => (
              <Author
                key={author._id}
                name={author.name}
                _id={author._id}
                songs={author.songs}
                matchesAuthorUrl={this.matchesAuthorUrl}
                orderLogic={orderLogic}
                songPriority={songPriority}
                isAscending={isAscending}
                deleteSongRequest={deleteSongRequest}
              />
            ))}
          </ul>
        ) : (
          <ul className="songbook__song-list">
            {sortedAuthorSongList && sortedAuthorSongList.map(song => (
              <Song
                key={song._id}
                song={song}
                authorName={song.author.name}
                orderLogic={orderLogic}
                deleteSongRequest={deleteSongRequest}
                songPriority={songPriority}
              />
            ))}
          </ul>
        )}
        <button
          className="songbook__new-song"
          type="button"
          onClick={this.handleNewSongModal}
        >
          New Song
        </button>
      </div>
    );
  }
}

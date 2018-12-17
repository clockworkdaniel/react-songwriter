import React from 'react';
import Author from './Author';

export default class Songbook extends React.Component {
  constructor(props) {
    super(props);
    this.props = props;
    this.handleNewSongModal = this.handleNewSongModal.bind(this);
  }

  componentDidMount() {
    const { fetchAuthors, fetchSongsByAuthor, match } = this.props;
    this.matchesAuthorUrl = !!match.url.includes('/author/');
    if (this.matchesAuthorUrl) {
      fetchSongsByAuthor(match.params.id);
    } else {
      fetchAuthors();
    }
  }

  handleNewSongModal() {
    const { newSongModal } = this.props;
    newSongModal();
  }

  render() {
    const { authorList, deleteSongRequest } = this.props;

    return (
      <div className="songbook">
        <ul className="songbook__author-list">
          { authorList && authorList.map(author => (
            <Author
              key={author._id}
              name={author.name}
              _id={author._id}
              songs={author.songs}
              matchesAuthorUrl={this.matchesAuthorUrl}
              deleteSongRequest={deleteSongRequest}
            />
          ))}
        </ul>
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
